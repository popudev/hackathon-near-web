"use client";

import { Web3Thunks } from "@/redux/features/web3/web3Thunk";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect } from "react";

export const InitializationWallet: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Web3Thunks.initialize());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
