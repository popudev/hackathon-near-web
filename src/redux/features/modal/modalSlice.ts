import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalState = {
  isOpen: boolean;
  data?: Record<any, any>;
};

const initialState: ModalState = {
  isOpen: false,
  data: {},
};

export const modal = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    updateModal(state, action: PayloadAction<ModalState>) {
      const { data, isOpen } = action.payload;
      state.isOpen = isOpen;
      state.data = { ...data };
    },
  },
});

export const ModalAction = modal.actions;
