"use client";

import { Web3Thunks } from "@/redux/features/web3/web3Thunk";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect } from "react";
import { getToken } from "../actions/auth";
import { UserThunk } from "@/redux/features/user/userThunk";

export const Initialization: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Web3Thunks.initialize());
    const fetchTokenFromSSR = async () => {
      const token = await getToken();

      if (token) dispatch(UserThunk.getPayload(token));
    };
    fetchTokenFromSSR();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
