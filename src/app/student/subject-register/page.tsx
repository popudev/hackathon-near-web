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

export default function SubjectRegister() {
  const subjects = useAppSelector((state) => state.subject.subjects);

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
          Đăng ký môn học
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {subjects.map((subject) => {
          return (
            <Card key={subject.subject_id} sx={{ maxWidth: 345, m: 2 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={subject.thumbnail || ""}
                title="green iguana"
              />
              <CardContent sx={{ paddingBottom: 0 }}>
                <Typography gutterBottom variant="h5" component="div" align="center">
                  {subject.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ marginBottom: "15px" }}
                >
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                  ranging across all continents except Antarctica
                </Typography>
                <Typography
                  sx={{ fontSize: "18px" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                >
                  Số tiền: {subject.price}
                </Typography>
                <Typography
                  sx={{ fontSize: "18px" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                >
                  Số tín chỉ: {subject.number_of_credits}
                </Typography>
                <Typography
                  sx={{ fontSize: "18px" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                >
                  Đã đăng ký: {subject.number_students_studying}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Button
                  href={`register/${subject.subject_id}`}
                  size="medium"
                  sx={{ textAlign: "center", fontSize: "17px" }}
                >
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
