// Create and set up express app
const express = require("express");
const cors = require("cors");

const app = express(); //Create app

//Allows requests from port 4200
var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// Middleware setup
app.use(express.json()); //Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); //Parses form data, e.g. from HTML forms


//Databasse initialization
const db = require("./app/models");
db.sequelize.sync({ force: false}).then(() => { //force: true will drop the table if it already exists
    console.log("Drop and re-sync db.");        //force: false will not drop the table
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to a simple CRUD application." });
});

// Include homework routes
require("./app/routes/homework.routes")(app);

app.post('/api/users', (req, res) => {
    res.send('User created');
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});