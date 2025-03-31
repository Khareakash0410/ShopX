const express = require("express");


const router = express.Router();


const checkToken  = require("../middleware/checkToken");

const checkAdmin  = require("../middleware/checkAdmin");
const { GetAllOrders, UpdateOrderStatus, DeleteOrder } = require("../controller/AdminOrderController");




// get all orders by store----------------
router.get("/getAll", checkToken, checkAdmin, GetAllOrders);

// update order status--------------------
router.put("/update/:id", checkToken, checkAdmin, UpdateOrderStatus);

// delete orders----------------
router.delete("/delete/:id", checkToken, checkAdmin, DeleteOrder);




module.exports = router;