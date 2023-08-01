"use client";

import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { MajorForm } from "../_components/majorForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MajorSelectos } from "@/redux/features/major/majorSelectors";
import { MajorThunks } from "@/redux/features/major/majorThunk";
import { SubjectSelectos } from "@/redux/features/subject/subjectSelectors";
import { SubjectThunks } from "@/redux/features/subject/subjectThunk";

export default function Subject() {
  const [visibleForm, setVisibleForm] = useState(false);
  const hideForm = () => setVisibleForm(false);
  const showForm = () => setVisibleForm(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(SubjectThunks.getSubjects());
  }, [dispatch]);

  const subjects = useAppSelector(SubjectSelectos.getSubjects());

  return (
    <TableContainer component={Paper}>
      {<MajorForm open={visibleForm} onClose={hideForm} />}
      <Button onClick={showForm}>Thêm môn học</Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Tên môn học</TableCell>
            <TableCell align="center">Ảnh mô tả</TableCell>
            <TableCell align="left">Mô tả</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="left">{row.thumbnail}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
