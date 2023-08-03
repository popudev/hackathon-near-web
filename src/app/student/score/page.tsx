"use client";
import {
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAppSelector } from "@/redux/hooks";
import { StudentScoreItem } from "@/app/_components/student/StudentScoreItem";

export default function ScoreList() {
  const scores = useAppSelector((state) => state.score.scores);

  return (
    <Box
      component="main"
      sx={{
        py: 4,
      }}
    >
      <Container maxWidth={false}>
        <Box>
          <Card sx={{ mt: 3, boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
            <Box sx={{ position: "relative" }}>
              <Table sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Môn học</TableCell>
                    <TableCell align="center">Giảng viên</TableCell>
                    <TableCell align="center">Điểm</TableCell>
                    <TableCell align="center">Kết quả</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scores.map((score) => {
                    return <StudentScoreItem key={score.score_id} data={score} />;
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
