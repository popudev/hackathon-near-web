"use client";

import { Web3Thunks } from "@/redux/features/web3/web3Thunk";
import { useAppDispatch } from "@/redux/hooks";
import React, { PropsWithChildren, useEffect } from "react";
import { getToken } from "../actions/auth";
import { UserThunk } from "@/redux/features/user/userThunk";
import { SubjectThunks } from "@/redux/features/subject/subjectThunk";
import { MajorThunks } from "@/redux/features/major/majorThunk";

export const Initialization: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Web3Thunks.initialize());
    dispatch(SubjectThunks.getSubjects());
    dispatch(MajorThunks.getMajors());
    dispatch(UserThunk.getInstructors());
    const fetchTokenFromSSR = async () => {
      const token = await getToken();

      if (token) dispatch(UserThunk.getPayload(token));
    };
    fetchTokenFromSSR();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
