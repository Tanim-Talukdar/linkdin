import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts}  from "../../action/postAction"



const initialState = {
    posts: [],
    isError: false,
    postFected: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    comments: "",
    postId: ""
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        reset: () => initialState,
        resetPostId: (state) => {
            state.postId = "";
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllPosts.pending, (state) => {
            state.isLoading = true;
            state.message = "comming Soon";
        })
        .addCase(getAllPosts.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isError = false;
            state.postFected = true;
            state.message = "fetchDone";
            state.posts = action.payload.posts;
        })
        .addCase(getAllPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export const {reset,  resetPostId} = postSlice.actions;
export default postSlice.reducer;