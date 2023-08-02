"use client";

import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Web3Thunks } from "@/redux/features/web3/web3Thunk";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "@/axiosConfig";
import { UserPayload } from "types/responses";

import { signIn } from "@/app/actions/auth";
import { verifyJwtToken } from "@/libs/auth";
import { UserThunk } from "@/redux/features/user/userThunk";
import { userService } from "@/services/user";

export default function Login() {
  const [value, setValue] = useState("1");

  const { wallet, isSignedIn } = useAppSelector((state) => state.web3);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const mutationLogin = useMutation({
    mutationFn: (data: { username: string; password: string }) => {
      const { username, password } = data;
      return userService.signIn(username, password);
    },
  });
  const formik = useFormik({
    initialValues: {
      code: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      workUnitId: "",
      jobPositionName: "",
      roleIds: [],
      username: "",
      password: "",
      passwordRetype: "",
    },
    onSubmit: (values) => {},
  });

  useEffect(() => {
    if (isSignedIn) router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

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
        dispatch(UserThunk.getPayload(accessToken));

        router.push("/");
      }
    }
  }, [mutationLogin.data]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleLoginWallet = () => {
    wallet?.signIn();
  };

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
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="login">
              <Tab label="Đăng nhập bằng tài khoản" value="1" />
              <Tab label="Đăng nhập bằng wallet" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
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
          </TabPanel>
          <TabPanel value="2">
            <Button
              onClick={handleLoginWallet}
              variant="contained"
              sx={{
                fontSize: 18,
                my: 10,
              }}
            >
              Kết nối với wallet
            </Button>
          </TabPanel>
        </TabContext>
      </Paper>
    </Box>
  );
}
