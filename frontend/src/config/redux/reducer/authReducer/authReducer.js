import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser } from "../../action/authAction/index.js"


const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    message: '',
    profileFetched: false,
    connections: [],
    connectionRequest: []
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        reset: () => initialState,
        handleLoginUser: (state) => {
            state.message = "hello"
        },

    },
    extraReducers: (builder) => {

        builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true
            state.message = "lnocking the door..."
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.loggedIn = true;
            state.message = "Login is SuccessFull"
        })
        .addCase(loginUser.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
        .addCase(registerUser.pending,(state) => {
            state.isLoading = true
            state.message = "lnocking the door..."
        })
        .addCase(registerUser.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.loggedIn = true;
            state.message = "register is SuccessFull"
        })
        .addCase(registerUser.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })


    }
})

export default authSlice.reducer;