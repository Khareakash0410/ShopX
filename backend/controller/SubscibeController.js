const SubscribeLetter = require("../models/SubscribeLetter");
const sendEmail = require("../utils/sendEmail");


const createSubscribeLetter = async (req, res) => {
    const {email} = req.body;
 
    try {
        let subscribe = await SubscribeLetter.findOne({email});

        if(subscribe) return res.status(400).json({message: "Email already subscribed"});

        subscribe = new SubscribeLetter({email});

        await subscribe.save();

        await sendEmail({
            email,
            message: "Thanks for subscribing our newsletter. \nYou will now get updated with our new and cool products. \n[Team ShopX]",
            subject: "Yup! updated with fashion"
        });

        res.status(200).json({
            message: "Subscribe to NewsLetter!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

const getAllSubscribes = async (req, res) => {
    try {
        const subscribe = await SubscribeLetter.find({});
        res.status(200).json({subscribe});
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

module.exports = {
    createSubscribeLetter,
    getAllSubscribes,
};