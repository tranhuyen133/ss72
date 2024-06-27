import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Post from "../../interface/interface";

interface PostState {
  post: Post[];
}

const initialState: PostState = {
  post: []
};

// Lấy tất cả dữ liệu
export const getPost:any = createAsyncThunk(
  "posts/getAllPost",
  async () => {
    const response = await axios.get("http://localhost:8080/posts");
    return response.data;
  }
);

// Thêm dữ liệu
export const addPost:any = createAsyncThunk(
  "posts/addPost",
  async (post: Post) => {
    const response = await axios.post("http://localhost:8080/posts", post);
    return response.data;
  }
);

// Xoá dữ liệu
export const deletePost:any = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/posts/${id}`);
    return id;
  }
);

const reducerPost = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.post.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.post = state.post.filter((item: any) => item.id !== action.payload);
      });
  },
});

export default reducerPost.reducer;
