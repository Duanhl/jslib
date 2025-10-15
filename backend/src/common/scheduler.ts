import {scheduleJob} from 'node-schedule';


export function registerJob(cron: string, name: string, func: () => Promise<void>) {
    scheduleJob(cron, () => {
        try {
            console.log(`starting ${name} in ${new Date().toISOString()}`);
            func()
        } catch (error) {
            console.error(error);
        }
    })
}