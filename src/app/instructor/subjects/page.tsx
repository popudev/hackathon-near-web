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

export default function SubjectList() {
  const subjects = useAppSelector(SubjectSelectors.getSubjects());
  const majors = useAppSelector(MajorSelectors.getMajors());
  const instructors = useAppSelector(UserSelectors.getInstructors());

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
          {subjects?.length ? "Môn học đang học" : "Bạn chưa đăng ký môn học nào"}
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
                {/* <Typography
                  sx={{ fontSize: "16px" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Học phí: {subject.price} NEAR
                </Typography> */}
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
                  Sinh viên đã đăng ký: {subject.number_students_studying || 0}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Button
                  href={`/instructor/subjects/${subject.subject_id}`}
                  size="large"
                  sx={{ textAlign: "center", fontSize: "17px" }}
                >
                  Chi tiết
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
