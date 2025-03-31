import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// Async thunk to fetch products by collection and optional filters----------
export const fetchProductsByFilters = createAsyncThunk("products/fetchByFilters", async ({
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
    limit,
}) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);


    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/get?${query.toString()}`);
    
    return response.data;

   
    
});



// Async thunk to fetch single product by id-----------
export const fetchProductDetails = createAsyncThunk("products/fetchProductDetails", async ({id}) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getSingle/${id}`);

    return response.data;
});



// Async thunk for update Product-------------
export const updateproduct = createAsyncThunk("product/updateproduct", async ({id, productsData}) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/update/${id}`, productsData, {
        headers: {
            Authorization: localStorage.getItem("userToken")
        }
    });

    return response.data;
});



// Async thunk for fetching similiar products-------------
export const fetchSimiliarProduct = createAsyncThunk("product/fetchSimiliarProduct", async ({id}) => {
   const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/get/similiar/${id}`);

   return response.data;
});




const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProducts: null, //store the details of single product-----
        similiarProducts: [],
        loading: false,
        error: null,
        filters: {
            category: "",
            size: "",
            color: "",
            gender: "",
            brand: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            material: "",
            collection: "",
        },
    },

    reducers: {
        setFilters: (state, action) => {
            state.filters = {...state.filters, ...action.payload };
        },

        clearFilters: (state) => {
         state.filters = {
            category: "",
            size: "",
            color: "",
            gender: "",
            brand: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            material: "",
            collection: ""
         };     
       },
    },

    extraReducers: (builder) => {
        builder   
        //handle fetching products by filters----------
        .addCase(fetchProductsByFilters.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
           state.loading = false;
           state.products = Array.isArray(action.payload) ? action.payload : [];
        })
        .addCase(fetchProductsByFilters.rejected, (state, action) => {
           state.loading = false;
           state.error = action.error.message;
        })
        //handle fetching single product--------------
        .addCase(fetchProductDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action) => {
           state.loading = false;
           state.selectedProducts = action.payload;
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
           state.loading = false;
           state.error = action.error.message;
        })
        //handle update products----------
        .addCase(updateproduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateproduct.fulfilled, (state, action) => {
           state.loading = false;
           const updatedProduct = action.payload;
           const index = state.products.findIndex((product) => product._id === updatedProduct._id);
           if(index !== -1) {
             state.products[index] = updatedProduct;
           }
        })
        .addCase(updateproduct.rejected, (state, action) => {
           state.loading = false;
           state.error = action.error.message;
        })
        // handle fetching similiar products-----------
        .addCase(fetchSimiliarProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSimiliarProduct.fulfilled, (state, action) => {
           state.loading = false;
           state.similiarProducts = action.payload;
        })
        .addCase(fetchSimiliarProduct.rejected, (state, action) => {
           state.loading = false;
           state.error = action.error.message;
        })
    },
});



export const {setFilters, clearFilters} = productSlice.actions;
export default productSlice.reducer;