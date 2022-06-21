const winston = require('winston');
const config = require('./config');

// Define severity levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4, 
}

// Define level based on environment
const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'info'
}

// Define colors for each level
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

winston.addColors(colors)

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

// Define which transports the logger must use to print out messages. 
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
]

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
    enumerateErrorFormat(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});

module.exports = logger;