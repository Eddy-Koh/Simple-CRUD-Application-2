// Create and set up express app
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express(); //Create app

//Allows requests from port 4200
var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// Middleware setup
app.use(express.json()); //Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); //Parses form data, e.g. from HTML forms
app.use(
    cookieSession({
        name: "homework-session",
        keys: ["COOKIE_SECRET"], // should use as secret environment variable
        httpOnly: true,
    })
);


//Database initialization
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync({ force: false}).then(() => { //force: true will drop the table if it already exists
    console.log("DB synced.");        //force: false will not drop the table
    initial();
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to a simple homework checklist application." });
});

// Include routes
require("./app/routes/homework.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// app.post('/api/users', (req, res) => {
//     res.send('User created');
// });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// Seed roles safely
async function initial() {
    console.log("Seeding roles if not present...");
    const roles = [
        { id: 1, name: "student" },
        { id: 2, name: "teacher" },
    ];

    for (const role of roles) {
        await Role.findOrCreate({
        where: { id: role.id },
        defaults: { name: role.name }
        });
    }
}