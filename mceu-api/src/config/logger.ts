import {LOGGER_CONFIG_KEY, LoggerConfigInterface} from "../shared/types";

export default (): { [LOGGER_CONFIG_KEY]: LoggerConfigInterface } => ({
    [LOGGER_CONFIG_KEY]: {
        level: process.env.LOGGER_LEVEL,
        maxSize: process.env.LOGGER_FILE_MAX_SIZE,
        maxFiles: Number(process.env.LOGGER_MAX_FILES),
        dirname: process.env.LOGGER_OUTPUT_DIRECTORY,
    },
});
