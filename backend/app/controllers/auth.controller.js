const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Registers a new user with hashed password and assigned role
exports.signup = async (req, res) => {
    try {
        // Create user with roleId from middleware
        const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        roleId: req.body.roleId // comes from assignRoleId middleware
        });

        res.status(201).send({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

//Authenticates user credentials and returns a JWT token for session access
exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { username: req.body.username },
            include: Role // include role for access control
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
        }

        const token = jwt.sign({ id: user.id, role: user.role.name},
            config.secret,
        {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: 86400 // 24 hours
        });

        req.session.token = token;

        return res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role.name, // single role
            accessToken: token
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

//Clears the user's session to log them out
exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        res.status(500).send({ message: "Signout failed." });
    }
};
