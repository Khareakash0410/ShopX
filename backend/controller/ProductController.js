const Product = require("../models/Product")


const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInSTock,
            sku,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight, 
        } = req.body;

        const findProduct = await Product.findOne({sku});
        if (findProduct) {
            return res.status(400).json({message: "Product Already Exists"});
        }


        const product = new Product ({
            name,
            description,
            price,
            discountPrice,
            countInSTock,
            sku,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            user: req.user,
        });

        await product.save(); 
        res.status(200).json({message: "Product created Successfully!", product});
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};

const UpdateProduct = async (req, res) => {
  try {
    const {
        name,
        description,
        price,
        discountPrice,
        countInSTock,
        sku,
        category,
        brand,
        sizes,
        colors,
        collections,
        material,
        gender,
        images,
        isFeatured,
        isPublished,
        tags,
        dimensions,
        weight, 
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).json({
        message: "Product not found"
    });
    
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discountPrice = discountPrice || product.discountPrice;
    product.countInSTock = countInSTock || product.countInSTock;
    product.sku = sku || product.sku;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.sizes = sizes || product.sizes;
    product.colors = colors || product.colors;
    product.collections = collections || product.collections;
    product.material = material || product.material;
    product.gender = gender || product.gender;
    product.images = images || product.images;
    product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
    product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
    product.tags = tags || product.tags;
    product.dimensions = dimensions || product.dimensions;
    product.weight = weight || product.weight;

    await product.save();

    res.status(200).json({
        message: "Product Updated Successfully!",
        product
    });
  } catch (error) {
    res.status(500).json({
        message: "Server Error",
        error: error.message
    });
  }
};

const DeleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) return res.status(400).json({
            message: "Product Already deleted!"
        });
       
        res.status(200).json({
            message: "Product deleted Successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

const GetProducts = async (req, res) => {
   try {
    const {
        collection, 
        size, 
        color, 
        gender, 
        minPrice, 
        maxPrice, 
        sortBy, 
        search, 
        category, 
        material, 
        brand, 
        limit } = req.query;

        let query = {};

        // filter logic---
        if (collection && collection.toLocaleLowerCase() !== "all") {
            query.collections = collection;
        };
        if (category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        };
        if (material) {
            query.material = { $in: material.split(",") };
        };
        if (brand) {
            query.brand = { $in: brand.split(",") };
        };
        if (size) {
            query.sizes = { $in: size.split(",") };
        };
        if (color) {
            query.colors = { $in: [color] };
        };
        if (gender) {
            query.gender = gender;
        };


        // filtering by price --------
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        };

        // searching by name or description-----
        if(search) {
          query.$or = [
            {name: { $regex: search, $options: "i" }},
            {description: { $regex: search, $options: "i" }},
          ];
        };

        // sorting by price HtoL, LtoH, popularity------
        let sort = {};
        if(sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = {price: 1};
                    break;
                
                case "priceDesc":
                    sort = {price: -1};
                    break;
                
                case "popularity":
                    sort = {rating: -1};
                    break;

                default:
                    break;
            }
        };

        // fetch product and aplly sort and limit-------
       let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);

       res.status(200).json(products);

   } catch (error) {
    res.status(500).json({
        message: "Server Error",
        error: error.message
    });
   }
};

const GetSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(400).json({
            message: "Product not found!"
        })


        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

const GetSimiliarProduct = async(req, res) => {
   
    try {
        const product = await Product.findById(req.params.id);

        if(!product) return res.status(400).json({message: "Product not found!"});

        const similiarProducts = await Product.find({
            _id: { $ne: req.params.id },
            gender: product.gender,
            category: product.category,
        }).limit(4);

        res.status(200).json(similiarProducts);
    } catch (error) {
        res.status(500).json({
        message: "Server Error",
        error: error.message});
    }
};

const BestSeller = async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });

    if (!bestSeller) return res.status(400).json({message: "Best Seller yet to assigned!"});

    res.status(200).json(bestSeller);
  } catch (error) {
    res.status(500).json({
        message: "Server Error",
        error: error.message
    });
  }
};

const NewArrivals = async (req, res) => {
    try {
        // fetch latest 8 products----
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);

        if (!newArrivals) return res.status(400).json({message: "New Arrivals yet to come!"});

        res.status(200).json(newArrivals);

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


module.exports = {
    createProduct,
    UpdateProduct,
    DeleteProduct,
    GetProducts,
    GetSingleProduct,
    GetSimiliarProduct,
    BestSeller,
    NewArrivals,
}