import { createAsyncThunk } from "@reduxjs/toolkit";
import {clientServer} from '@/config';


export const loginUser = createAsyncThunk(
    "user/login",
    async (user, thunkApi) =>{
        try {

            const response = await  clientServer.post("/login",{
                email: user.email,
                password: user.password
            })

            if (response.data.token) {
                localStorage.setItem("token", response.data.token)
            } else {
                return thunkApi.rejectWithValue({
                    message: "token not provided"
                })
            }

            return thunkApi.fulfillWithValue(response.data.token);

        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
)