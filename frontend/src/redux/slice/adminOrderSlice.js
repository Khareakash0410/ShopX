import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "sonner";


//  all orders---------------
export const fetchAllOrders = createAsyncThunk("adminOrders/fetchAllOrders", async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/getAll`, {headers: {
            Authorization: localStorage.getItem("userToken")
        }});
          
        return response.data;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});



// update order status---------------
export const updateOrderStatus = createAsyncThunk("adminOrders/updateOrderStatus", async ({id, status}, {rejectWithValue}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/update/${id}`, {status}, {headers: {
            Authorization: localStorage.getItem("userToken")
        }});

        console.log(response.data);
        
        toast.success(response.data.message);
        return response.data.findOrder;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});


// delete order----------------
export const deleteOrder = createAsyncThunk("adminOrders/deleteOrder", async (id, {rejectWithValue}) => {
    try {
     await axios.delete(`${import.meta.env.VITE_BACKEND_URL}//api/admin/orders/update/${id}`, {headers: {
            Authorization: localStorage.getItem("userToken")
        }});

        return id;
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});




const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        loading: false,
        error: null,
        orders: [],
        totalOrders: 0,
        totalSales: 0,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload.allOrders;
            state.totalOrders = action.payload.allOrders.length;

            const totalSales = action.payload.allOrders.reduce((acc, order) => {
                return acc + order.totalPrice;
            }, 0);
            state.totalSales = totalSales;
        })
        .addCase(fetchAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
            const updatedOrder = action.payload;
            const orderIndex = state.orders.findIndex((order) => order._id === updatedOrder._id);

            if (orderIndex !== -1) {
                state.orders[orderIndex] = updatedOrder;
            }
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.orders = state.orders.filter((order) => order._id !== action.payload)
        });
    },
});

export default adminOrderSlice.reducer;