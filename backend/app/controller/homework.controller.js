const db = require("../models");
const Homework = db.homeworks;
const Op = db.Sequelize.Op;

// Create and Save a new Homework
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Homework
    const homework = {
        title: req.body.title,
        description: req.body.description,
        done: req.body.done ? req.body.done : false
    };

    // Save Homework in the database
    Homework.create(homework)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the homework."
        });
    });
};

// Retrieve all Homeworks from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Homework.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving homeworks."
            });
        });
};

// Find a single Homework with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Homework.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Homework with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Homework with id=" + id
            });
        });
};

// Update a Homework by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Homework.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Homework was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Homework with id=${id}. Maybe Homework was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Homework with id=" + id
            });
        });
};

// Delete a Homework with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Homework.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Homework was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Homework with id=${id}. Maybe Homework was not found!`
                });
            }
    })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Homework with id=" + id
            });
        });
};

// Delete all Homeworks from the database.
exports.deleteAll = (req, res) => {
    Homework.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Homeworks were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all homeworks."
            });
        });
};

// Find all done Homeworks
exports.findAllDone = (req, res) => {
        Homework.findAll({ where: { done: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving homeworks."
        });
    });
};