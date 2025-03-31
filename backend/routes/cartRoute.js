const express = require("express");
const { CreateCart, UpdateCart, DeleteCart, GetCartDetails, MergeCart } = require("../controller/CartController");
const checkToken = require("../middleware/checkToken");

const router = express.Router();



// add product in cart for login or not user------------
router.post("/", CreateCart);

// update product quantity in cart for guest or login user-----
router.put("/", UpdateCart);

// remove product from cart for login or guest user-------
router.delete("/", DeleteCart);

// get cart for login or guest user---------
router.get("/", GetCartDetails);

// merge the guest cart data into login user cart when it loggedin--------
router.post("/merge-cart", checkToken, MergeCart);







module.exports = router;