import {scheduleJob} from 'node-schedule';
import logger from "./logs";


export function registerJob(cron: string, name: string, func: () => Promise<void>) {
    scheduleJob(cron, () => {
        try {
            logger.info(`starting ${name} in ${new Date().toLocaleString()}`);
            func()
        } catch (error: unknown) {
            logger.error(`execute ${name} failed: ` + (error as any).message);
        }
    })
}