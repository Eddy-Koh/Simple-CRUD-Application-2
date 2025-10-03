const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

//Checks for a JWT in the request headers, verifies it using the secret key
const verifyToken = (req, res, next) => {
    // let token = req.headers["x-access-token"];
    let token = req.headers["authorization"] || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length); // remove "Bearer "
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    });
};

//Access only for teachers
const isTeacher = (req, res, next) => {
    if (req.role === "teacher") return next();
    return res.status(403).send({ message: "Require Teacher Role!" });
};

//Access only for students
const isStudent = (req, res, next) => {
    if (req.role === "student") return next();
    return res.status(403).send({ message: "Require Student Role!" });
};

const authJwt = {
    verifyToken,
    isTeacher,
    isStudent,
};

module.exports = authJwt;