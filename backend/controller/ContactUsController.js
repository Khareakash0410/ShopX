const ContactUs = require("../models/ContactUs");


const createContactUs = async (req, res) => {
   const {name, email, phone, message} = req.body;

    try {
       let contact = new ContactUs({
            name,
            email,
            phone,
            message
        });

        await contact.save();
        
        res.status(200).json({
            message: "Message Sent Successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

const getAllContactsUs =  async (req, res) => {
    try {
        const contact = await ContactUs.find({});
        res.status(200).json({contact});
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

module.exports = {
    createContactUs,
    getAllContactsUs,
}