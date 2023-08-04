import { createSelector } from "@reduxjs/toolkit";
import { ModalState } from "./modalSlice";

interface PartialModalState {
  modal: ModalState;
}

const modalStateSelector = (state: PartialModalState) => state.modal;

export const ModalSelectors = {
  getModal: () => createSelector(modalStateSelector, (modal) => modal),
};
