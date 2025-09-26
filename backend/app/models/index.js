const dbConfig = require("../config/db.config.js");

// Setup Sequelize
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// Create a db object to hold the Sequelize instance and models
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.homeworks = require("./homework.model.js")(sequelize, Sequelize);

module.exports = db; //Make the db object available to other modules