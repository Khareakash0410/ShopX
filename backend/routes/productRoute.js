const express = require("express");

const checkToken = require("../middleware/checkToken");
const { createProduct, UpdateProduct, DeleteProduct, GetProducts, GetSingleProduct, GetSimiliarProduct, BestSeller, NewArrivals } = require("../controller/ProductController");
const checkAdmin = require("../middleware/checkAdmin");

const router = express.Router();

// @access Private/admin for Product creation, updation and deletion-----
router.post("/create", checkToken, checkAdmin, createProduct);
router.put("/update/:id", checkToken, checkAdmin, UpdateProduct);
router.delete("/delete/:id", checkToken, checkAdmin, DeleteProduct);




// @access Public/user  all product based on filtering , searching and sorting-----
router.get("/get", GetProducts);




// get best seller product via highest rating product------
router.get("/best-seller", BestSeller);





// get new arrivals based on latest current date of 8 products----
router.get("/new-arrivals", NewArrivals);





// get inidividual product by passing product id in params-----
router.get("/getSingle/:id", GetSingleProduct);




// get similiar product based on gender categroy of product @access Public/user--------
router.get("/get/similiar/:id", GetSimiliarProduct);









module.exports = router;