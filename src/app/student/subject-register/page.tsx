"use client";
import { MajorSelectors } from "@/redux/features/major/majorSelectors";
import { SubjectSelectors } from "@/redux/features/subject/subjectSelectors";
import { UserSelectors } from "@/redux/features/user/userSelectors";
import { useAppSelector } from "@/redux/hooks";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { utils } from "near-api-js";
import { useEffect } from "react";

export default function SubjectRegister() {
  const subjects = useAppSelector(SubjectSelectors.getSubjects());
  const { wallet, isSignedIn, contract } = useAppSelector((state) => state.web3);

  const handleRegisterSubject = async (subject_id: string, price: number) => {
    if (!isSignedIn) return wallet?.signIn();

    await contract?.registerSubject(subject_id, price);
  };

  useEffect(() => {}, []);

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
          {subjects?.length ? "Đăng ký môn học" : "Chưa có môn học nào được mở"}
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
            <Card key={subject.subject_id} sx={{ width: 300, m: 2, border: "1px solid #fff" }}>
              <CardMedia
                sx={{ height: 140 }}
                image={subject.thumbnail || "/static/images/software-development.jpg"}
                title="green iguana"
              />
              <CardContent sx={{ paddingBottom: 0 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {subject.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: "15px" }}
                >
                  {subject.description}
                </Typography>
                <Typography
                  sx={{ fontSize: "16px", wordBreak: "break-all" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Học phí: {subject.price} NEAR
                </Typography>
                <Typography
                  sx={{ fontSize: "16px" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Số tín chỉ: {subject.number_of_credits}
                </Typography>
                <Typography
                  sx={{ fontSize: "16px" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Đã đăng ký: {subject.number_students_studying || 0}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Button
                  size="large"
                  sx={{ textAlign: "center", fontSize: "17px" }}
                  onClick={() =>
                    handleRegisterSubject(subject.subject_id || "", subject.price)
                  }
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
