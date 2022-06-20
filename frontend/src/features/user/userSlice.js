import { createSlice } from "@reduxjs/toolkit";

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: userInfoFromLocalStorage,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.userInfo = null;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { logout, setUserInfo } = userSlice.actions;
