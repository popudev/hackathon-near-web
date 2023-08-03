"use client";
import {
  Box,
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { Menu, MenuItem } from "@mui/material";

import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

import SettingsIcon from "@mui/icons-material/Settings";
import React, { useEffect } from "react";
import { SubjectThunks } from "@/redux/features/subject/subjectThunk";
import { MajorThunks } from "@/redux/features/major/majorThunk";
import { UserThunk } from "@/redux/features/user/userThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SubjectSelectors } from "@/redux/features/subject/subjectSelectors";
import { MajorSelectors } from "@/redux/features/major/majorSelectors";
import { UserSelectors } from "@/redux/features/user/userSelectors";

export default function Student() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UserThunk.getInstructors());
  }, []);

  const instructors = useAppSelector(UserSelectors.getInstructors());

  return (
    <Box
      component="main"
      sx={{
        py: 4,
      }}
    >
      <Container maxWidth={false}>
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
                    <TableCell align="center">CMND/CCCD</TableCell>
                    <TableCell align="center">Tài khoản</TableCell>
                    <TableCell align="center">Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {instructors.map((instructor) => {
                    return (
                      <TableRow key={instructor.user_id}>
                        <TableCell align="center">{instructor.full_name}</TableCell>
                        <TableCell align="center">{instructor.email}</TableCell>
                        <TableCell align="center">{instructor.phone}</TableCell>
                        <TableCell align="center">{instructor.date_of_birth}</TableCell>
                        <TableCell align="center">
                          {instructor.national_identity_card}
                        </TableCell>
                        <TableCell align="center">
                          {instructor.username || "Chưa có"}
                        </TableCell>
                        <TableCell align="center">
                          {instructor.active ? (
                            <Button disabled>Đã duyệt</Button>
                          ) : (
                            <Button>Duyệt</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
