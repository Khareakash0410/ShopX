const express = require("express");
const { createSubscribeLetter, getAllSubscribes } = require("../controller/SubscibeController");
const checkToken = require("../middleware/checkToken");
const checkAdmin = require("../middleware/checkAdmin");


const router = express.Router();



// newsletter subscription request------------
router.post("/subscribe", createSubscribeLetter);
router.get("/subscribe/get", checkToken, checkAdmin, getAllSubscribes);






module.exports = router;