export const LOGGER_CONFIG_KEY = 'logger';

export interface LoggerConfigInterface {
    level: string;
    maxSize: string;
    maxFiles: number;
    dirname: string;
}