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
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface Props {
  title: string;
  open: boolean;
  items: { key: string; value: string }[];
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export const SelectedForm: React.FC<Props> = ({ open, onClose, onConfirm, items, title }) => {
  const [value, setValue] = useState("");
  const handleChange = (event: SelectChangeEvent) => setValue(event.target.value);
  const handleConfirm = () => onConfirm(value);
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
            {title}
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
          <Grid
            container
            spacing={2}
            sx={{
              width: 400,
            }}
          >
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label-1">
                  Chọn giảng viên phân công
                </InputLabel>
                <Select
                  label="Chọn giảng viên phân công"
                  fullWidth
                  labelId="demo-simple-select-label-1"
                  name="instructor_id"
                  onChange={handleChange}
                >
                  {items.map((item) => (
                    <MenuItem value={item.key} key={item.key}>
                      {item.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              onClick={handleConfirm}
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
