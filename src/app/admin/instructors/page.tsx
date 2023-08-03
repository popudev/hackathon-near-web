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
  Grid,
  Modal,
  Paper,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import { useAppSelector } from "@/redux/hooks";
import { UserSelectors } from "@/redux/features/user/userSelectors";
import { useState } from "react";
import { useFormik } from "formik";
import { userService } from "@/services/user";
import { AlertDialogSlide } from "@/app/_components/AlertDialogSlide";

export default function Student() {
  const instructors = useAppSelector(UserSelectors.getInstructors());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      user_id: "",
      username: "",
      password: "",
    },
    onSubmit: async (value) => {
      const { user_id, username, password } = value;
      setOpen(false);
      setLoading(true);
      await userService.activeInstructor(user_id, username, password);
      setLoading(false);
      setOpenDialog(true);
    },
  });
  const handleConfirm = () => {
    formik.submitForm();
  };
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
                            <Button
                              onClick={() => {
                                formik.setFieldValue("user_id", instructor.user_id);
                                setOpen(true);
                              }}
                            >
                              Duyệt
                            </Button>
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AlertDialogSlide
        open={openDialog}
        title={"Đã kích hoạt thành công"}
        desrciption=""
        onClose={() => setOpenDialog(false)}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            padding: 4,
            width: 550,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: 30,
                fontWeight: "500",
                textAlign: "center",
                mb: 4,
              }}
            >
              Cung cấp tài khoản cho giảng viên
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                width: 400,
              }}
            >
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tài khoản"
                  name="username"
                  onChange={(e) => (formik.initialValues.username = e.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mật khẩu"
                  name="password"
                  required
                  onChange={(e) => (formik.initialValues.password = e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  marginRight: 4,
                  fontSize: 18,
                }}
                onClick={handleConfirm}
              >
                Xác nhận
              </Button>
              <Button
                onClick={() => setOpen(false)}
                sx={{
                  fontSize: 18,
                }}
              >
                Hủy
              </Button>
            </Box>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}
