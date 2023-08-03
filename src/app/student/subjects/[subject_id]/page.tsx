"use client";
import { SubjectSelectors } from "@/redux/features/subject/subjectSelectors";
import { UserSelectors } from "@/redux/features/user/userSelectors";
import { useAppSelector } from "@/redux/hooks";
import {
  Box,
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function Page({ params }: { params: { subject_id: string } }) {
  const instructors = useAppSelector(UserSelectors.getInstructors());
  const subject = useAppSelector(SubjectSelectors.getSubjectById(params.subject_id));

  if (!subject) return <></>;

  return (
    <Box
      component="main"
      sx={{
        py: 4,
      }}
    >
      <Container maxWidth={false}>
        <Typography sx={{ fontSize: 30 }}>Môn học: {subject.title}</Typography>

        <Box>
          <Card sx={{ mt: 3, boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
            <Box sx={{ position: "relative" }}>
              <Table sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Họ và tên</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Số điện thoại</TableCell>
                    <TableCell align="center">Ngày sinh</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {instructors.map((instructor) => {
                    return (
                      <TableRow key={instructor.user_id}>
                        <TableCell align="center">{instructor.full_name}</TableCell>
                        <TableCell align="center">{instructor.email}</TableCell>
                        <TableCell align="center">{instructor.phone}</TableCell>
                        <TableCell align="center">{instructor.date_of_birth}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
