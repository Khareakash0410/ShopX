const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const { GetMyOrders, GetSingleOrderById } = require("../controller/OrderController");



// get all orders for user-----------
router.get("/my-orders", checkToken, GetMyOrders);


// get indiviudal full order details by orderId-------
router.get("/my-order/:id", checkToken, GetSingleOrderById);




module.exports = router;