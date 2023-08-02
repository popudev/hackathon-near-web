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

export default function Register() {
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
            <Card key={major.major_id} sx={{ maxWidth: 345, m: 2 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={major.thumbnail || ""}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {major.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                  ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button href={`register/${major.major_id}`} size="medium">
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
