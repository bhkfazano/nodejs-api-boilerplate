const app = require('./app');
const db = require("./models");
const config = require('./config/config');
const logger = require('./config/logger');

// connect to db
db.sequelize.authenticate().then(() => {
    logger.info("Connected to the database!");
}).catch(err => {
    logger.error("Cannot connect to the database!", err);
    process.exit(1);
});

// sync
db.sequelize.sync()

let server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});