import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "sonner";


const API_URL = `${import.meta.env.VITE_BACKEND_URL}`
const USER_TOKEN = localStorage.getItem("userToken")

// fetch admin products--------
export const fetchAdminProducts = createAsyncThunk("adminProduct/fetchAdminProducts", async () => {
    const response = await axios.get(`${API_URL}/api/admin/products`, {headers: {
        Authorization: USER_TOKEN
    }});
    return response.data.AllProducts;
});


//  to create new product------------
export const createProduct = createAsyncThunk("adminProduct/createProduct", async (productsData, {rejectWithValue}) => {

    try {
        const response = await axios.post(`${API_URL}/api/products/create`, productsData, {headers: {
            Authorization: USER_TOKEN
        }});
    
        toast.success(response.data.message);
        return response.data.product;
    } catch (error) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
    
});


//  to update products--------
export const updateProduct = createAsyncThunk("adminProduct/updateProduct", async ({id, productsData}) => {
   const response = await axios.put(`${API_URL}/api/products/update/${id}`, productsData, {headers: {
    Authorization: USER_TOKEN
   }});

   toast.success(response.data.message);
   return response.data.product;
});


//  to delete product---------
export const deleteProduct = createAsyncThunk("adminProduct/deleteProduct", async (id) => {
  const response =  await axios.delete(`${API_URL}/api/products/delete/${id}`, {headers: {
        Authorization: USER_TOKEN
    }});

    toast.success(response.data.message);
    return id;
});



const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAdminProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAdminProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(fetchAdminProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = state.error.message;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload);
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
           const index = state.products.findIndex((product) => product._id === action.payload._id);

           if (index !== -1) {
            state.products[index] = action.payload;
           }
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload);
        });
    },
});




export default adminProductSlice.reducer;