"use client";

import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Backdrop, Box, Button, Card, CircularProgress, Container } from "@mui/material";
import { MajorForm } from "../../_components/MajorForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MajorSelectors } from "@/redux/features/major/majorSelectors";
import { MajorThunks } from "@/redux/features/major/majorThunk";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Major } from "@/services/major/types";

export default function Major() {
  const majors = useAppSelector(MajorSelectors.getMajors());
  const [visibleForm, setVisibleForm] = useState(false);
  const [majorList, setMajorList] = useState<Major[]>(majors);
  const [openLoading, setOpenLoading] = useState(false);
  const hideForm = () => setVisibleForm(false);
  const showForm = () => setVisibleForm(true);

  useEffect(() => {
    console.log("thay đổi nè", majors);
    setMajorList(majors);
  }, [majors]);

  return (
    <Box
      component="main"
      sx={{
        py: 4,
      }}
    >
      <Container maxWidth={false}>
        <MajorForm open={visibleForm} onClose={hideForm} setLoadingScreen={setOpenLoading} />
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
                  {majorList.map((row) => (
                    <TableRow
                      key={row.major_id}
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1000 }}
        open={openLoading}
      >
        <CircularProgress color="inherit" size={60} />
      </Backdrop>
    </Box>
  );
}
