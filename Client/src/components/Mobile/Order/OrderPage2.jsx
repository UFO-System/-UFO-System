import React from "react";
import AppBar from "@mui/material/AppBar";
import { useLocation } from "react-router-dom";
import "./css/OrderPage.css";

const OrderPage2 = () => {
  const location = useLocation();
  console.log(location);
  const total = location.state.total;
  const name = location.state.name;
  return (
    <div className="app">
      <AppBar position="static">
        <h4 className="name">{name}</h4>
        {total}
      </AppBar>
    </div>
  );
};

export default OrderPage2;
