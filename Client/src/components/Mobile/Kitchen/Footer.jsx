import React from "react";
import "./css/KitchenPage.css";
import { Box } from "@mui/material";
import { Button } from "@mui/material";

const Footer = () => {
  return (
    <div>
      <Button
        variant="contained"
        size="large"
        sx={{
          position: "absolute",
          bottom: "5vh",
          left: "5vw",
          width: "20vw",
          height: "7vh",
          borderRadius: 5,
          "&hover": {
            backgroundColor: "#4285f4",
          },
          "&:not(:hover)": {
            backgroundColor: "#7AA2E3",
            transition: "background-color 0.5s",
          },
        }}
      >
        {" "}
        주문 되돌리기
      </Button>
      <Box
        sx={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          position: "absolute",
          bottom: "3.5vh",
          left: "35%",
          width: "30vw",
          height: "10vh",
          borderRadius: 5,
          bgcolor: "#7AA2E3",
        }}
      >
        UFO
      </Box>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          bottom: "5vh",
          right: "5vw",
          width: "9vw",
          height: "7vh",
          borderRadius: 5,
          "&hover": {
            backgroundColor: "#4285f4",
          },
          "&:not(:hover)": {
            backgroundColor: "#7AA2E3",
            transition: "background-color 0.5s",
          },
        }}
      >
        다음 페이지
      </Button>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          bottom: "5vh",
          right: "15vw",
          width: "9vw",
          height: "7vh",
          borderRadius: 5,
          "&hover": {
            backgroundColor: "#4285f4",
          },
          "&:not(:hover)": {
            backgroundColor: "#7AA2E3",
            transition: "background-color 0.5s",
          },
        }}
      >
        이전 페이지
      </Button>
    </div>
  );
};

export default Footer;
