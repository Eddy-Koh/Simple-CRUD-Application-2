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

db.homework = require("./homework.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

// Define associations
db.role.hasMany(db.user, { foreignKey: "roleId" });
db.user.belongsTo(db.role, { foreignKey: "roleId" });

db.user.hasMany(db.homework, { foreignKey: "studentId" });
db.homework.belongsTo(db.user, { foreignKey: "studentId" });

//preload role names
db.ROLES = ["student", "teacher"];

module.exports = db; //Make the db object available to other modules