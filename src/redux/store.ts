import { configureStore } from "@reduxjs/toolkit";
import { web3 } from "./features/web3/web3Slice";
import { major } from "./features/major/majorSlice";
import { subject } from "./features/subject/subjectSlice";

export const store = configureStore({
  reducer: {
    web3: web3.reducer,
    major: major.reducer,
    subject: subject.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
