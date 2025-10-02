const db = require("../models");
const User = db.user;
const Role = db.role;
const Homework = db.homework;

//Returns a public message accessible to anyone
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

//Retrieves the logged-in student's profile and their homework
exports.studentBoard = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
        include: [
            { model: Role },
            { model: Homework }
        ]
        });

        if (!user || user.role.name !== "student") {
        return res.status(403).send({ message: "Access denied. Not a student." });
        }

        res.status(200).send({
        message: "Welcome to the Student Dashboard ^.^",
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role.name,
            homeworks: user.homeworks
        }
        });
    } catch (err) {
        res.status(500).send({ message: "Error retrieving student board." });
    }
};

//Retrieves the logged-in teacher's profile and a list of all students with their homework
exports.teacherBoard = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            include: [{ model: Role }]
        });

        if (!user || user.role.name !== "teacher") {
            return res.status(403).send({ message: "Access denied. Not a teacher." });
        }

        const students = await User.findAll({
            where: { roleId: 1 },
            include: [{ model: Homework }]
        });

        res.status(200).send({
            message: "Welcome to the Teacher Dashboard ^.^",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role.name
            },
            students
        });
    } catch (err) {
        res.status(500).send({ message: "Error retrieving teacher board." });
    }
};

//Use to filter student out of all users
exports.findAll = async (req, res) => {
    try {
        const role = req.query.role;

        const condition = role === "student" ? { roleId: 1 } : {};
        const users = await User.findAll({ where: condition });

        res.send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

