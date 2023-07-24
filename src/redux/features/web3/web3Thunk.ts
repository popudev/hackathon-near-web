import { Contract } from "@/near/contract";
import { Wallet } from "@/near/wallet";
import { createAsyncThunk } from "@reduxjs/toolkit";

const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID || "";

export const Web3Thunks = {
  initialize: createAsyncThunk<any, void>("web3/initialize", async () => {
    const wallet = new Wallet(CONTRACT_ID);
    console.log("CONTRACT_ID: ", CONTRACT_ID);
    const contract = new Contract(CONTRACT_ID, wallet);
    const isSignedIn = await wallet.startUp();
    return {
      wallet,
      contract,
      isSignedIn,
    };
  }),
};
