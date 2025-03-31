const Cart = require("../models/Cart");

const Product = require("../models/Product");


// helper function to get cart by userid or guestid-----
const GetCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({guestId});
  } 

  return null;
};

const CreateCart = async (req, res) => {
   const {productId, quantity, size, color, guestId, userId} = req.body;

   try {
      const product =   await Product.findById(productId);

      if (!product) return res.status(400).json({message: "Product not found!"});


    //   check user loggedin or not-------------
    let cart = await GetCart(userId, guestId);

    // if cart exists then update -----
    if (cart) {
        const productIndex = cart.products.findIndex((p) => 
            p.productId.toString() === productId &&
            p.size === size &&
            p.color === color
        );

        if (productIndex > -1) {
            // product already exists then update quantity------
            cart.products[productIndex].quantity += quantity
        } else {
            // add new product----
            cart.products.push({
                productId,
                name: product.name,
                image: product.images[0].url,
                price: product.price,
                size,
                color,
                quantity,
            });
        }


        // recalculate total price-------------

        cart.totalPrice = cart.products.reduce((acc, item) => acc  +  item.price * item.quantity, 0);


        await cart.save();

        return res.status(200).json(cart);
    }  else {
        // create a new cart for guest or login user-----

        const newCart = await Cart.create({
            user: userId ? userId : undefined,
            guestId: guestId ? guestId : "guest_" + new Date().getTime(),
            products: [
                {
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                },
            ],
            totalPrice: product.price * quantity,
        });

        return res.status(200).json(newCart);
    }
   } catch (error) {
     res.status(500).json({
        message: "Server Error",
        error: error.message
     });
   }
};

const UpdateCart = async (req, res) => {
    const {productId, quantity, size, color, guestId, userId} = req.body;

    try {
        let cart = await GetCart(userId, guestId);

        if (!cart)  return res.status(400).json({message: "Cart not found!"});

        const productIndex = cart.products.findIndex((p) => 
            p.productId.toString() === productId &&
            p.size === size &&
            p.color === color
        );

        if (productIndex > -1) {
        //    update product quantity---------
         if (quantity > 0) {
            cart.products[productIndex].quantity = quantity;
         } else {
            // remove product if quantity <1 or 0-------
            cart.products.splice(productIndex, 1);
         }

         cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

         await cart.save();


         return res.status(200).json(cart);

        }  else {
            return res.status(400).json({
                message: "Product not found in cart"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

const DeleteCart = async (req, res) => {
  const {productId, size, color, guestId, userId} = req.body;
  

  try {
    let cart = await GetCart(userId, guestId);

    if(!cart) return res.status(400).json({message: "Cart not found!"});

    const productIndex = cart.products.findIndex((p) => 
    p.productId.toString() === productId &&
    p.size === size &&
    p.color === color
    );

    if (productIndex > -1) {
        cart.products.splice(productIndex, 1);

        cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

        await cart.save();

        res.status(200).json(cart);
    } else {
        return res.status(400).json({message: "Product not found in cart"});
    }

  } catch (error) {
    res.status(500).json({
        message: "Server Error",
        error: error.message
    });
  }
};

const GetCartDetails = async (req, res) => {
   const {userId, guestId} = req.query;

   try {
    const cart = await GetCart(userId, guestId);

    if(cart) {
        return res.status(200).json(cart)
    } else {
        res.status(400).json({message: "Cart not found"});
    }
   } catch (error) {
     res.status(500).json({
        message: "Server Error",
        error: error.message
     });
   }
};

const MergeCart = async (req, res) => {
  const {guestId} = req.body;

  try {
    // find guest cart and user cart----------
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user });

    if (guestCart) {
        if (guestCart.products.length === 0) {
            return res.status(400).json({message: "Cart is empty!"});
        }  

        if(userCart) {
            // merge guest cart into user cart-------------------
            guestCart.products.forEach((guestItem) => {
                const productIndex = userCart.products.findIndex((item) => 
                item.productId.toString() === guestItem.productId.toString() &&
                item.size === guestItem.size &&
                item.color === guestItem.color
                );

                if (productIndex > -1) {
                    // if item already exists in user cart then only update quantity------------
                    userCart.products[productIndex].quantity += guestItem.quantity;
                }   else {
                    // otherwise add guest item to user cart---------
                    userCart.products.push(guestItem);
                }
            });

          userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
          
          await userCart.save();
          
        //   remove guest cart after merging---------
          try {
            await Cart.findOneAndDelete({ guestId });
          } catch (error) {
            res.status(400).json({message: "Error deleting guest cart"});
          }

         return res.status(200).json(userCart);
        }  else {
            //if exisiting user has no cart then assign guest cart to user -------------
            guestCart.user = req.user;
            guestCart.guestId = undefined;
            await guestCart.save();

            return res.status(200).json(guestCart);
        }

     }  else {
        if (userCart) {
            // guest cart already merged then return user cart------
            return res.status(200).json(userCart);
        }

        return res.status(400).json({message: "Guest Cart not found!"});
     }
  } catch (error) {
    res.status(500).json({
        message: "Server Error",
        error: error.message
    });
  }
};


module.exports = {
    CreateCart,
    UpdateCart,
    DeleteCart,
    GetCartDetails,
    MergeCart,
};
