"use client";
import { Score } from "@/services/major/types";
import { TableCell, TableRow } from "@mui/material";

interface Props {
  data: Score;
}

export const StudentScoreItem: React.FC<Props> = ({ data }) => {
  return (
    <TableRow>
      <TableCell align="center">{"Cấu trúc dữ liệu và giải thuật"}</TableCell>
      <TableCell align="center" sx={{}}>
        {"Phan Tấn Quốc"}
      </TableCell>
      <TableCell align="center">{data.score}</TableCell>
      <TableCell align="center">{"Đạt"}</TableCell>
    </TableRow>
  );
};
