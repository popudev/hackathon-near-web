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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MajorSelectors } from "@/redux/features/major/majorSelectors";
import { MajorThunks } from "@/redux/features/major/majorThunk";
import { SubjectSelectors } from "@/redux/features/subject/subjectSelectors";
import { SubjectThunks } from "@/redux/features/subject/subjectThunk";
import { SubjectForm } from "../_components/subjectForm";
import { SelectedForm } from "../_components/SelectedForm";
import { UserSelectors } from "@/redux/features/user/userSelectors";
import { UserThunks } from "@/redux/features/user/userThunk";

export default function Subject() {
  const [visibleForm, setVisibleForm] = useState(false);
  const hideForm = () => setVisibleForm(false);
  const showForm = () => setVisibleForm(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(SubjectThunks.getSubjects());
    dispatch(MajorThunks.getMajors());
    dispatch(UserThunks.getInstructors());
  }, [dispatch]);

  const subjects = useAppSelector(SubjectSelectors.getSubjects());
  const majors = useAppSelector(MajorSelectors.getMajors());
  const instructors = useAppSelector(UserSelectors.getInstructors());

  const [visibleAssign, setVisibleAssign] = useState(false);
  const hideAssign = () => setVisibleAssign(false);
  const showAssign = (subject_id: string) => {
    setSubjectAssignId(subject_id);
    setVisibleAssign(true);
  };
  const handleAssginInstructor = (id: string) => {
    const subject_id = subjectAssignId;
    const instructor_id = id;
    // them instructor vao` mon hoc
  };

  const [subjectAssignId, setSubjectAssignId] = useState("");

  return (
    <TableContainer component={Paper}>
      {visibleAssign && (
        <SelectedForm
          title="Chọn giảng viên giảng dạy"
          open={visibleAssign}
          items={instructors.map((u) => ({ key: u.user_id, value: u.full_name }))}
          onClose={hideAssign}
          onConfirm={handleAssginInstructor}
        />
      )}
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
                {row.instructor_id !== null ? (
                  row.instructor_id
                ) : (
                  <Button onClick={() => showAssign(row.subject_id)}>Phân công</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
