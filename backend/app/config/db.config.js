//Database connection settings
module.exports = {
    //Neccessary settings
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "homework_list",
    dialect: "mysql",
    //Optional settings
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};