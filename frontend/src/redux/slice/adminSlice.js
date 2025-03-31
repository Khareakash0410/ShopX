import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import {toast} from "sonner";



//  fetch all users---------------
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/getAll`, {headers: {
            Authorization: localStorage.getItem("userToken")
        }});

        return response.data
});


//  add a User--------------
export const addUser = createAsyncThunk("admin/addUser", async (userData, {rejectWithValue}) => {
    try {
       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/addNew`, userData, {
        headers: {
            Authorization: localStorage.getItem("userToken")
        }
       });
       toast.success(response.data.message);
       return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});


// update a user-------------
export const updateUser = createAsyncThunk("admin/updateUser", async ({id, name, email, role, profilePic}) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/updateUser/${id}`, {name, email, role, profilePic}, {headers: {
        Authorization: localStorage.getItem("userToken")
    }});

    toast.success(response.data.message);
    return response.data.findUser;
});



// delete a user--------------
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
 const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/delete/${id}`,{headers: {
        Authorization: localStorage.getItem("userToken")
    }});

    toast.success(response.data.message);
    return id;
});




const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            const updatedUser = action.payload;
            
            const userIndex = state.users.findIndex((user) => user._id === updatedUser._id);
            if (userIndex !== -1) {
                state.users[userIndex] = updatedUser;
            }
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
           state.users = state.users.filter((user) => user._id !== action.payload);
        })
        .addCase(addUser.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload.user); //add new user
        })
        .addCase(addUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
    },
});


export default adminSlice.reducer;