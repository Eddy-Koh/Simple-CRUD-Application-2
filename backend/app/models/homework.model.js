// Content in the table of database
module.exports = (sequelize, Sequelize) => {
    //sequelize is the connection to the database
    //Sequelize is the library, used for data types
    const Homework = sequelize.define("homework", { //table named "homework"
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        done: {
            type: Sequelize.BOOLEAN
        }
    });

    return Homework;
};