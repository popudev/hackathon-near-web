"use client";
import { MajorSelectors } from "@/redux/features/major/majorSelectors";
import { MajorThunks } from "@/redux/features/major/majorThunk";
import { SubjectSelectors } from "@/redux/features/subject/subjectSelectors";
import { SubjectThunks } from "@/redux/features/subject/subjectThunk";
import { UserSelectors } from "@/redux/features/user/userSelectors";
import { UserThunks } from "@/redux/features/user/userThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DegreeTemplate } from "./_component/DegreeTemplate";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const user = useAppSelector(UserSelectors.getUser());
  const majors = useAppSelector(MajorSelectors.getMajors());
  const major = majors.find((m) => m.major_id === user?.major_id);
  const { wallet, isSignedIn, contract } = useAppSelector((state) => state.web3);
  const [degree, setDegree] = useState<any>(null);
  const searchParams = useSearchParams();
  const transactionHashes = searchParams.get("transactionHashes");

  useEffect(() => {
    if (transactionHashes) setDegree(true);
  }, [transactionHashes]);

  const handleRegisterSubject = async () => {
    if (!isSignedIn) return wallet?.signIn();

    await contract?.receiveDegree();
  };

  useEffect(() => {
    (async () => {
      if (!isSignedIn) return wallet?.signIn();
      const result = await contract?.getDegree();
      console.log("result: ", result);
      setDegree(result);
    })();
  }, [contract, isSignedIn]);

  if (!user) return <></>;

  const isEnable = user.total_credit >= (major?.number_of_credits_required || 0);
  return degree ? (
    <DegreeTemplate degree={degree} />
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: 60,
          fontWeight: "bold",
          mb: 2,
        }}
      >
        {user.total_credit}/{major?.number_of_credits_required}
      </Typography>

      <Button
        onClick={() => handleRegisterSubject()}
        sx={{
          fontSize: 20,
        }}
        disabled={!isEnable}
      >
        NHẬN BẰNG CẤP
      </Button>
    </Box>
  );
}
