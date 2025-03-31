const Order = require("../models/Order");


const GetMyOrders = async (req, res) => {
   try {
    // fetch all order for loggedIn user--------

    const orders = await Order.find({user: req.user}).sort({
        createdAt: -1,
    });

    res.status(200).json(orders);

   } catch (error) {
    res.status(500).json({
    message: "Server Error",
    error: error.message
    });
   }
};

const GetSingleOrderById = async (req, res) => {
     try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if (!order) return res.status(400).json({message: "Order not found!"});

        res.status(200).json(order);
     } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
     }
};


module.exports = {
    GetMyOrders,
    GetSingleOrderById,
};