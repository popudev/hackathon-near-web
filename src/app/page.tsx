"use client";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SuperSchool
            </Typography>
            <Button href={"/login"} color="inherit">
              Đăng nhập
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Super School
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            Chào mừng bạn đến với ngôi trường của chúng tôi
          </Typography>
        </Box>

        <Button
          href="/register/student"
          variant="outlined"
          sx={{
            mt: 4,
            fontSize: 25,
            width: 300,
          }}
        >
          Đăng ký nhập học
        </Button>
        <Button
          href="/register/instructor"
          variant="outlined"
          sx={{
            mt: 1,
            fontSize: 25,
            width: 300,
          }}
        >
          Đăng ký giảng dạy
        </Button>
      </Box>
    </>
  );
}
