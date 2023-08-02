import { configureStore } from "@reduxjs/toolkit";
import { web3 } from "./features/web3/web3Slice";
import { major } from "./features/major/majorSlice";
import { user } from "./features/user/userSlice";
export const store = configureStore({
  reducer: {
    web3: web3.reducer,
    major: major.reducer,
    user: user.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
