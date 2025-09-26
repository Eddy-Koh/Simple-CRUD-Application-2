// Routing to specific controller
module.exports = app => {
    const homeworks = require("../controller/homework.controller.js");

    var router = require("express").Router();

    // Create a new Homework
    router.post("/", homeworks.create);

    // Retrieve all Homework
    router.get("/", homeworks.findAll);

    // Retrieve all done HomeworkS
    router.get("/done", homeworks.findAllDone);

    // Retrieve a single Homework with id
    router.get("/:id", homeworks.findOne);

    // Update a Homework with id
    router.put("/:id", homeworks.update);

    // Delete a Homework with id
    router.delete("/:id", homeworks.delete);

    // Delete all Homeworks
    router.delete("/", homeworks.deleteAll);

    app.use('/api/homeworks', router);
};