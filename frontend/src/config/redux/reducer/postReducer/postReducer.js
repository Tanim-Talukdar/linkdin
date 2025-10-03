// postSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { comment, createComment, createPost, deleteComment, deletePost, getAllComment, getAllPosts, likeIncreaments } from "../../action/postAction";

const initialState = {
  posts: [],
  isError: false,
  postFected: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  comments: "",
  postId: ""
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: () => initialState,
    resetPostId: (state) => {
      state.postId = "";
    },
    resetSuccess: (state) => {
      state.isSuccess = "";
    }
  },
  extraReducers: (builder) => {
    builder
      // ========== GET ALL POSTS ==========
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching posts...";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.postFected = true;
        state.message = "Posts fetched successfully";
        state.posts = action.payload.posts;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ========== LIKE INCREMENT (Frontend-only Optimistic Update) ==========
      .addCase(likeIncreaments.pending, (state, action) => {
        state.isLoading = true;
        const postId = action.meta.arg; 
        const index = state.posts.findIndex((p) => p._id === postId);
        if (index !== -1) {
          state.posts[index].likes = (state.posts[index].likes || 0) + 1; // UI instant increment
        }
      })
      .addCase(likeIncreaments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload || "Like action completed";
      })
      .addCase(likeIncreaments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;

        // Rollback if API fails
        const postId = action.meta.arg;
        const index = state.posts.findIndex((p) => p._id === postId);
        if (index !== -1) {
          state.posts[index].likes = Math.max((state.posts[index].likes || 1) - 1, 0);
        }
      })

          // ========== get post comment ==========
      .addCase(getAllComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.comments = action.payload.comments;
        state.message = "Comment added Successfully";
      })
      .addCase(getAllComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


      
    // ========== Create Post ==========
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "Posted Successfully";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
          // ========== Create comment ==========
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.comments.push(action.payload.comment);    
        console.log(action.payload.comment);
        state.message = action.payload.message;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    // ========== Delete Comment ==========
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
.addCase(deleteComment.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.message = "Comment deleted Successfully";

  // action.meta.arg.comment_id contains the deleted comment ID
  const deletedId = action.meta.arg.comment_id;
  state.comments = state.comments.filter(c => c._id !== deletedId);
})
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // ========== delete post ==========
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "Post Deleted Successfully";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  }
});

export const { reset, resetPostId,resetSuccess } = postSlice.actions;
export default postSlice.reducer;
