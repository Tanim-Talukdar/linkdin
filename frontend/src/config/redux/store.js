import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducer/authReducer/authReducer.js"
import postReducer from "./reducer/postReducer/postReducer.js"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer
    }
})