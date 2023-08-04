import { configureStore } from "@reduxjs/toolkit";
import { web3 } from "./features/web3/web3Slice";
import { major } from "./features/major/majorSlice";
import { subject } from "./features/subject/subjectSlice";
import { score } from "./features/score/scoreSlice";
import { user } from "./features/user/userSlice";
import { modal } from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    web3: web3.reducer,
    major: major.reducer,
    subject: subject.reducer,
    score: score.reducer,
    user: user.reducer,
    modal: modal.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
