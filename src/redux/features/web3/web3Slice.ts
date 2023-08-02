import { Wallet } from "@/near/wallet";
import { createSlice } from "@reduxjs/toolkit";

import { Web3Thunks } from "./web3Thunk";
import { Contract } from "@/near/contract";

type Web3State = {
  isSignedIn: boolean;
  wallet: Wallet | null;
  contract: Contract | null;
};

const initialState: Web3State = {
  isSignedIn: false,
  wallet: null,
  contract: null,
};

export const web3 = createSlice({
  name: "web3",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(Web3Thunks.initialize.fulfilled, (state, action) => {
      state.wallet = action.payload.wallet;
      state.contract = action.payload.contract;
      state.isSignedIn = action.payload.isSignedIn;
    });
  },
});

export const Web3Actions = web3.actions;
