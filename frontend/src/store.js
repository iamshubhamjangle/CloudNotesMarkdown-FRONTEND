import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import loginReducer from "./features/user/loginSlice";
import registerReducer from "./features/user/registerSlice";
import notesReducer from "./features/notes/noteSlice";
import profileReducer from "./features/user/profileSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    register: registerReducer,
    notes: notesReducer,
    profile: profileReducer,
  },
});
