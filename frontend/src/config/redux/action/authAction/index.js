import { createAsyncThunk } from "@reduxjs/toolkit";
import {client} from '@/config';


export const loginUser = createAsyncThunk(
    "user/login",
    async (user, thunkApi) =>{
        
        try {

            const response = await  client.post("/auth/login",{
                email: user.email,
                password: user.password
            })
            
            if (response.data.CryptoToken) {
                localStorage.setItem("token", response.data.CryptoToken)
            } else {
                return thunkApi.rejectWithValue({
                    message: "token not provided"
                })
            }

            return thunkApi.fulfillWithValue(response.data.CryptoToken);

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkApi.rejectWithValue(error.response.data.message);
            } else if (error.message) {
                // This covers network errors like backend down
                return thunkApi.rejectWithValue(error.message);
            } else {
                return thunkApi.rejectWithValue("Unknown error occurred");
            }
        }
    }
)

export const registerUser = createAsyncThunk(
    "user/register",
    async (user, thunkApi) =>{
        
        try {
            const request = await client.post("/auth/register", {
                username: user.username,
                email: user.email,
                password: user.password,
                name: user.name
            })
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return thunkApi.rejectWithValue(error.response.data.message);
            } else if (error.message) {
                // This covers network errors like backend down
                return thunkApi.rejectWithValue(error.message);
            } else {
                return thunkApi.rejectWithValue("Unknown error occurred");
            }
        }
    }
)

export const getUserAndProfile = createAsyncThunk(
    "user/getUserAndProfile",
    async (user ,thunkApi) => {
        try {
            const response = await client.get("/profile/get", {
                params: {
                    CryptoToken: user.token
                }
            });
            return thunkApi.fulfillWithValue(response.data);
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


export const getAllUser = createAsyncThunk(
    'post/getAllUser',
    async(_, thunkApi) =>{
        
        try {
            const response = await client.get('/profile/allUser');
            return thunkApi.fulfillWithValue(response.data);
        } catch (error) {
        return thunkApi.rejectWithValue(
            error?.response?.data?.message || error.message || "Unknown error occurred"
        );
    }
    }
) 