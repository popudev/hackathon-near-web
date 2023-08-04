"use client";

import { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Backdrop, Box, Button, Card, CircularProgress, Container, Fab } from "@mui/material";
import { MajorForm } from "../../_components/MajorForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MajorSelectors } from "@/redux/features/major/majorSelectors";
import { MajorThunks } from "@/redux/features/major/majorThunk";
import { SubjectSelectors } from "@/redux/features/subject/subjectSelectors";
import { SubjectThunks } from "@/redux/features/subject/subjectThunk";
import { SubjectForm } from "../../_components/SubjectForm";
import { SelectedForm } from "../../_components/SelectedForm";
import { UserSelectors } from "@/redux/features/user/userSelectors";
import { UserThunks } from "@/redux/features/user/userThunk";
import AddIcon from "@mui/icons-material/Add";
import { utils } from "near-api-js";
import { Subject } from "@/services/subject/type";
import { AlertDialogSlide } from "@/app/_components/AlertDialogSlide";
import { SubjectActions } from "@/redux/features/subject/subjectSlice";
import { UserActions } from "@/redux/features/user/userSlice";
import { UserService } from "@/services/user";

export default function Subject() {
  const [visibleForm, setVisibleForm] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const hideForm = () => setVisibleForm(false);
  const showForm = () => setVisibleForm(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const subjects = useAppSelector(SubjectSelectors.getSubjects());
  const majors = useAppSelector(MajorSelectors.getMajors());
  const instructors = useAppSelector(UserSelectors.getInstructorsActive());

  useEffect(() => {
    setSubjectList(subjects);
  }, [subjects]);

  const [visibleAssign, setVisibleAssign] = useState(false);
  const hideAssign = () => setVisibleAssign(false);
  const showAssign = () => setVisibleAssign(true);

  const [subject, setSubject] = useState<{ subject_id?: string; price: number }>();

  const [title, setTitle] = useState("");

  const handleAssginInstructor = useCallback(
    (instructor_id: string) => {
      if (!subject) return;
      if (!subject.subject_id) return;
      const { subject_id, price } = subject;
      setOpen(true);
      dispatch(UserThunks.assignSubject({ instructor_id, subject_id, price })).then(() => {
        setOpen(false);
        hideAssign();
        setOpenDialog(true);
        setTitle("Bạn đã phân công giảng dạy cho giảng viên thành công");
      });
    },
    [subject]
  );

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
          onConfirm={(id) => handleAssginInstructor(id)}
        />

        <SubjectForm
          open={visibleForm}
          onClose={hideForm}
          majors={majors}
          setLoading={setOpenLoading}
        />
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
                    <TableCell align="center">Học phí (NEAR)</TableCell>
                    <TableCell align="center">Tổng số học sinh</TableCell>
                    <TableCell align="center">Giảng viên giảng dạy</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {subjectList.map((row, index) => (
                    <TableRow
                      key={row.title + index}
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
                          <Button
                            onClick={() => {
                              showAssign();
                              setSubject({ subject_id: row.subject_id, price: row.price });
                            }}
                          >
                            Phân công
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Card>
        </Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <AlertDialogSlide
          open={openDialog}
          title={title}
          desrciption=""
          onClose={() => setOpenDialog(false)}
        />
      </Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
        open={openLoading}
      >
        <CircularProgress color="inherit" size={60} />
      </Backdrop>
    </Box>
  );
}
