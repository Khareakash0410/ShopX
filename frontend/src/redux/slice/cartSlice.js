import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// helper function to load cart fom local storage------------
const loadCartFromStorage = () => {
   const storedCart =  localStorage.getItem("cart");
   return storedCart? JSON.parse(storedCart) : { products: [] };
};

//helper function to save cart to local storage------------
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};



// Fetch cart for user or guest------------
export const fetchCart = createAsyncThunk("cart/fetchCart", async ({userId, guestId}, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/carts`, {params: {userId, guestId}});

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// add items to cart or create cart-------------
export const addToCart = createAsyncThunk("cart/addToCart", async ({productId, quantity, size, color, guestId, userId}, {rejectWithValue}) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/carts`, {productId, quantity, size, color, guestId, userId});

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// update quantity of item in cart------------
export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity", async ({productId, quantity, guestId, userId, size, color}, {rejectWithValue}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/carts`, {productId, quantity, size, color, guestId, userId});

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// remove items form cart----------------
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({productId, size, color, guestId, userId}, {rejectWithValue}) => {
    try {
        const response = await axios({
            method: "DELETE",
            url:  `${import.meta.env.VITE_BACKEND_URL}/api/carts`,
            data: {productId, size, color, guestId, userId},
        });
         
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// merge guest cart into loggedIn user cart-------------
export const mergeCart = createAsyncThunk("cart/mergeCart", async ({guestId, user}, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/carts/merge-cart`, {guestId, user}, {
            headers: {
                Authorization: localStorage.getItem("userToken"),
            },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});



const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
             state.cart = {products: []};
             localStorage.removeItem("cart")
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch cart";
        })
        .addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to add to  cart";
        })
        .addCase(updateCartItemQuantity.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(updateCartItemQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to update item quantity";
        })
        .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to item";
        })
        .addCase(mergeCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(mergeCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(mergeCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action?.payload?.message || "Failed to merge cart";
        });
    },
});




export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer;