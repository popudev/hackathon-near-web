"use client";

import { MajorThunks } from "@/redux/features/major/majorThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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
import { useEffect } from "react";

export default function Major() {
  const majors = useAppSelector((state) => state.major.majors);
  console.log("majors: ", majors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(MajorThunks.getMajors());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: 30,
            fontWeight: "500",
            my: 4,
          }}
        >
          Hãy lựa chọn chương trình đào tạo
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {majors.map((major) => {
          return (
            <Card key={major.major_id} sx={{ width: 300, m: 2, border: "1px solid #fff" }}>
              <CardMedia
                sx={{ height: 140 }}
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
              <CardActions>
                <Button href={`/register/student/${major.major_id}`} size="medium">
                  Đăng ký
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
