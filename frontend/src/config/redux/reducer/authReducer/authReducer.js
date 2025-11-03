import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUser,
  getUserAndProfile,
  loginUser,
  registerUser,
  userDetail,
  uploadProfilePicture,
  updateUserProfile,
  updateProfileData,
  sendConnectionRequest,
  getSentConnections,
  myConnections,
  acceptConnections,
} from "../../action/authAction/index.js";

const initialState = {
  myProfile: null,
  user: null,
  allUser: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: false,
  message: "",
  profileFetched: false,
  connections: [],
  connectionRequest: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => ({
      ...initialState,
      loggedIn: state.loggedIn,
    }),
    handleLoginUser: (state) => {
      state.message = "hello";
    },
    emptyMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Knocking the door...";
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.message = "Login is Successful";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Knocking the door...";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Register is Successful";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get User & Profile
      .addCase(getUserAndProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserAndProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.profileFetched = true;
        state.myProfile = action.payload;
      })
      .addCase(getUserAndProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // User Detail
      .addCase(userDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.profileFetched = true;
        state.user = action.payload;
      })
      .addCase(userDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get All Users
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allUser = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Upload Profile Picture
      .addCase(uploadProfilePicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = { ...state.user, profile_picture: action.payload.profile_picture };
        state.message = "Profile picture uploaded successfully";
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = { ...state.user, ...action.payload };
        state.message = "Profile updated successfully";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update Profile Data
      .addCase(updateProfileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = { ...state.user, ...action.payload };
        state.message = "Profile data updated successfully";
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Send Connection Request
      .addCase(sendConnectionRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendConnectionRequest.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Connection request sent";
      })
      .addCase(sendConnectionRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Sent Connections
      .addCase(getSentConnections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSentConnections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.connectionRequest = action.payload;
      })
      .addCase(getSentConnections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // My Connections
      .addCase(myConnections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myConnections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.connections = action.payload;
      })
      .addCase(myConnections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Accept Connections
      .addCase(acceptConnections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptConnections.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Connection request handled successfully";
      })
      .addCase(acceptConnections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, handleLoginUser, emptyMessage } = authSlice.actions;
export default authSlice.reducer;
