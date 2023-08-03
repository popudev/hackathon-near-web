"use client";

import {
  AppBar,
  Box,
  Button,
  Card,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useFormik } from "formik";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React, { useEffect, useState } from "react";
// import { IconSettings } from "@tabler/icons";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Web3Thunks } from "@/redux/features/web3/web3Thunk";
import { useRouter } from "next/navigation";
import { RoleType } from "@/services/major/types";

export function Header({ role, isLogin = true }) {
  if (!isLogin)
    return (
      <Box sx={{}}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SuperSchool
            </Typography>
            <Button href={"/login"} color="inherit">
              Đăng nhập
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );

  switch (role) {
    case RoleType.ADMIN:
      return (
        <Box sx={{}}>
          <AppBar
            position="static"
            sx={{
              backgroundColor: "rgba(0,0,0,0.8)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 25px",
              }}
            >
              <Typography variant="h6" component="div" sx={{}}>
                SuperSchool
              </Typography>
              <Toolbar>
                <Button sx={{ margin: "0 5px" }} href={"/create-major"} color="inherit">
                  Tạo ngành học
                </Button>
                <Button sx={{ margin: "0 5px" }} href={"/create-subject"} color="inherit">
                  Tạo môn học
                </Button>
                <Button sx={{ margin: "0 5px" }} href={"/admin/students"} color="inherit">
                  Quản lý sinh viên
                </Button>
                <Button sx={{ margin: "0 5px" }} href={"/instructors"} color="inherit">
                  Quản lý giảng viên
                </Button>
              </Toolbar>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ marginRight: "10px" }}>Avatar</Box>
                <Button startIcon={<AccountBalanceWalletIcon />} color="inherit">
                  Wallet
                </Button>
              </Box>
            </Box>
          </AppBar>
        </Box>
      );
    case RoleType.STUDENT:
      return (
        <Box sx={{}}>
          <AppBar
            position="static"
            sx={{
              backgroundColor: "rgba(0,0,0,0.8)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 25px",
              }}
            >
              <Typography variant="h6" component="div" sx={{}}>
                SuperSchool
              </Typography>
              <Toolbar>
                <Button sx={{ margin: "0 5px" }} href={"subject-register"} color="inherit">
                  Đăng ký môn học
                </Button>
                <Button sx={{ margin: "0 5px" }} href={"subjects"} color="inherit">
                  Danh sách môn học
                </Button>
                <Button sx={{ margin: "0 5px" }} href={"score"} color="inherit">
                  Điểm số
                </Button>
                <Button sx={{ margin: "0 5px" }} href={"/instructors"} color="inherit">
                  Bằng cấp / Chứng chỉ
                </Button>
              </Toolbar>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ marginRight: "10px" }}>Avatar</Box>
                <Button startIcon={<AccountBalanceWalletIcon />} color="inherit">
                  Wallet
                </Button>
              </Box>
            </Box>
          </AppBar>
        </Box>
      );
    case RoleType.INSTRUCTOR:
      return (
        <Box sx={{}}>
          <AppBar
            position="static"
            sx={{
              backgroundColor: "rgba(0,0,0,0.8)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 25px",
              }}
            >
              <Typography variant="h6" component="div" sx={{}}>
                SuperSchool
              </Typography>
              <Toolbar>
                <Button sx={{ margin: "0 5px" }} href={"/create-major"} color="inherit">
                  Tạo ngành học
                </Button>
                <Button sx={{ margin: "0 5px" }} href={"/create-subject"} color="inherit">
                  Tạo môn học
                </Button>
                <Button sx={{ margin: "0 5px" }} href={"/students"} color="inherit">
                  Quản lý sinh viên
                </Button>
                <Button sx={{ margin: "0 5px" }} href={"/instructors"} color="inherit">
                  Quản lý giảng viên
                </Button>
              </Toolbar>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ marginRight: "10px" }}>Avatar</Box>
                <Button startIcon={<AccountBalanceWalletIcon />} color="inherit">
                  Wallet
                </Button>
              </Box>
            </Box>
          </AppBar>
        </Box>
      );
  }
  return (
    <Toolbar>
      <Button href={"/create-major"} color="inherit">
        Tạo ngành học
      </Button>
      <Button href={"/create-subject"} color="inherit">
        Tạo môn học
      </Button>
      <Button href={"/students"} color="inherit">
        Quản lý sinh viên
      </Button>
      <Button href={"/instructors"} color="inherit">
        Quản lý giảng viên
      </Button>
    </Toolbar>
  );
}
