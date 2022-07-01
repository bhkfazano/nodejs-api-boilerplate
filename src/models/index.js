const dbConfig = require("../config/db.js");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false
});

const db = {
    Sequelize : Sequelize,
    sequelize : sequelize
}

db.users = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;