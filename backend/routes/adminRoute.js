const express = require("express");

const checkToken = require("../middleware/checkToken");

const checkAdmin = require("../middleware/checkAdmin");

const { GetAllUser, AddNewUser, UpdateExisitngUser, DeleteExisitngUser } = require("../controller/AdminController");

const router = express.Router();


// All Routes regarding User------------------------------

// get all user ---------------
router.get("/getAll", checkToken, checkAdmin, GetAllUser);

// add new user---------------
router.post("/addNew", checkToken, checkAdmin, AddNewUser);

// update name, email, role, profilePic-------------
router.put("/updateUser/:id", checkToken, checkAdmin, UpdateExisitngUser);

// delete exisitng user--------------
router.delete("/delete/:id", checkToken, checkAdmin, DeleteExisitngUser);






module.exports = router;