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
import { useEffect } from "react";

export default function Page() {
  const user = useAppSelector(UserSelectors.getUser());
  const majors = useAppSelector(MajorSelectors.getMajors());
  const major = majors.find((m) => m.major_id === user?.major_id);

  if (!user) return <></>;
  return <Box></Box>;
}
