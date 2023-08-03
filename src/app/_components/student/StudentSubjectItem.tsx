"use client";
import { TableCell, TableRow } from "@mui/material";

// interface UserItemProps {
//     student: User;
//     selected: boolean;
//     onCheck: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
//     onIssue: (u: User) => void;
//     onEdit: (u: User) => void;
//     onDelete: (userId: String) => void;
//   }

export function StudentSubjectItem() {
  return (
    <TableRow>
      <TableCell align="center">Cấu trúc dữ liệu và giải thuật</TableCell>
      <TableCell align="center" sx={{}}>
        4
      </TableCell>
      <TableCell align="center">25</TableCell>
    </TableRow>
  );
}
