"use client";
import { Box, Typography } from "@mui/material";

export const DegreeTemplate = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <Box
        component="div"
        sx={{
          width: "800px",
          height: "550px",
          backgroundImage: `url(/static/images/degreeFrame.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 0",
          }}
        >
          <Box component={"h1"} sx={{ marginBottom: 0, marginTop: 1, color: "#F7D000" }}>
            CERTIFICATE
          </Box>
          <Box component={"h3"} sx={{ marginTop: 1, paddingBottom: "5px", color: "#F7D000" }}>
            OF APPRECIATION
            <Box
              component={"h3"}
              sx={{ margin: 1, marginBottom: "5px", border: "1px solid #F7D000" }}
            ></Box>
          </Box>
          <Typography sx={{ fontWeight: "bold", fontSize: "18px", color: "#F7D000" }}>
            This is to certify that
          </Typography>
          <Box component={"h1"} sx={{ color: "#90caf9" }}>
            Lương Chi Thịnh
          </Box>
          <Typography>has successfully completed the course</Typography>
          <Typography sx={{ color: "#F7D000" }}>Cấu trúc dữ liệu và giải thuật</Typography>
          <Box
            sx={{
              marginTop: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              width: "100%",
              padding: "0 80px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "200px",
              }}
            >
              <Typography> TP.HCM, 12 October 2023</Typography>
              <Typography> DATE</Typography>
            </Box>
            <Box
              sx={{
                width: "200px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="div"
                sx={{
                  // position: "absolute",
                  // marginRight: "16px",
                  width: "100px",
                  height: "100px",
                  backgroundImage: `url(/static/images/goldMedal2.png)`,
                  // backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // marginRight: "19px",
                width: "200px",
              }}
            >
              <Typography>Chief executive officer</Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                CHAU PHU THINH
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
