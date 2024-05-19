import React from "react";
import { Box } from "@mui/material";
import SalesDateSelector from "./SalesDateSelector";
import SalesDetailViewer from "./SalesDetailViewer";

const salesItem = [
  { time: "10:20", menu: "김치찜", price: 10000 },
  { time: "09:21", menu: "계란찜", price: 19900 },
  { time: "13:22", menu: "수육", price: 14950 },
];

const SalesManage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "90vh",
        }}
      >
        <SalesDateSelector />
        <Box
          sx={{
            display: "inline-block",
            width: "140%",
            backgroundColor: "lightgray",
            padding: "5px",
            marginLeft: "10px",
            marginRight: "10px",
            height: "89vh",
          }}
        >
          <SalesDetailViewer data={salesItem} />
        </Box>
      </Box>
    </>
  );
};

export default SalesManage;
