import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./slices/audioSlice";
import authReducer from "./slices/authSlice";
import { apiService } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    audio: audioReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(apiService.middleware),
});
