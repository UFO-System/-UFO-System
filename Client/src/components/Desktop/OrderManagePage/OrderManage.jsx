import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Button,
  Box,
} from "@mui/material";

const OrderManage = () => {
  const [depositor, setDepositor] = useState(""); // 입금자명
  const [amount, setAmount] = useState(""); // 입금 금액

  const orders = [
    { id: 1, food: "어묵탕 외 3건", depositor: "배준재", amount: 20000 },
    { id: 2, food: "닭발 외 2건", depositor: "김호진", amount: 15000 },
    { id: 3, food: "어묵탕 외 1건", depositor: "옥준서", amount: 10000 },
    { id: 4, food: "닭발 외 2건", depositor: "모정환", amount: 20000 },
    { id: 5, food: "파전 외 3건", depositor: "김건우", amount: 30000 },
    { id: 6, food: "닭발 외 4건", depositor: "최일한", amount: 50000 },
    { id: 7, food: "김치전 외 1건", depositor: "류태웅", amount: 17000 },
    { id: 8, food: "닭발 외 2건", depositor: "김재영", amount: 18000 },
    { id: 9, food: "어묵탕", depositor: "손원일", amount: 8000 },
    { id: 10, food: "김치찜", depositor: "배준재", amount: 15000 },
    { id: 11, food: "만두 외 2건", depositor: "김호진", amount: 15000 },
    { id: 12, food: "음료", depositor: "옥준서", amount: 2000 },
  ];

  const handleReject = (id) => {
    console.log(`주문번호 ${id}가 거절되었습니다.`);
  };

  const handleAccept = (id) => {
    console.log(`주문번호 ${id}가 수락되었습니다.`);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "90vh",
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{ backgroundColor: "#002884", color: "white" }}
                >
                  주문내역
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  주문번호
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  주문음식
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  입금자명
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  입금 금액
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                  비고
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell sx={{ textAlign: "center" }}>{order.id}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {order.food}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {order.depositor}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {order.amount}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleReject(order.id)}
                      sx={{ marginRight: "5px" }}
                    >
                      거절
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAccept(order.id)}
                    >
                      수락
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "inline-block",
            width: "40%",
            backgroundColor: "lightgray",
            padding: "5px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    align="center"
                    sx={{ backgroundColor: "#002884", color: "white" }}
                  >
                    입금내역
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>입금자명</TableCell>
                  <TableCell>
                    <TextField
                      value={depositor}
                      onChange={(e) => setDepositor(e.target.value)}
                      fullWidth
                      margin="none"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>입금 금액</TableCell>
                  <TableCell>
                    <TextField
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      fullWidth
                      margin="none"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default OrderManage;
