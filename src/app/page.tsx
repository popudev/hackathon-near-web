"use client";

import { Web3Thunks } from "@/redux/features/web3/web3Thunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { wallet, contract } = useAppSelector((state) => state.web3);
  console.log("contract: ", contract);
  console.log("wallet: ", wallet);

  useEffect(() => {
    dispatch(Web3Thunks.initialize());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    router.push("/register");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Super School
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: "400",
            textAlign: "center",
          }}
        >
          Chào mừng bạn đến với ngôi trường của chúng tôi
        </Typography>
      </Box>

      <Button
        variant="outlined"
        sx={{
          mt: 4,
          fontSize: 25,
        }}
        onClick={handleClick}
      >
        Đăng ký nhập học
      </Button>
    </Box>
  );
}
