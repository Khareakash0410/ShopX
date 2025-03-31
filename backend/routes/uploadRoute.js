const express = require("express");
const router = express.Router();

const multer = require("multer");

const { UploadSingleFile } = require("../controller/UploadController");




// multer configuration-------
const storage = multer.memoryStorage();
const upload = multer({ storage });





router.post("/", upload.single("image"), UploadSingleFile);







module.exports = router;