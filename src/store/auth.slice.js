import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseAPI } from "../config";

export const refreshAuth = createAsyncThunk(
  "auth/refreshAuth",
  async (token, thunkAPI) => {
    const response = await fetch(`${baseAPI}/api/user/refresh-auth`, {
      headers: { authorization: `Bearer ${token}` },
    });


    if (response.status === 401) {
      return false;
    }

    const data = await response.json();
    return data;
  }
);

const initialState = {
  user: {},
  token: "",
  isLoggedIn: false,
  refreshingAuth: true,
  justLoggedOut: null,
};

const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    loginUser: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      localStorage.setItem("token", state.token);
      state.justLoggedOut = false;
    },
    logoutUser: (state) => {
      state.user = {};
      state.token = "";
      state.isLoggedIn = false;
      localStorage.clear();
      state.justLoggedOut = true;
    },
  },
  extraReducers: {
    [refreshAuth.pending]: (state) => {
      state.refreshingAuth = true;
    },
    [refreshAuth.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.refreshingAuth = false;
        state.token = payload.token;
        localStorage.setItem("token", state.token);
        state.user = payload.user;
        state.isLoggedIn = true;
      } else {
        state.refreshingAuth = false;
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
