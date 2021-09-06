/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const api = require("./routes");



//var corsOptions = {
//  origin: "http://localhost:8080",
//  credentials: true,
//};

//app.use(cors(corsOptions));

// Cross Orgine
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// const db = require("./models");
// //db.sequelize.sync();

// indev drop database
// db.sequelize.sync().then(() => {//  { force: true }
//     console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.use("/api", api);

//.sync({ force: true })//.sync({ alter: true })
db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});