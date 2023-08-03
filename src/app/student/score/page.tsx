"use client";

import {
  Box,
  Button,
  Card,
  Container,
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
import { StudentSubjectItem } from "@/app/_components/student/StudentSubjectItem";
import { StudentScoreItem } from "@/app/_components/student/StudentScoreItem";

export default function ScoreList() {
  const scores = useAppSelector((state) => state.score.scores);

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
                    <TableCell align="center">Môn học</TableCell>
                    <TableCell align="center">Giảng viên</TableCell>
                    <TableCell align="center">Điểm</TableCell>
                    <TableCell align="center">Kết quả</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.map((score) => {
                    return <StudentScoreItem key={score.score_id} data={score} />;
                  })}
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
      </Container>
    </Box>
  );
}
