const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

//Ensures username and email are unique during registration
checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        // Username
        let user = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (user) {
            return res.status(400).send({
                message: "Failed! Username is already in use!"
            });
        }

        // Email
        user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user) {
            return res.status(400).send({
                message: "Failed! Email is already in use!"
            });
        }

        next();
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate Username!"
        });
    }
};

//Not in use currently - Front end give user role option
//Validates that the provided role exists in the system
checkRolesExisted = (req, res, next) => {
    const roleName = req.body.roles?.[0];
    if (roleName && !ROLES.includes(roleName)) {
        return res.status(400).send({ message: "Invalid role: " + roleName });
    }
    next();
};

//Assigns the roleId based on the provided role
assignRoleId = async (req, res, next) => {
    try {
        const roleName = req.body.roles?.[0] || "student"; // default to student

        //Not in use currently - Front end give user role option
        const role = await db.role.findOne({ where: { name: roleName } });
        if (!role) {
            return res.status(400).send({ message: "Role not found!" });
        }

        req.body.roleId = role.id; // attach roleId to request
        next();
    } catch (error) {
        return res.status(500).send({ message: "Unable to assign role!" });
    }
};


const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
    assignRoleId
};

module.exports = verifySignUp;