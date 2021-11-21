const express = require("express");
const { getAllInstitutes, createInstitute } = require("../controllers/instituteController");

const router = express.Router();

router.route("/institutes").get(getAllInstitutes);
router.route("/institute/new").post(createInstitute);

module.exports = router