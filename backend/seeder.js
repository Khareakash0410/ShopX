const mongooose = require("mongoose");

const dotenv = require("dotenv");

const Product = require("./models/Product");

const User = require("./models/User");

const Cart = require("./models/Cart");

const products = require("./data/products");


dotenv.config();

// connect to DB--
mongooose.connect(process.env.MONGO_URI);

// function to seed data in Db-----
const seedData = async () => {
    try {
        // clear exisited data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // create default admin user

        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "1234567890",
            role: "admin"
        });

        // assign default userId to each product-----
        const userId = createdUser._id;

        const sampleProducts = products.map((product) => {
            return {...product, user: userId}
        });

        // insert into database after adding userid-----
        await Product.insertMany(sampleProducts);

        console.log("Product data seeded successfully!");

        process.exit();
        

    } catch (error) {
        console.log("Error seeding data", error);
        process.exit(1);
    }
}



seedData();