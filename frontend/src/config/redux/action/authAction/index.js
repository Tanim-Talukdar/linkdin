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
    'user/getAllUser',
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

export const userDetail = createAsyncThunk(
    "user/userDetail",
    async (username ,thunkApi) => {
        try {
            const response = await client.get("/profile/userDetail", {
                params: {
                    username
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

/*  Upload Profile Picture */
export const uploadProfilePicture = createAsyncThunk(
  "user/uploadProfilePicture",
  async ({ CryptoToken, file }, thunkApi) => {
    try {
      const formData = new FormData();
      formData.append("CryptoToken", CryptoToken);
      formData.append("Profile_picture", file);

      const response = await client.post("/profile/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to upload profile picture"
      );
    }
  }
);

/*  Update User Profile (Basic Info) */
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (data, thunkApi) => {
    try {
      const response = await client.post("/profile/update", data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);


/* Update Profile Data (Profile Model) */
export const updateProfileData = createAsyncThunk(
  "user/updateProfileData",
  async (data, thunkApi) => {
    try {
      const response = await client.post("/profile/update_data", data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to update profile data"
      );
    }
  }
);

/* Send Connection Request */
export const sendConnectionRequest = createAsyncThunk(
  "user/sendConnectionRequest",
  async ({ CryptoToken, connectionId }, thunkApi) => {
    try {
      const response = await client.post("/connection/send", {
        CryptoToken,
        connectionId,
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to send connection request"
      );
    }
  }
);

/*  Get Sent Connection Requests */
export const getSentConnections = createAsyncThunk(
  "user/getSentConnections",
  async (CryptoToken, thunkApi) => {
    try {
      const response = await client.get(`/connection/sent/${CryptoToken}`);
      console.log(response.data);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch sent connections"
      );
    }
  }
);

/* Get My Connections */
export const myConnections = createAsyncThunk(
  "user/myConnections",
  async (CryptoToken, thunkApi) => {
    try {
      const response = await client.get(`/connection/my/${CryptoToken}`);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch connections"
      );
    }
  }
);

/*  Accept or Reject Connection Request */
export const acceptConnections = createAsyncThunk(
  "user/acceptConnections",
  async ({ CryptoToken, requestId, action_type }, thunkApi) => {
    try {
      const response = await client.post("/connection/accept", {
        CryptoToken,
        requestId,
        action_type,
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to handle connection request"
      );
    }
  }
);
