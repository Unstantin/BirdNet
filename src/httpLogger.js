import morgan from 'morgan'
import logger from './logger.js'


const stream = {
    write: (message) => logger.http(message.trim()) 
};


const morganFormat = ':method :url :status :response-time ms - :res[content-length]';

const httpLogger = morgan(morganFormat, { stream });

export default httpLogger;