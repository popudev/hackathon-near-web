"use client";

import { AlertDialogSlide } from "@/app/_components/AlertDialogSlide";
import { MajorThunks } from "@/redux/features/major/majorThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userService } from "@/services/user";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

export default function Register({ params }: { params: { id: string } }) {
  const majors = useAppSelector((state) => state.major.majors);
  const { contract, isSignedIn, wallet } = useAppSelector((state) => state.web3);
  const major = majors.find((m) => m.major_id === params.id);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(MajorThunks.getMajors());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      full_name: "",
      date_of_birth: "",
      email: "",
      phone: "",
      national_identity_card: "",
      national_identity_card_date: "",
    },
    onSubmit: async (values) => {
      if (!isSignedIn) return wallet?.signIn();

      setOpen(true);

      if (wallet && wallet.accountId && contract) {
        await userService.registerStudent({
          user_id: wallet.accountId,
          ...values,
        });
        await contract.registerStudent(params.id);
        setOpenDialog(true);
      }

      setOpen(false);
    },
  });

  if (!major) return <></>;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Card
            sx={{
              maxWidth: 345,
              mr: 2,
              flex: 1,
            }}
          >
            <CardMedia
              sx={{ height: 150, width: 300 }}
              image={major.thumbnail || "/static/images/software-development.jpg"}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {major.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {major.description}
              </Typography>
            </CardContent>
          </Card>

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
                  fontSize: 40,
                  fontWeight: "500",
                  textAlign: "center",
                  mb: 4,
                }}
              >
                Đăng ký sinh viên mới
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  name="full_name"
                  onChange={(e) => (formik.initialValues.full_name = e.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  placeholder=""
                  label="Ngày sinh"
                  name="date_of_birth"
                  onChange={(e) => (formik.initialValues.date_of_birth = e.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={(e) => (formik.initialValues.email = e.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  onChange={(e) => (formik.initialValues.phone = e.target.value)}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Số CMND/CCCD"
                  name="national_identity_card"
                  onChange={(e) =>
                    (formik.initialValues.national_identity_card = e.target.value)
                  }
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Ngày cấp"
                  name="national_identity_card_date"
                  onChange={(e) =>
                    (formik.initialValues.national_identity_card_date = e.target.value)
                  }
                  required
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
                onClick={() => formik.submitForm()}
                variant="contained"
                sx={{
                  marginRight: 4,
                  fontSize: 18,
                }}
              >
                Đăng ký
              </Button>
              <Button
                href="/"
                sx={{
                  fontSize: 18,
                }}
              >
                Hủy
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <AlertDialogSlide
        open={openDialog}
        title="Bạn đã đăng ký nhập học thành công"
        desrciption="Đơn đăng ký của bạn đã được gửi đến quản trị viên. Vui lòng kiểm tra email để nhận được thông báo"
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
}
