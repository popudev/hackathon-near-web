"use client";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { signIn } from "@/app/actions/auth";
import { UserThunks } from "@/redux/features/user/userThunk";
import { userService } from "@/services/user";
import { UserSelectors } from "@/redux/features/user/userSelectors";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(UserSelectors.getUser());
  const mutationLogin = useMutation({
    mutationFn: (data: { username: string; password: string }) => {
      const { username, password } = data;
      setLoading(true);
      return userService.signIn(username, password);
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {},
  });
  useEffect(() => {
    // console.log(user);
  }, [user]);
  useEffect(() => {
    if (mutationLogin.error) {
      console.log(mutationLogin.error);
    }
  }, [mutationLogin.error]);

  useEffect(() => {
    if (mutationLogin.data) {
      if (mutationLogin.data.accessToken) {
        const { accessToken } = mutationLogin.data;
        signIn(accessToken);
        dispatch(UserThunks.getPayload(accessToken));
        router.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationLogin.data]);

  const handleLogin = (e: React.MouseEvent) => {
    const { username, password } = formik.values;
    mutationLogin.mutate({
      username,
      password,
    });
  };

  return (
    <Box
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
              fontSize: 40,
              fontWeight: "500",
              textAlign: "center",
              mb: 4,
            }}
          >
            Đăng nhập vào hệ thống
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tài khoản"
                name="username"
                onChange={formik.handleChange}
                required
                value={formik.values.username}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mật khẩu"
                name="password"
                onChange={formik.handleChange}
                required
                type="password"
                value={formik.values.password}
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
              onClick={handleLogin}
            >
              Đăng nhập
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
        </Box>
      </Paper>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
