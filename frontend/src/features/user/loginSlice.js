import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setUserInfo } from "./userSlice";

const backend_api = process.env.REACT_APP_BACKEND_API;
const loginUrl = backend_api + "/api/users/login";

const initialState = {
  isLoading: false,
  loginError: "",
};

/**
 * @param obj.email
 * @param obj.password
 * @description Function performs login request, returns a promise
 */
export const login = createAsyncThunk("user/login", async (obj, thunkAPI) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(loginUrl, { ...obj }, config);
    thunkAPI.dispatch(setUserInfo(data));
    return data;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetErrors: (state) => {
      state.isLoading = false;
      state.loginError = "";
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
      state.loginError = "";
    },
    [login.fulfilled]: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.isLoading = false;
      state.loginError = "";
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.loginError = action.payload;
    },
  },
});

export default loginSlice.reducer;
export const { resetErrors } = loginSlice.actions;
