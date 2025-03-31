const Checkout = require("../models/Checkout");

const Cart = require("../models/Cart");

const Product = require("../models/Product");

const Order = require("../models/Order");
 

const CreateCheckout = async (req, res) => {
   const {
    checkoutItems ,
    shippingAddress,
    paymentMethod,
    totalPrice,
    } = req.body;

     if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({message: "No items to checkout!"});
     }

     try {
        // create checkout sesssion------
        const newCheckout = await Checkout.create({
            user: req.user,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending",
            isPaid: false,
        });
        res.status(200).json(newCheckout);
     } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
     }
};

const UpdateCheckout = async (req, res) => {
   const {
    paymentStatus,
    paymentDetails
    } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout) return res.status(400).json({message: "Checkout not found!"});

        if (paymentStatus === "paid") {
            checkout.isPaid = true,
            checkout.paymentStatus = paymentStatus,
            checkout.paymentDetails = paymentDetails,
            checkout.paidAt = Date.now(),
            await checkout.save();
            
            return res.status(200).json(checkout);
        }  else {
            return res.status(400).json({message: "Invalid Pyament Status!"});
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

const FinalizeCheckout = async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout) return res.status(400).json({message: "Checkout not created!"});

        if (checkout.isPaid && !checkout.isFinalized) {
            // create final order based on checkout details-----
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails
            });

            // marked checkout finalized to avoid duplicate--------
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();

            await checkout.save();

            // delete usercart details-------------
            await Cart.findOneAndDelete({user: checkout.user});

           return res.status(200).json(finalOrder);
        }   else if (checkout.isFinalized) {
            return res.status(400).json({message: "Checkout Already finalized!"});
        }   else {
            res.status(400).json({message: "Checkout not paid yet!"});
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


module.exports = {
    CreateCheckout,
    UpdateCheckout,
    FinalizeCheckout,
};