import {JaroWinklerDistance} from "natural";
import {DB} from "../db";
import logger from "../common/logs";

interface MovieInfo {
    sn: string, 
    title: string, 
    actors: string, 
    genres: string
}

export class SimilarityService {

    constructor(private readonly db: DB) {
    }

    calculateSimilarity(text1?: string, text2?: string) {
        if (!text1 || !text2) return 0;
        return JaroWinklerDistance(text1, text2);
    }

    calculateSetSimilarity(set1?: string, set2?: string) {
        if (!set1 || !set2) return 0;
        set1 = set1.replace("{", "[").replace("}", "]");
        set2 = set2.replace("{", "[").replace("}", "]");

        const list1 = (JSON.parse(set1) as string[]).map(item => item.trim()).filter(Boolean);
        const list2 = (JSON.parse(set2) as string[]).map(item => item.trim()).filter(Boolean);

        if (list1.length === 0 || list2.length === 0) return 0;

        const set2Set = new Set(list2);
        const intersection = list1.filter(item => set2Set.has(item)).length;
        const union = new Set([...list1, ...list2]).size;

        return union > 0 ? intersection / union : 0;
    }

    calculateCombinedSimilarity(doc1: MovieInfo, doc2: MovieInfo, weights = {
        title: 0.7,
        actors: 0.1,
        genres: 0.2
    }): number {
        try {
            const title1 = (doc1.title || '').replace(doc1.sn, '').trim();
            const title2 = (doc2.title || '').replace(doc2.sn, '').trim();
            const titleSimilarity = this.calculateSimilarity(title1, title2);
            const authorsSimilarity = this.calculateSetSimilarity(doc1.actors, doc2.actors);
            const genresSimilarity = this.calculateSetSimilarity(doc1.genres, doc2.genres);

            return titleSimilarity * weights.title +
                authorsSimilarity * weights.actors +
                genresSimilarity * weights.genres;
        } catch (e) {
            return 0;
        }
    }

    async calculateBatchSimilarities(Movies: MovieInfo[], sourceIndex: number, topK = 5) {
        const sourceDoc = Movies[sourceIndex];
        const similarities = [];

        for (let i = 0; i < Movies.length; i++) {
            if (i === sourceIndex) continue; // 跳过自身

            const targetDoc = Movies[i];
            const score = this.calculateCombinedSimilarity(sourceDoc, targetDoc);

            similarities.push({
                target_sn: targetDoc.sn,
                score
            });
        }

        // 按综合相似度排序并返回topK
        return similarities
            .sort((a, b) => b.score - a.score)
            .slice(0, topK);
    }

    // 全量计算所有文档的相似度
    async calculateAllSimilarities(topK = 5, condition: string = '') {
        const start = new Date().getTime();
        logger.info('开始全量计算相似度...');
        const Movies: any[] = this.db.query('SELECT sn, title, actors, genres FROM Movies ' + condition);
        logger.info(`共 ${Movies.length} 需要处理`);

        let processed = 0;

        for (let i = 23700; i < Movies.length; i++) {
            const sourceDoc = Movies[i];
            if(!sourceDoc.sn) continue;
            const topSimilarities = await this.calculateBatchSimilarities(Movies as MovieInfo[], i, topK);

            // 保存到数据库
            for (const similarity of topSimilarities) {
                await this.saveSimilarity(
                    sourceDoc.sn,
                    similarity.target_sn,
                    similarity.score
                );
            }

            processed++;
            if (processed % 100 === 0) {
                logger.info(`已处理 ${processed}/${Movies.length} `);
            }
        }

        logger.info(`全量计算完成, ${new Date().getTime() - start} ms`);
    }

    async saveSimilarity(sourceSn: string, targetSn: string, score: number) {
        this.db.execute(`
            INSERT OR REPLACE INTO movie_similarities 
            (source_sn, target_sn, score)
            VALUES (:sourceSn, :targetSn, :score)
        `, {sourceSn, targetSn, score});
    }

    // 增量计算（针对新文档）
    async calculateIncrementalSimilarities(newMoviesNs: string[], topK = 5) {
        const start = new Date().getTime();
        logger.info(`开始为 ${newMoviesNs.length}计算相似度...`);

        // 获取所有文档
        const allMovies = this.db.query<MovieInfo>('SELECT sn, title, actors, genres FROM Movies');
        const documentMap = new Map(allMovies.map(doc => [doc.sn, doc]));

        let processed = 0;

        for (const newSn of newMoviesNs) {
            const newDoc = documentMap.get(newSn);
            if (!newDoc) continue;

            // 计算新文档与所有文档的相似度
            const similarities = [];

            for (const targetDoc of allMovies) {
                if (targetDoc.sn === newSn) continue;

                const score = this.calculateCombinedSimilarity(newDoc, targetDoc);
                similarities.push({
                    target_sn: targetDoc.sn,
                    score
                });
            }

            // 保存topK结果
            const topSimilarities = similarities
                .sort((a, b) => b.score - a.score)
                .slice(0, topK);

            for (const similarity of topSimilarities) {
                await this.saveSimilarity(newSn, similarity.target_sn, similarity.score);
            }

            processed++;
        }

        logger.info(`增量计算完成, cost ${new Date().getTime() - start} ms`);
    }
}