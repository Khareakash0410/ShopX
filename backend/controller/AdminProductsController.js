const Product = require("../models/Product");


const GetAllProducts = async (req, res) => {
    try {
        const AllProducts = await Product.find({});

        res.status(200).json({
            message: "All Products",
            AllProducts
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


module.exports = {
    GetAllProducts,
}