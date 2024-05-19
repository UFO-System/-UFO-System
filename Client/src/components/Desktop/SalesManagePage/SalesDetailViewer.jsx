import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function SalesDetailViewer({ data }) {
  useEffect(() => {
    handleRequestSort("time");
  }, []);
  //내림차순 정렬
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  //초기 정렬 및 정렬을 위해 필요
  const handleRequestSort = (property) => {
    let newOrderBy = property;
    let newOrder = "desc";

    if (orderBy === property && order === "desc") {
      newOrder = "asc";
    }

    setOrder(newOrder);
    setOrderBy(newOrderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const sortedSales = stableSort(data, getComparator(order, orderBy));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={3}
              align="center"
              sx={{ backgroundColor: "#002884", color: "white" }}
            >
              날짜별
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <TableSortLabel
                active={orderBy === "time"}
                direction={orderBy === "time" ? order : "asc"}
                onClick={() => handleRequestSort("time")}
              >
                시간
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <TableSortLabel
                active={orderBy === "menu"}
                direction={orderBy === "menu" ? order : "asc"}
                onClick={() => handleRequestSort("menu")}
              >
                메뉴
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <TableSortLabel
                active={orderBy === "price"}
                direction={orderBy === "price" ? order : "asc"}
                onClick={() => handleRequestSort("price")}
              >
                금액
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedSales.map((saleItem) => (
            <TableRow key={saleItem.time}>
              <TableCell sx={{ textAlign: "center" }}>
                {saleItem.time}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {saleItem.menu}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {saleItem.price}원
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
