import { MajorActions } from "@/redux/features/major/majorSlice";
import { useAppDispatch } from "@/redux/hooks";
import majorService, { MajorService } from "@/services/major";
import { Box, Button, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import { useCallback, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  setLoadingScreen: (arg: boolean) => void;
}
export const MajorForm: React.FC<Props> = ({ open, onClose, setLoadingScreen }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      thumbail: "",
      name: "",
      description: "",
      number_of_credits_required: 152,
    },
    onSubmit: (values) => {
      (async () => {
        const { thumbail, name, description, number_of_credits_required } = values;
        setLoadingScreen(true);
        const major = await majorService.create({
          thumbnail: thumbail,
          name: name,
          description: description,
          number_of_credits_required: number_of_credits_required,
        });
        dispatch(
          MajorActions.addMajor({
            thumbnail: thumbail,
            name: name,
            description: description,
            number_of_credits_required: number_of_credits_required,
          })
        );
        onClose();
        setLoadingScreen(false);
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
            Tạo ngành học
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
                label="Tên ngành"
                name="name"
                onChange={(e) => (formik.initialValues.name = e.target.value)}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô Tả"
                name="description"
                onChange={(e) => (formik.initialValues.description = e.target.value)}
                required
                type="text"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tổng số tín chỉ"
                name="number_of_credits_required"
                onChange={(e) =>
                  (formik.initialValues.number_of_credits_required = +e.target.value)
                }
                required
                type="number"
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
