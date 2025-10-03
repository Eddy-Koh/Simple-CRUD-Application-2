const { authJwt } = require("../middleware");
const homeworks = require("../controllers/homework.controller.js");

// Routing to specific controller
module.exports = app => {
    const router = require("express").Router();

    //Old version without authentication
    /*
    router.post("/", homeworks.create); // Create a new Homework
    router.get("/", homeworks.findAll); // Retrieve all Homework
    router.get("/done", homeworks.findAllDone); // Retrieve all done HomeworkS
    router.get("/:id", homeworks.findOne); // Retrieve a single Homework with id
    router.put("/:id", homeworks.update); // Update a Homework with id
    router.delete("/:id", homeworks.delete); // Delete a Homework with id
    router.delete("/", homeworks.deleteAll); // Delete all Homeworks
    */

    // Create homework (student)
    router.post("/", authJwt.verifyToken, homeworks.create);

    // Create homework (teacher for all students)
    router.post("/add-all", [authJwt.verifyToken, authJwt.isTeacher], homeworks.addHomeworkForAllStudents);

    // Update homework (student or teacher)
    router.put("/:id", authJwt.verifyToken, homeworks.update);

    // Delete homework (student or teacher)
    router.delete("/:id", authJwt.verifyToken, homeworks.delete);

    // View homework list
    // - Student: gets own list
    // - Teacher: must pass studentId to get specific student's list
    router.get("/", authJwt.verifyToken, homeworks.findAll);

    // View specific homework
    router.get("/:id", authJwt.verifyToken, homeworks.findOne);

    app.use('/api/homeworks', router);
};