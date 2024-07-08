import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "../slices/bookSlice";

export const store = configureStore({
  reducer: {
    book: bookSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
