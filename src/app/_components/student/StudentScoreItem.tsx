"use client";
import { SubjectSelectors } from "@/redux/features/subject/subjectSelectors";
import { UserSelectors } from "@/redux/features/user/userSelectors";
import { useAppSelector } from "@/redux/hooks";
import { Score } from "@/services/major/types";
import { TableCell, TableRow } from "@mui/material";

interface Props {
  data: Score;
}

export const StudentScoreItem: React.FC<Props> = ({ data }) => {
  const subjects = useAppSelector(SubjectSelectors.getSubjects());
  const instructors = useAppSelector(UserSelectors.getInstructors());

  const subject = subjects.find((s) => s.subject_id === data.subject_id);
  const instructor = instructors.find((s) => s.user_id === data.instuctor_id);

  return (
    <TableRow>
      <TableCell align="center">{subject?.title}</TableCell>
      <TableCell align="center" sx={{}}>
        {instructor?.full_name}
      </TableCell>
      <TableCell align="center">{data.score}</TableCell>
      <TableCell align="center">{data.score >= 5 ? "Đạt" : "Chưa đạt"}</TableCell>
    </TableRow>
  );
};
