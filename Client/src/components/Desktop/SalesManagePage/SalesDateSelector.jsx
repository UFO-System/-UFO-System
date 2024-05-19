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

const sales = [
  { date: "2024-05-23", totalPrice: 100000 },
  { date: "2024-05-24", totalPrice: 2000000 },
  { date: "2024-05-25", totalPrice: 3000000 },
];

function SalesDateSelector() {
  //내림차순 정렬
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  // 날짜로 정렬
  useEffect(() => {
    handleRequestSort("date");
  }, []);
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

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex !== -1) {
      newSelected = [];
    } else {
      newSelected = [id];
    }

    setSelected(newSelected);
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

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const sortedSales = stableSort(sales, getComparator(order, orderBy));
  return (
    <TableContainer component={Paper} sx={{ height: "90vh" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={2}
              align="center"
              sx={{ backgroundColor: "#002884", color: "white" }}
            >
              매출관리
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
                active={orderBy === "date"}
                direction={orderBy === "date" ? order : "asc"}
                onClick={() => handleRequestSort("date")}
              >
                날짜
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <TableSortLabel
                active={orderBy === "totalPrice"}
                direction={orderBy === "totalPrice" ? order : "asc"}
                onClick={() => handleRequestSort("totalPrice")}
              >
                금액
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedSales.map((sales) => (
            <TableRow
              key={sales.date}
              hover
              onClick={(event) => handleClick(event, sales.date)}
              role="checkbox"
              selected={isSelected(sales.date)}
            >
              <TableCell sx={{ textAlign: "center" }}>{sales.date}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {sales.totalPrice}원
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SalesDateSelector;
