const express = require('express');

const app = express();

const institute = require("./routes/instituteRoute");

app.use("/api/v1",institute);

module.exports = app