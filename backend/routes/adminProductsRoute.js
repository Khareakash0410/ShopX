const express = require("express");

const checkToken = require("../middleware/checkToken");

const checkAdmin = require("../middleware/checkAdmin");
const { GetAllProducts } = require("../controller/AdminProductsController");

const router = express.Router();


// get all products--------
router.get("/", checkToken, checkAdmin, GetAllProducts);






module.exports = router;