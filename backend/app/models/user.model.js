module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
        type: Sequelize.STRING
        },
        email: {
        type: Sequelize.STRING
        },
        password: {
        type: Sequelize.STRING
        }
    });

    User.associate = models => {
        User.belongsTo(models.roles, {
            foreignKey: "roleId"
        });

        User.hasMany(models.homework, {
            foreignKey: "studentId"
        });
    };

    return User;
};