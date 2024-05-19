import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Button,
  Typography,
} from "@mui/material";

const RecipeManage = () => {
  const [menus, setMenus] = useState([
    "어묵탕",
    "닭발",
    "만두",
    "김치찜",
    "김치전",
    "파전",
    "닭볶음탕",
    "가라아게",
    "계란찜",
    "주먹밥",
    "라면",
    "음료",
  ]);

  const [newMenu, setNewMenu] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");

  const handleDelete = (index) => {
    const updatedMenus = [...menus];
    updatedMenus.splice(index, 1);
    setMenus(updatedMenus);
  };

  const handleAddMenu = () => {
    if (
      newMenu.trim() === "" ||
      newPrice.trim() === "" ||
      newImage.trim() === ""
    ) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    const updatedMenus = [
      ...menus,
      { name: newMenu, price: newPrice, image: newImage },
    ];
    setMenus(updatedMenus);

    // 입력 필드 초기화
    setNewMenu("");
    setNewPrice("");
    setNewImage("");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ width: "50%", height: "80vh", overflow: "auto" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ backgroundColor: "#002884", color: "white" }}
                  >
                    <Typography variant="h7" gutterBottom>
                      현재메뉴
                    </Typography>
                  </TableCell>
                  <TableCell
                    style={{ backgroundColor: "#002884", color: "white" }}
                  >
                    <Typography variant="h7" gutterBottom>
                      비고
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menus.map((menu, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="h6" gutterBottom>
                        {menu}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(index)}
                        variant="contained"
                        color="error"
                      >
                        x
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ width: "40%", margin: "50px" }}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
              추가할 메뉴
            </Typography>
            <TextField
              label="메뉴명"
              value={newMenu}
              onChange={(e) => setNewMenu(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="가격"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="이미지"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              onClick={handleAddMenu}
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              추가하기
            </Button>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default RecipeManage;
