const express = require('express');
const docsRoute = require('./docs.route');
const userRoute = require('./user.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
    // {
    //     path: '/auth',
    //     route: authRoute,
    // },
    {
        path: '/user',
        route: userRoute,
    },
];

// routes available only in development mode
const devRoutes = [
    {
        path: '/docs',
        route: docsRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

module.exports = router;