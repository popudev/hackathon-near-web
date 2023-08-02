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

export function StudentSubjectItem() {
  return (
    <TableRow>
      {/* <TableCell align="left" sx={{ display: "none" }}>
          {user?.code}
        </TableCell> */}
      <TableCell align="center">Cấu trúc dữ liệu và giải thuật</TableCell>
      <TableCell align="center" sx={{}}>
        4
      </TableCell>
      <TableCell align="center">25</TableCell>
    </TableRow>
  );
}
