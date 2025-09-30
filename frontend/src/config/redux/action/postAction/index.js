import { client } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const getAllPosts = createAsyncThunk(
    'post/getAllPosts',
    async(_, thunkApi) =>{
        
        try {
            const posts = await client.get('/posts');
            return thunkApi.fulfillWithValue(posts.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkApi.rejectWithValue(error.response.data.message);
            } else if (error.message) {
                return thunkApi.rejectWithValue(error.message);
            } else {
                return thunkApi.rejectWithValue("Unknown error occurred");
            }
        }
    }
) 