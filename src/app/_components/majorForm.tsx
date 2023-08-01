import { Box, Button, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import { useCallback, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { URL } from "url";
interface Props {
  open: boolean;
  onClose: () => void;
}
export const MajorForm: React.FC<Props> = ({ open, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const formik = useFormik({
    initialValues: {
      code: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      workUnitId: "",
      jobPositionName: "",
      roleIds: [],
      username: "",
      password: "",
      passwordRetype: "",
    },
    onSubmit: (values) => {},
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
              fontSize: 40,
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
                name="firstName"
                onChange={formik.handleChange}
                required
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ảnh mô tả"
                name="firstName"
                onChange={formik.handleChange}
                required
                type="password"
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô Tả"
                name="firstName"
                onChange={formik.handleChange}
                required
                type="password"
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tổng số tín chỉ"
                name="firstName"
                onChange={formik.handleChange}
                required
                type="password"
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tổng số học sinh"
                name="firstName"
                onChange={formik.handleChange}
                required
                type="password"
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <p>Kéo và thả tệp ảnh vào đây</p>
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
            >
              Xác nhận
            </Button>
            <Button
              href="/"
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
