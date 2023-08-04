"use client";
import { SubjectSelectors } from "@/redux/features/subject/subjectSelectors";
import { UserSelectors } from "@/redux/features/user/userSelectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userService } from "@/services/user";
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { UserMetadata } from "types/entities";
import Modal from "@/app/_components/common/Modal/Modal";
import { ModalAction } from "@/redux/features/modal/modalSlice";
import { ModalSelectors } from "@/redux/features/modal/modalSelectors";
export default function Page({ params }: { params: { subject_id: string } }) {
  const instructors = useAppSelector(UserSelectors.getInstructors());
  const { contract, isSignedIn, wallet } = useAppSelector((state) => state.web3);
  // const subject = useAppSelector(SubjectSelectors.getSubjectById(params.subject_id));
  const ref = useRef<HTMLInputElement>();
  const [studentInSubject, setStudentInSubject] = useState<[UserMetadata]>();
  const dispatch = useAppDispatch();
  const modal = useAppSelector(ModalSelectors.getModal());
  console.log(modal);

  const getStudentBySubjectId = useCallback(async () => {
    const result = await userService.getStudentBySubjectId(params.subject_id);
    setStudentInSubject(result);
  }, [params.subject_id]);

  useEffect(() => {
    getStudentBySubjectId();
  }, [getStudentBySubjectId]);
  const handleScore = (student: UserMetadata) => {
    dispatch(
      ModalAction.updateModal({
        isOpen: true,
        data: student,
      })
    );
  };
  const handleConfirmScore = async (user_id) => {
    // if (!isSignedIn) return wallet?.signIn();
    // if (contract)
    //   await contract.createScore(params.subject_id, user_id, +(ref?.current?.value || 0));
    await userService.createScore(params.subject_id, user_id, +(ref?.current?.value || 0));
  };
  // if (!subject) return <></>;
  if ((studentInSubject?.length || 0) == 0)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
        }}
      >
        <h1>Chưa có sinh viên nào đăng ký môn học này</h1>
      </Box>
    );

  return (
    <Box
      component="main"
      sx={{
        py: 4,
      }}
    >
      <Modal>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label="Tên sinh viên:"
              clickable
              sx={{ width: 120, minWidth: 120 }}
              color="success"
            />
            <div>{modal?.data?.full_name}</div>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label="Số điện thoại:"
              clickable
              sx={{ width: 120, minWidth: 120 }}
              color="warning"
            />
            <div>{modal?.data?.phone}</div>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            marginTop: 20,
          }}
        >
          <TextField
            required
            id="outlined-required"
            label="Điểm"
            type="text"
            InputProps={{ inputProps: { maxLength: 2 } }}
            placeholder="Điểm"
            sx={{ width: "50%" }}
            onKeyDown={(event) => {
              if (!/^[0-9]+$/.test(event.key) && event.key !== "Backspace") {
                event.preventDefault();
              }
            }}
            inputRef={ref}
          />
          <Button
            variant="contained"
            sx={{ marginTop: 3 }}
            color="info"
            onClick={() => {
              handleConfirmScore(modal?.data?.user_id);
              dispatch(
                ModalAction.updateModal({
                  isOpen: false,
                  data: {},
                })
              );
            }}
          >
            Xác nhận
          </Button>
        </Box>
      </Modal>
      <Container maxWidth={false}>
        {/* <Typography sx={{ fontSize: 30 }}>Môn học: {subject.title}</Typography> */}

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
                    <TableCell align="center">Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentInSubject?.map((student) => {
                    return (
                      <TableRow key={student.user_id} sx={{ overflow: "auto!important" }}>
                        <TableCell align="center">{student.full_name}</TableCell>
                        <TableCell align="center">{student.email}</TableCell>
                        <TableCell align="center">{student.phone}</TableCell>
                        <TableCell align="center">{student.date_of_birth}</TableCell>
                        <TableCell align="center" sx={{ overflow: "auto!important" }}>
                          <Button
                            variant="outlined"
                            color="success"
                            onClick={() => {
                              handleScore(student);
                            }}
                          >
                            Chấm điểm
                          </Button>
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
