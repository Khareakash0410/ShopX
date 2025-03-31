const express = require("express");
const { createContactUs, getAllContactsUs } = require("../controller/ContactUsController");
const checkToken = require("../middleware/checkToken");
const checkAdmin = require("../middleware/checkAdmin");

const router = express.Router();





// contact us request--------------
router.post("/", createContactUs);
router.get("/get", checkToken, checkAdmin, getAllContactsUs);






module.exports = router;