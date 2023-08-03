"use client";

import {
  Box,
  Button,
  Card,
  Grid,
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
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Web3Thunks } from "@/redux/features/web3/web3Thunk";
import { useRouter } from "next/navigation";
import { StudentItem } from "./StudentItem";
import { userService } from "@/services/user";
import { UserMetadata } from "types/entities";

export default function StudentList() {
  const [studentList, setStudentList] = useState<UserMetadata[]>([]);

  useEffect(() => {
    (async () => {
      const studentResult = await userService.getAllStudents();
      setStudentList(studentResult);
    })();
  }, []);

  return (
    <Box>
      <Card sx={{ mt: 3, boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
        <Box sx={{ position: "relative" }}>
          <Table sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Họ và tên</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Số điện thoại</TableCell>
                <TableCell align="center">Ngày sinh</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentList.map((student) => (
                <StudentItem key={student.user_id} data={student} />
              ))}
              {/* gegwsgegeg */}
              {/* <NewsManagementItem
            key={news.id}
            news={news}
            onDelete={handleRemoveNews}
            onDisable={handleDisableNews}
            onUpdateNewsClick={handleUpdateNewsClick}
          /> */}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
}
