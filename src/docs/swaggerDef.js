const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
    openapi: '3.0.0',
    info: {
        title: 'nodejs-api-boilerplate',
        version,
        license: {
            name: 'MIT',
            url: 'https://github.com/bhkfazano/nodejs-api-boilerplate/blob/main/LICENSE',
        },
    },
    servers: [
        {
            url: `http://localhost:${config.port}/v1`,
        },
    ],
};

module.exports = swaggerDef;