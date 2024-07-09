import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import langSlice from "../features/language/langSlice";

export const store = configureStore({
    reducer: {
      auth: authSlice,
      lang: langSlice
    },
  });