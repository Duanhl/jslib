import {DB} from "../db";

export async function calcActorScore(db: DB, actor: string, cutDate: string) {
    const sql = `select m.sn, m.score, m.wanted, m.release_date
                 from movies m
                          inner join actor_movie_relation amr on m.sn = amr.sn
                 where amr.actor = :actor
                   and amr.release_date > :cutDate`;
    const movies = db.query(sql, {actor, cutDate});
    for (const movie of movies) {
        movie['adjust'] = adjustScore(movie.score, movie.wanted, movie.releaseDate, cutDate);
    }
    const filter = movies.filter(m => m.adjust > 0);
    let score = 0;
    if(filter.length > 0) {
        score = filter.reduce((acc, b) => acc + b.adjust, 0) / filter.length;
    } else {
        score = 0;
    }
    db.execute(`update actors set score = ${score} where name = :actor`, {actor});
    return score;
}

function adjustScore(score: number, wanted: number, releaseDate: string, cutDate: string): number {
    if (!score || isNaN(score)) {
        return 0;
    }
    if (!wanted || isNaN(wanted)) {
        wanted = 200;
    }
    if (wanted === 0) {
        wanted = 1;
    }
    const lnMax = Math.log(3000);
    const likedCoeff = 0.8 + 0.4 * Math.log(wanted) / lnMax;

    if (releaseDate < cutDate) {
        return 0;
    }

    // 2. 计算与满分锚点的月份差
    const delta = monthDiff(new Date(cutDate), new Date(releaseDate)); // 负值表示更早

    const slope = 0.2 / 7;
    const coeff = 1.0 + delta * slope;

    return score * likedCoeff * Math.max(0.8, coeff);
}

function monthDiff(a: Date, b: Date): number {
    return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
}