const Order = require("../models/Order");


const GetAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find({}).populate("user", "name email");

        res.status(200).json({
            message: "All Orders",
            allOrders
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

const UpdateOrderStatus = async (req, res) => {
    try {
        const findOrder = await Order.findById(req.params.id).populate("user", "name");

        if (findOrder) {
            findOrder.status = req.body.status || findOrder.status;
            findOrder.isDelivered = req.body.status === "Delivered" ? true : Order.isDelivered;
            findOrder.deliveredAt = req.body.status === "Delivered" ? Date.now() : Order.deliveredAt;

            await findOrder.save();


            res.status(200).json({
                message: "Order Updated Successfully!",
                findOrder
            });
        }   else {
            res.status(400).json({message: "Order not found"});
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

const DeleteOrder = async (req, res) => {
   try {
    const findOrder = await Order.findById(req.params.id);

    if (findOrder) {
        await findOrder.deleteOne();
        res.status(200).json({message: "Order Deleted!"});
    }  else {
        res.status(400).json({message: "Order Already Deleted!"});
    }
   } catch (error) {
    res.status(500).json({
        message: "Server Error",
        error: error.message
    });
   }
};


module.exports = {
    GetAllOrders,
    UpdateOrderStatus,
    DeleteOrder,
}