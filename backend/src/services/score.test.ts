import {describe, it} from "vitest";
import {Config} from "../config";
import {DB} from "../db";
import {calcActorScore} from "./score";


describe('test calc score.', function () {
    const config = Config.defaultConfig();
    const db = new DB(config.dbpath);

    describe('#calculate single', function () {
        it('小宵こなん', async () => {
            const acotrs = ['浜辺栞帆', '森日向子', '小宵こなん', '北野未奈', '小野坂ゆいか', '宮下玲奈']
            const cutDate = new Date(new Date().getTime() - 6.1 * 30 * 24 * 3600 * 1000).toISOString().split("T")[0];
            for(const actor of acotrs) {
                const score = await calcActorScore(db, actor, cutDate);
                console.log(`${actor}: ${score}`);
            }
        });
    })

    describe('#calculate all amount', function () {
        it('calc all actors', async () => {
            // const cutDate = new Date(new Date().getTime() - 6.1 * 30 * 24 * 3600 * 1000).toISOString().split("T")[0];
            const actors = db.query(`select name from actors`);
            console.log(actors.map((actor) => `"${actor.name}"`).join(', '));

            // for(const actor of actors) {
            //     await calcActorScore(db, actor['name'], cutDate);
            // }
        });
    })
})