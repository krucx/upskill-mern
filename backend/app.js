const express = require('express');

const app = express();

const institute = require("./routes/instituteRoute");

app.use(express.json());

app.use("/api/v1",institute);

module.exports = app