const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
       type: String,
       required: true, 
    },
}, {timestamps: true});

module.exports = mongoose.model("ContactUs", contactUsSchema);