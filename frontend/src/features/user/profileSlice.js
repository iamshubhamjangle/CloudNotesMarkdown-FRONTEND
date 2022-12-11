import axios from "axios";
import { setUserInfo } from "./userSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  profileUpdateError: false,
  profileUpdateSuccess: false,
};

const backend_api = process.env.REACT_APP_BACKEND_API;
const updateProfileUrl = backend_api + "/api/users/profile";

export const updateProfile = createAsyncThunk(
  "user/profile",
  async ({ token, requestBody }, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        updateProfileUrl,
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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileUpdateError: (state, { payload }) => {
      state.profileUpdateError = payload;
    },
    resetState: (state) => {
      state.profileUpdateError = false;
      state.profileUpdateSuccess = false;
    },
  },
  extraReducers: {
    [updateProfile.pending]: (state) => {
      state.isLoading = true;
      state.profileUpdateSuccess = false;
    },
    [updateProfile.fulfilled]: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.profileUpdateError = "";
      state.profileUpdateSuccess = true;
      state.isLoading = false;
    },
    [updateProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.profileUpdateError = action.payload;
      state.profileUpdateSuccess = false;
    },
  },
});

export default profileSlice.reducer;
export const { setProfileUpdateError, resetState } = profileSlice.actions;
