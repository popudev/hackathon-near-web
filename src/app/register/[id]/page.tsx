"use client";

import { useAppSelector } from "@/redux/hooks";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";

export default function Register({ params }: { params: { id: string } }) {
  const majors = useAppSelector((state) => state.major.majors);
  const major = majors.find((m) => m.major_id === params.id);

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

  if (!major) return <></>;
  return (
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
          <CardMedia sx={{ height: 150 }} image={major.thumbnail || ""} title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {major.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species,
              ranging across all continents except Antarctica Lizards are a widespread group of
              squamate reptiles, with over 6,000 species, ranging across all continents except
              Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica Lizards are a widespread
              group of squamate reptiles, with over 6,000 species, ranging across all
              continents except Antarctica Lizards are a widespread group of squamate reptiles,
              with over 6,000 species, ranging across all continents except Antarctica
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
                name="firstName"
                onChange={formik.handleChange}
                required
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ngày sinh"
                name="firstName"
                onChange={formik.handleChange}
                required
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="firstName"
                onChange={formik.handleChange}
                required
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="firstName"
                onChange={formik.handleChange}
                required
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Số CMND/CCCD"
                name="firstName"
                onChange={formik.handleChange}
                required
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Ngày cấp"
                name="firstName"
                onChange={formik.handleChange}
                required
                value={formik.values.firstName}
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
  );
}
