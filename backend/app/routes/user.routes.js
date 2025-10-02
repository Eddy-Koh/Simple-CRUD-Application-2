const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/user/all", controller.allAccess);

    app.get(
        "/api/user/student",
        [authJwt.verifyToken, authJwt.isStudent],
        controller.studentBoard
    );

    app.get(
        "/api/user/teacher",
        [authJwt.verifyToken, authJwt.isTeacher],
        controller.teacherBoard
    );

    // get users by role
    app.get("/api/users", [authJwt.verifyToken], controller.findAll);
};