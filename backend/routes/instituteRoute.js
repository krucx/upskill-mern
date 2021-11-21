const express = require("express");
const { getAllInstitutes, createInstitute, updateInstitute, deleteInstitute, getInstitute } = require("../controllers/instituteController");

const router = express.Router();

router.route("/institutes").get(getAllInstitutes);
router.route("/institute/new").post(createInstitute);
router.route("/institute/:id").put(updateInstitute).delete(deleteInstitute).get(getInstitute);

module.exports = router