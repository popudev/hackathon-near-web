"use client";

import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { MajorForm } from "../_components/majorForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MajorSelectors } from "@/redux/features/major/majorSelectors";
import { MajorThunks } from "@/redux/features/major/majorThunk";

export default function Major() {
  const [visibleForm, setVisibleForm] = useState(false);
  const hideForm = () => setVisibleForm(false);
  const showForm = () => setVisibleForm(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(MajorThunks.getMajors());
  }, [dispatch]);

  const majors = useAppSelector(MajorSelectors.getMajors());

  return (
    <TableContainer component={Paper}>
      {<MajorForm open={visibleForm} onClose={hideForm} />}
      <Button onClick={showForm}>Thêm ngành học</Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Tên ngành</TableCell>
            <TableCell align="center">Ảnh mô tả</TableCell>
            <TableCell align="left">Mô tả</TableCell>
            <TableCell align="right">Tổng số tín chỉ</TableCell>
            <TableCell align="right">Tổng số học sinh</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {majors.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="left">{row.thumbnail}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.number_of_credits_required}</TableCell>
              <TableCell align="right">{row.number_students}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
