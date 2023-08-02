import { MajorSelectors } from "@/redux/features/major/majorSelectors";
import { MajorActions } from "@/redux/features/major/majorSlice";
import { MajorThunks } from "@/redux/features/major/majorThunk";
import { SubjectActions } from "@/redux/features/subject/subjectSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import majorService, { MajorService } from "@/services/major";
import { Major } from "@/services/major/types";
import subjectService from "@/services/subject";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  majors: Major[];
}
export const SubjectForm: React.FC<Props> = ({ open, onClose, majors }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      thumbnail: "",
      title: "",
      description: "",
      number_of_credits: 0,
      prerequisite_subject_id: undefined,
      price: 0,
      major_id: undefined,
    },
    onSubmit: (values) => {
      (async () => {
        const subject = await subjectService.create({
          thumbnail: values.thumbnail,
          title: values.title,
          description: values.description,
          number_of_credits: values.number_of_credits,
          prerequisite_subject_id: values.prerequisite_subject_id,
          price: values.price,
        });
        dispatch(SubjectActions.addSubject(subject));
      })();
    },
  });
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          padding: 4,
          width: 550,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: 30,
              fontWeight: "500",
              textAlign: "center",
              mb: 4,
            }}
          >
            Tạo môn học
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên môn học"
                name="title"
                onChange={formik.handleChange}
                required
                value={formik.values.title}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Môn học thuộc ngành</InputLabel>
                <Select
                  value={formik.values.major_id}
                  labelId="demo-simple-select-label"
                  label="Môn học thuộc ngành"
                  placeholder="Môn học thuộc ngành"
                  onChange={formik.handleChange}
                  fullWidth
                >
                  {majors.map((major) => (
                    <MenuItem value={major.major_id} key={major.major_id}>
                      {major.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô Tả"
                name="description"
                onChange={formik.handleChange}
                required
                type="text"
                value={formik.values.description}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số tín chỉ"
                name="number_of_credits"
                onChange={formik.handleChange}
                required
                type="number"
                value={formik.values.number_of_credits}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mã môn tiên quyết"
                name="prerequisite_subject_id"
                onChange={formik.handleChange}
                required
                type="text"
                value={formik.values.prerequisite_subject_id}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Giá near"
                name="price"
                onChange={formik.handleChange}
                required
                type="number"
                value={formik.values.price}
                variant="outlined"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <p>Kéo và thả tệp ảnh mô tả vào đây</p>
              </Grid>
              <Grid item xs={12}>
                {selectedImage && (
                  <Image
                    src={selectedImage}
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                )}
              </Grid>
            </Grid> */}
          </Grid>
          <Box
            sx={{
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              sx={{
                marginRight: 4,
                fontSize: 18,
              }}
              onClick={formik.submitForm}
            >
              Xác nhận
            </Button>
            <Button
              onClick={onClose}
              sx={{
                fontSize: 18,
              }}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};
