import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setUserInfo } from "./userSlice";

const initialState = {
  registrationError: "",
  isLoading: false,
};

const backend_api = process.env.REACT_APP_BACKEND_API;
const registrationUrl = backend_api + "/api/users/register";

/**
 * @param requestBody
 * @returns void
 * @description call this function to register a user
 */
export const register = createAsyncThunk(
  "user/register",
  async (requestBody, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        registrationUrl,
        { ...requestBody },
        config
      );

      thunkAPI.dispatch(setUserInfo(data));
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegistrationError: (state, { payload }) => {
      state.registrationError = payload;
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.registrationError = "";
      state.isLoading = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.registrationError = action.payload;
    },
  },
});

export default registerSlice.reducer;
export const { setRegistrationError } = registerSlice.actions;
