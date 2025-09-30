import { createSlice } from "@reduxjs/toolkit"
import { getUserAndProfile, loginUser, registerUser } from "../../action/authAction/index.js"



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
        emptyMessage: (state) => {
            state.message = ""
        }
    },
    extraReducers: (builder) => {

        builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true
            state.message = "Knocking the door..."
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
            state.message = "Knocking the door..."
        })
        .addCase(registerUser.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "register is SuccessFull"
        })
        .addCase(registerUser.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
        .addCase(getUserAndProfile.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getUserAndProfile.fulfilled, (state,action) => {
            console.log(action.payload)
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.profileFetched = true;
            state.user = action.payload;
        })
        .addCase(getUserAndProfile.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload
        })
    }
})

export const {reset, handleLoginUser, emptyMessage} = authSlice.actions
export default authSlice.reducer;