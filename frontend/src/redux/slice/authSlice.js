import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "sonner";


// retrieve user info from local storage if available----------
const userFromStorage = localStorage.getItem("userInformation") ? JSON.parse(localStorage.getItem("userInformation")) : null;

// check for exisitng guestId in local storage or generate new one--------------
const initialGuestId = localStorage.getItem("guestInformation") || `guest_${new Date().getTime()}`;

localStorage.setItem("guestInformation", initialGuestId);

// async thunk for login--------------
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);
        localStorage.setItem("userInformation", JSON.stringify(response.data.userWithoutPassword));
        localStorage.setItem("userToken", response.data.token);
        toast.info(response.data.message);     
        return response.data.userWithoutPassword;
    } catch (error) {
        toast.info(error.response.data.message)
        return rejectWithValue(error.response.data.message);
    }
});

// async thunk for register--------------
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData);
        localStorage.setItem("userInformation", JSON.stringify(response.data.userWithoutPassword));
        localStorage.setItem("userToken", response.data.token);
        toast.info(response.data.message)
        return response.data.userWithoutPassword;
    } catch (error) {
        toast.info(error.response.data.message)
        return rejectWithValue(error.response.data.message);
    }
});

// async login for update-------------
export const updateUser = createAsyncThunk("auth/updateUser", async (data, {rejectWithValue}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/update`, data, {
                headers: {
                  Authorization: localStorage.getItem("userToken")
                }
        });
        localStorage.setItem("userInformation", JSON.stringify(response.data.userWithoutPassword));
        toast.success(response.data.message);
        return response.data.userWithoutPassword
    } catch (error) {
        toast.error(error.response.data.message);
       return rejectWithValue(error.response.data.message);
    }
});

// slices---------------
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: userFromStorage,
        guestId: initialGuestId,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`; //reset guestId on logout---
            localStorage.removeItem("userInformation");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestInformation", state.guestId); //set new guestId in local strogae
            toast.success("Logged out Successfully");
        },
        generateNewGuestId: (state) => {
            state.guestId =  `guest_${new Date().getTime()}`;
            localStorage.setItem("guestInformation", state.guestId);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});



export const {logout, generateNeGuestId} = authSlice.actions;
export default authSlice.reducer;