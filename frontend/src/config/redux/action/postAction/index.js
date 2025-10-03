import { client } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const getAllPosts = createAsyncThunk(
    'post/getAllPosts',
    async(_, thunkApi) =>{
        
        try {
            const posts = await client.get('/posts');
            return thunkApi.fulfillWithValue(posts.data);
        } catch (error) {
        return thunkApi.rejectWithValue(
            error?.response?.data?.message || error.message || "Unknown error occurred"
        );
    }
    }
) 

export const getAllComment = createAsyncThunk(
    'post/getAllComment',
    async(post_id,thunkApi) =>{
        try {
            const allComments = await client.get('/all_comment' ,{
                params: {post_id},
            });
            return thunkApi.fulfillWithValue(allComments.data);
        } catch (error) {
            return thunkApi.rejectWithValue(
                error?.response?.data?.message || error.message || "Unknown error occurred"
            );
        }
    }
)


export const likeIncreaments = createAsyncThunk(
    'post/likeIncreaments',
    async(post_id, thunkApi) =>{
        try {
            const Likeincrement = await client.post('/increament_post_like' ,{
                post_id
            });
            return thunkApi.fulfillWithValue(Likeincrement.data.message);
        } catch (error) {
            return thunkApi.rejectWithValue(
                error?.response?.data?.message || error.message || "Unknown error occurred"
            );
        }
    }
)

export const createComment = createAsyncThunk(
    'createComment',
    async({post_id, CryptoToken , commentBody },thunkApi) =>{
        try {
            const createComment = await client.post('/comment' ,{
                post_id,
                CryptoToken, 
                commentBody 
            });
            
            return thunkApi.fulfillWithValue(createComment.data);
        } catch (error) {
            return thunkApi.rejectWithValue(
                error?.response?.data?.message || error.message || "Unknown error occurred"
            );
        }
    }
)

export const deleteComment = createAsyncThunk(
  'post/deleteComment',
  async ({ post_id, CryptoToken, comment_id }, thunkApi) => {
    try {
      const response = await client.delete('/delete_comment', {
        data: { post_id, CryptoToken, comment_id } // for axios DELETE with body
      });
      return thunkApi.fulfillWithValue(response.data.message);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error?.response?.data?.message || error.message || "Unknown error occurred"
      );
    }
  }
);

// createPost async thunk
export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ CryptoToken, body, file }, thunkApi) => {
    try {
      const formData = new FormData();
      formData.append("CryptoToken", CryptoToken);
      formData.append("body", body);
      if (file) {
        formData.append("media", file); // multer field name must match backend
      }

      const { data } = await client.post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return thunkApi.fulfillWithValue(data.post);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error?.response?.data?.message || error.message || "Unknown error occurred"
      );
    }
  }
);


export const deletePost = createAsyncThunk(
  'post/deletePost',
  async ({ post_id, CryptoToken }, thunkApi) => {
    try {
      const response = await client.delete('/delete_post', {
        data: { post_id, CryptoToken } 
      });
      return thunkApi.fulfillWithValue(response.data.message);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error?.response?.data?.message || error.message || "Unknown error occurred"
      );
    }
  }
);