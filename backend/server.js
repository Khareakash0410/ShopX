const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const app = express();

const userRoutes = require("./routes/userRoutes");

const productRoutes = require("./routes/productRoute");

const cartRoutes = require("./routes/cartRoute");

const checkoutRoutes = require("./routes/checkoutRoute");

const orderRoutes = require("./routes/orderRoute");

const uploadRoutes = require("./routes/uploadRoute");

const subscribeRoutes = require("./routes/subscribeRoute");

const contactRoutes = require("./routes/contactRoute");

const adminRoutes = require("./routes/adminRoute");

const adminProductRoutes = require("./routes/adminProductsRoute");

const adminOrderRoutes = require("./routes/adminOrderRoutes");


app.use(express.json());
app.use(cors());
dotenv.config();



const PORT = process.env.PORT || 9000;

// connect to MongoDb---------------
connectDB();



app.get("/", (req,res) => {
    res.send("Welcome to ShopX API!");
});




// User Routes-----------
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe-letter", subscribeRoutes);
app.use("/api/contact-us", contactRoutes);



// Admin Routes-----------
app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
