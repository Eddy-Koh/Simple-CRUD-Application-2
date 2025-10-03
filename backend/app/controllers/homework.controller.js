const db = require("../models");
const Homework = db.homework;
const Op = db.Sequelize.Op;

// Create and Save a new Homework
exports.create = async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send({ message: "Title and description are required." });
    }

    try {
        if (req.role === "student") {
            const homework = {
                title,
                description,
                studentId: req.userId,
                createdByTeacher: false
            };
            const result = await Homework.create(homework);
            return res.status(201).send(result);
        }

        if (req.role === "teacher") {
            const students = await db.user.findAll({ where: { roleId: 1 } }); // roleId 1 = student
            const homeworkList = students.map(student => ({
                title,
                description,
                studentId: student.id,
                createdByTeacher: true
            }));
            const result = await Homework.bulkCreate(homeworkList);
            return res.status(201).send({ message: `Homework added for ${result.length} students.` });
        }

        return res.status(403).send({ message: "Unauthorized role." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Create and Save a new Homework **Teacher provide to all students**
exports.addHomeworkForAllStudents = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate input
        if (!title || !description) {
        return res.status(400).send({ message: "Title and description are required." });
        }

        // Fetch all students (roleId = 1)
        const students = await db.user.findAll({ where: { roleId: 1 } });
        if (!students || students.length === 0) {
        return res.status(404).send({ message: "No students found." });
        }

        // Create one homework per student
        const homeworkEntries = students.map(student => ({
            title,
            description,
            studentId: student.id,
            createdByTeacher: true
        }));

        // Insert into database
        await db.homework.bulkCreate(homeworkEntries);

        res.status(201).send({ message: "Homework assigned to all students." });
    } catch (err) {
        console.error("Error in addHomeworkForAllStudents:", err);
        res.status(500).send({ message: "Internal server error." });
    }
};

// Retrieve all Homeworks
exports.findAll = async (req, res) => {
    try {
        const title = req.query.title;

        if (req.role === "student") {
            const condition = {
                studentId: req.userId,
                ...(title && { title: { [Op.like]: `%${title}%` } })
            };

            const homeworks = await Homework.findAll({ where: condition });
            return res.send(homeworks);
        }

        if (req.role === "teacher") {
            const studentId = req.query.studentId;
            if (!studentId) return res.status(400).send({ message: "studentId query required." });

            const condition = {
                studentId,
                ...(title && { title: { [Op.like]: `%${title}%` } })
            };

            const homeworks = await Homework.findAll({ where: condition });
            return res.send(homeworks);
        }

        return res.status(403).send({ message: "Unauthorized role." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


// Find a single Homework by ID
exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const homework = await Homework.findByPk(id);
        if (!homework) return res.status(404).send({ message: "Homework not found." });

        if (req.role === "student" && homework.studentId !== req.userId) {
            return res.status(403).send({ message: "Unauthorized." });
        }

        return res.send(homework);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


// Update a Homework
exports.update = async (req, res) => {
    const id = req.params.id;
    const { title, description, done } = req.body;

    try {
        const homework = await Homework.findByPk(id);
        if (!homework) return res.status(404).send({ message: "Homework not found." });

        if (req.role === "student" && homework.studentId !== req.userId) {
            return res.status(403).send({ message: "Unauthorized." });
        }

        const updates = {};
        if (title) updates.title = title;
        if (description) updates.description = description;
        if (req.role === "teacher" && typeof done === "boolean") updates.done = done;

        await homework.update(updates);
        return res.send({ message: "Homework updated successfully." });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


// Delete a Homework **Old Version**
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Homework.destroy({ where: { id, studentId: req.userId } })
//         .then(num => {
//         if (num == 1) {
//             res.send({ message: "Homework was deleted successfully!" });
//         } else {
//             res.send({ message: `Cannot delete Homework. Not found or unauthorized.` });
//         }
//         })
//         .catch(err => res.status(500).send({ message: "Could not delete Homework with id=" + id }));
// };

// Delete a Homework
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const homework = await Homework.findByPk(id);

        if (!homework) {
        return res.status(404).send({ message: "Homework not found." });
        }

        // If user is student, only allow deleting their own homework
        if (req.userRole === 'student' && homework.studentId !== req.userId) {
        return res.status(403).send({ message: "Unauthorized: Cannot delete another student's homework." });
        }

        // If teacher, allow deleting any homework
        await homework.destroy();

        res.send({ message: "Homework was deleted successfully." });
    } catch (err) {
        console.error("Error deleting homework:", err);
        res.status(500).send({ message: "Could not delete Homework with id=" + id });
    }
};


// // Delete all Homeworks for the logged-in student
// exports.deleteAll = (req, res) => {
//     Homework.destroy({ where: { studentId: req.userId } })
//         .then(nums => res.send({ message: `${nums} Homeworks were deleted successfully!` }))
//         .catch(err => res.status(500).send({
//         message: err.message || "Some error occurred while removing homeworks."
//         }));
// };

