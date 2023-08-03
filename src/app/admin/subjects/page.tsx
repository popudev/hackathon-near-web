"use client";

import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Card, Container, Fab } from "@mui/material";
import { MajorForm } from "../../_components/MajorForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MajorSelectors } from "@/redux/features/major/majorSelectors";
import { MajorThunks } from "@/redux/features/major/majorThunk";
import { SubjectSelectors } from "@/redux/features/subject/subjectSelectors";
import { SubjectThunks } from "@/redux/features/subject/subjectThunk";
import { SubjectForm } from "../../_components/SubjectForm";
import { SelectedForm } from "../../_components/SelectedForm";
import { UserSelectors } from "@/redux/features/user/userSelectors";
import { UserThunk } from "@/redux/features/user/userThunk";
import AddIcon from "@mui/icons-material/Add";
import { utils } from "near-api-js";

export default function Subject() {
  const [visibleForm, setVisibleForm] = useState(false);
  const hideForm = () => setVisibleForm(false);
  const showForm = () => setVisibleForm(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(SubjectThunks.getSubjects());
    dispatch(MajorThunks.getMajors());
    dispatch(UserThunk.getInstructors());
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
    <Box
      component="main"
      sx={{
        py: 4,
      }}
    >
      <Container maxWidth={false}>
        <SelectedForm
          title="Chọn giảng viên giảng dạy"
          open={visibleAssign}
          items={instructors.map((u) => ({ key: u.user_id, value: u.full_name }))}
          onClose={hideAssign}
          onConfirm={handleAssginInstructor}
        />

        <SubjectForm open={visibleForm} onClose={hideForm} majors={majors} />
        <Fab
          size={"large"}
          color="primary"
          sx={{
            position: "absolute",
            padding: 4,
            bottom: (theme) => theme.spacing(5),
            right: (theme) => theme.spacing(5),
          }}
          onClick={() => showForm()}
        >
          <AddIcon sx={{ fontSize: 40 }} />
        </Fab>

        <Box>
          <Card sx={{ mt: 3, boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
            <Box sx={{ position: "relative" }}>
              <Table sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}>
                <TableHead>
                  <TableRow>
                    {/* <TableCell align="center">Hình ảnh</TableCell> */}
                    <TableCell align="center">Tên môn học</TableCell>
                    <TableCell align="center">Mô tả</TableCell>
                    <TableCell align="center">Môn tiên quyết</TableCell>
                    <TableCell align="center">Số tín chỉ</TableCell>
                    <TableCell align="center">Học phí</TableCell>
                    <TableCell align="center">Tổng số học sinh</TableCell>
                    <TableCell align="center">Giảng viên giảng dạy</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {subjects.map((row) => (
                    <TableRow
                      key={row.title}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {/* <TableCell align="center">{row.thumbnail}</TableCell> */}
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          width: 300,
                        }}
                      >
                        {row.description}
                      </TableCell>
                      <TableCell align="center">
                        {row.prerequisite_subject_id || "Không có"}
                      </TableCell>
                      <TableCell align="center">{row.number_of_credits || 0}</TableCell>
                      <TableCell align="center">{row.price || 0}</TableCell>
                      <TableCell align="center">{row.number_students_studying || 0}</TableCell>
                      <TableCell align="center">
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
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
