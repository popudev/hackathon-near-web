"use client";

import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Card, Container } from "@mui/material";
import { MajorForm } from "../../_components/MajorForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MajorSelectors } from "@/redux/features/major/majorSelectors";
import { MajorThunks } from "@/redux/features/major/majorThunk";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

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
    <Box
      component="main"
      sx={{
        py: 4,
      }}
    >
      <Container maxWidth={false}>
        <MajorForm open={visibleForm} onClose={hideForm} />
        <Fab
          size={"large"}
          color="primary"
          sx={{
            position: "absolute",
            padding: 4,
            bottom: (theme) => theme.spacing(5),
            right: (theme) => theme.spacing(5),
          }}
          onClick={() => showForm()}
        >
          <AddIcon sx={{ fontSize: 40 }} />
        </Fab>

        <Box>
          <Card sx={{ mt: 3, boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
            <Box sx={{ position: "relative" }}>
              <Table sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}>
                <TableHead>
                  <TableRow>
                    {/* <TableCell align="center">Hình ảnh</TableCell> */}
                    <TableCell align="center">Tên ngành</TableCell>
                    <TableCell align="center">Mô tả</TableCell>
                    <TableCell align="center">Số tín chỉ yêu cầu</TableCell>
                    <TableCell align="center">Số sinh viên</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {majors.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {/* <TableCell align="center">{row.thumbnail}</TableCell> */}
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          width: 400,
                        }}
                      >
                        {row.description}
                      </TableCell>
                      <TableCell align="center">{row.number_of_credits_required}</TableCell>
                      <TableCell align="center">{row.number_students || 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
