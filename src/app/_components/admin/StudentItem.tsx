"use client";

import {
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
  Typography,
} from "@mui/material";
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

// interface UserItemProps {
//     student: User;
//     selected: boolean;
//     onCheck: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
//     onIssue: (u: User) => void;
//     onEdit: (u: User) => void;
//     onDelete: (userId: String) => void;
//   }

export function StudentItem() {
  return (
    <TableRow>
      {/* <TableCell align="left" sx={{ display: "none" }}>
          {user?.code}
        </TableCell> */}
      <TableCell align="center">Lương Chi Thịnh</TableCell>
      <TableCell align="center" sx={{}}>
        luongchithinh123@gmail.com
      </TableCell>
      <TableCell align="center">0909075304</TableCell>
      <TableCell align="center">01/05/2002</TableCell>
      <TableCell align="center">
        <PopupState variant="popover" popupId="popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button
                variant="contained"
                {...bindTrigger(popupState)}
                // startIcon={<IconSettings />}
                // endIcon={<ExpandMore />}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 10px",
                  minWidth: "0",
                  bgcolor: "#EBEBEB",
                  ":hover": {
                    bgcolor: "#EBEBEB",
                  },
                  color: "black",
                }}
              >
                {/* <IconSettings /> */}
                <SettingsIcon />
              </Button>
              <Menu
                {...bindMenu(popupState)}
                sx={{ marginTop: "10px" }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <MenuItem
                  onClick={() => {}}
                  sx={{ alignItems: "center", justifyContent: "center", minWidth: 170 }}
                >
                  Cập nhật
                </MenuItem>
                <MenuItem
                  onClick={() => {}}
                  sx={{ alignItems: "center", justifyContent: "center", minWidth: 170 }}
                >
                  Xóa
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </TableCell>
    </TableRow>
  );
}
