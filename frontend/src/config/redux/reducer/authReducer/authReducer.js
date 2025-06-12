import { createSlice } from "@reduxjs/toolkit"
import { loginUser } from "../../action/authAction/index.js"


const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    message: '',
    profileFetched: false,
    connections: [],
    connectionReqeust: []
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
            state.isLoading = true;
            statemessage = "Login is SuccessFull"
        })
        .addCase(loginUser.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            
            statemessage = action.payload
        })



    }
})

export default authSlice.reducer;