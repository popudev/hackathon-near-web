"use client";

import { Web3Thunks } from "@/redux/features/web3/web3Thunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { wallet, contract } = useAppSelector((state) => state.web3);
  console.log("contract: ", contract);
  console.log("wallet: ", wallet);

  useEffect(() => {
    dispatch(Web3Thunks.initialize());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div style={{ marginBottom: "4rem", textAlign: "center" }}>
        <button onClick={() => wallet?.signIn()}>Login</button>
      </div>
    </main>
  );
}
