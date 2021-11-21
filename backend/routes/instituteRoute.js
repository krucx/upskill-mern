const express = require("express");
const { getAllInstitutes } = require("../controllers/instituteController");

const router = express.Router();

router.route("/institutes").get(getAllInstitutes);

module.exports = router