import fs from 'fs';
import path from 'path';
import os from 'os';

class DailyLogger {
    private readonly homeDir: string;
    private readonly logDir: string;
    private currentDate: string;
    private infoStream: fs.WriteStream | null = null;
    private errorStream: fs.WriteStream | null = null;
    private dateCheckInterval: NodeJS.Timeout | null = null;

    constructor() {
        this.homeDir = os.homedir();
        this.logDir = path.join(this.homeDir, 'logs/jslib');
        this.currentDate = this.getCurrentDate();

        this.ensureLogDir();
        this.initStreams();
        this.setupDailyCheck();
    }

    private getCurrentDate(): string {
        return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    }

    private ensureLogDir(): void {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    private getLogFilePath(level: 'info' | 'error'): string {
        const filename = `${level}_${this.currentDate}.log`;
        return path.join(this.logDir, filename);
    }

    private initStreams(): void {
        // 关闭之前的流（如果存在）
        this.closeStreams();

        try {
            // 创建新的日志流
            this.infoStream = fs.createWriteStream(this.getLogFilePath('info'), {
                flags: 'a',
                encoding: 'utf8'
            });

            this.errorStream = fs.createWriteStream(this.getLogFilePath('error'), {
                flags: 'a',
                encoding: 'utf8'
            });

            // 处理流错误
            this.infoStream.on('error', (err) => {
                console.error('Info stream error:', err);
            });

            this.errorStream.on('error', (err) => {
                console.error('Error stream error:', err);
            });

        } catch (error) {
            console.error('Failed to initialize log streams:', error);
        }
    }

    private closeStreams(): void {
        if (this.infoStream) {
            this.infoStream.end();
            this.infoStream = null;
        }
        if (this.errorStream) {
            this.errorStream.end();
            this.errorStream = null;
        }
    }

    private setupDailyCheck(): void {
        // 计算到明天午夜的时间
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const timeUntilMidnight = tomorrow.getTime() - now.getTime();

        setTimeout(() => {
            this.checkDateChange();
            // 设置每天检查一次的间隔
            this.dateCheckInterval = setInterval(() => {
                this.checkDateChange();
            }, 24 * 60 * 60 * 1000); // 24小时
        }, timeUntilMidnight);
    }

    private checkDateChange(): void {
        const newDate = this.getCurrentDate();
        if (newDate !== this.currentDate) {
            this.currentDate = newDate;
            this.initStreams();
            this.info(`日志文件切换至新日期: ${newDate}`);
        }
    }

    private formatMessage(level: 'INFO' | 'ERROR', message: string): string {
        const timestamp = new Date().toLocaleString();
        return `[${timestamp}] [${level}] ${message}\n`;
    }

    private writeToStream(stream: fs.WriteStream | null, message: string): void {
        if (stream && !stream.destroyed) {
            stream.write(message, (err) => {
                if (err) {
                    console.error('Write stream error:', err);
                }
            });
        }
    }

    public info(message: string): void {
        const formattedMessage = this.formatMessage('INFO', message);

        // 只写入 info 文件
        this.writeToStream(this.infoStream, formattedMessage);

        // 同时在控制台输出（可选）
        console.log(formattedMessage.trim());
    }

    public error(message: string): void {
        const formattedMessage = this.formatMessage('ERROR', message);

        // 同时写入 info 和 error 文件
        this.writeToStream(this.infoStream, formattedMessage);
        this.writeToStream(this.errorStream, formattedMessage);

        // 同时在控制台输出（可选）
        console.error(formattedMessage.trim());
    }

    public infoWithData(message: string, data?: any): void {
        const fullMessage = data ? `${message} ${JSON.stringify(data)}` : message;
        this.info(fullMessage);
    }

    public errorWithData(message: string, data?: any): void {
        const fullMessage = data ? `${message} ${JSON.stringify(data)}` : message;
        this.error(fullMessage);
    }

    // 关闭日志流
    public close(): void {
        if (this.dateCheckInterval) {
            clearInterval(this.dateCheckInterval);
            this.dateCheckInterval = null;
        }
        this.closeStreams();
    }
}

// 创建单例实例
const logger = new DailyLogger();

// 进程退出时关闭日志流
process.on('exit', () => {
    logger.info('Exiting...');
    logger.close();
});

process.on('SIGINT', () => {
    logger.close();
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.close();
    process.exit(0);
});

// 未捕获的异常
process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`);
    logger.error(error.stack || 'No stack trace');
    logger.close();
    process.exit(1);
});

// 未处理的 promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
    logger.close();
    process.exit(1);
});

export default logger;