import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import authSlice from "../features/auth/authSlice";
import langSlice from "../features/language/langSlice";
import speechSynthesisSlice from "../features/language/speechSynthesisSlice";

export const store = configureStore({
    reducer: {
      auth: authSlice,
      lang: langSlice,
      speechSynthesis: speechSynthesisSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
          ignoredPaths: ['speechSynthesis.selectedVoice'],
          ignoredActions: ['speechSynthesis/setSelectedVoice'],
      },
  }),
  });