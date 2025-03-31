const express = require("express");
const checkToken = require("../middleware/checkToken");
const { CreateCheckout, UpdateCheckout, FinalizeCheckout } = require("../controller/CheckoutController");


const router = express.Router();



// create checkout session------------
router.post("/", checkToken, CreateCheckout);

// update checkout after successfully payment as paid------
router.put("/:id/pay", checkToken, UpdateCheckout);

// finalize checkout and convert into successful order after confirm payment------
router.post("/:id/finalize", checkToken, FinalizeCheckout);






module.exports = router;