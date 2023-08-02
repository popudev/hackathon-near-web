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
import { SubjectForm } from "../_components/subjectForm";

export default function Subject() {
  const [visibleForm, setVisibleForm] = useState(false);
  const hideForm = () => setVisibleForm(false);
  const showForm = () => setVisibleForm(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(SubjectThunks.getSubjects());
    dispatch(MajorThunks.getMajors());
  }, [dispatch]);

  const subjects = useAppSelector(SubjectSelectos.getSubjects());
  const majors = useAppSelector(MajorSelectos.getMajors());

  return (
    <TableContainer component={Paper}>
      {<SubjectForm open={visibleForm} onClose={hideForm} majors={majors} />}
      <Button onClick={showForm}>Thêm môn học</Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Tên môn học</TableCell>
            <TableCell align="center">Ảnh mô tả</TableCell>
            <TableCell align="left">Mô tả</TableCell>
            <TableCell align="center">Mã môn tiên quyết</TableCell>
            <TableCell align="center">Số tín chỉ</TableCell>
            <TableCell align="right">Tổng số học sinh</TableCell>
            <TableCell align="right">Giảng viên giảng dạy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="center">{row.thumbnail}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="center">{row.prerequisite_subject_id}</TableCell>
              <TableCell align="center">{row.number_of_credits}</TableCell>
              <TableCell align="right">{row.number_students_studying}</TableCell>
              <TableCell align="right">
                {row.instructor_id !== null ? row.instructor_id : <Button>Phân công</Button>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
