"use client";
import { userService } from "@/services/user";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { AlertDialogSlide } from "../AlertDialogSlide";

export function StudentItem({ data }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (value) => {
      const { username, password } = value;
      setOpen(false);
      setLoading(true);
      await userService.activeStudent(data.user_id, username, password);
      setLoading(false);
      setOpenDialog(true);
    },
  });

  return (
    <>
      <TableRow key={data.user_id}>
        <TableCell align="center">{data.full_name}</TableCell>
        <TableCell align="center">{data.email}</TableCell>
        <TableCell align="center">{data.phone}</TableCell>
        <TableCell align="center">{data.date_of_birth}</TableCell>
        <TableCell align="center">{data.national_identity_card}</TableCell>
        <TableCell align="center">{data.username || "Chưa có"}</TableCell>
        <TableCell align="center">
          {data.active ? (
            <Button disabled>Đã duyệt</Button>
          ) : (
            <Button onClick={() => setOpen(true)}>Duyệt</Button>
          )}
        </TableCell>
      </TableRow>
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
              Cung cấp tài khoản cho sinh viên
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
                onClick={() => formik.submitForm()}
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
    </>
  );
}
