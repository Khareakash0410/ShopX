const express = require("express");
const { RegisterUser, LoginUser, UpdateUser, DeleteUser, ForgetPassword, ResetPassword, getUser, PasswordVerify } = require("../controller/UserController");
const checkToken = require("../middleware/checkToken");

const router = express.Router();



router.post("/register", RegisterUser);
router.post("/login", LoginUser)
router.put("/update", checkToken, UpdateUser);
router.delete("/delete", checkToken, DeleteUser);
router.post("/forgetPassword", ForgetPassword);
router.put("/resetPassword/:resetToken", ResetPassword);
router.get("/profile", checkToken, getUser);
router.post("/passwordVerify", checkToken, PasswordVerify);


module.exports = router;



