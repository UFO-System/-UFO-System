import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./css/Phone.css";

const Phone = () => {
  const navigate = useNavigate();
  return (
    <div className="button-container">
      <Button
        variant="contained"
        onClick={() => navigate("/OrderPage1")}
        sx={{ flexGrow: 1, m: 1, height: "100%" }}
      >
        주문화면
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate("/KitchenPage")}
        sx={{ flexGrow: 1, m: 1, height: "100%" }}
      >
        부엌화면
      </Button>
    </div>
  );
};

export default Phone;
