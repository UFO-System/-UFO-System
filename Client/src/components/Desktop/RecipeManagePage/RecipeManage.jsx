import React, { useState } from 'react';
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
} from '@mui/material';

const RecipeManage = () => {
  const [menus, setMenus] = useState([
    // 임의 투입
    { name: '어묵탕', price: '5,000원', image: '어묵탕 이미지 경로' },
    { name: '닭발', price: '7,000원', image: '닭발 이미지 경로' },
    { name: '계란찜', price: '3,000원', image: '계란찜 이미지 경로' },
    { name: '수육', price: '12,000원', image: '수육 이미지 경로' },
    { name: '나베', price: '15,000원', image: ' 이미지 경로' },
    { name: '파전', price: '10,000원', image: ' 이미지 경로' },
    // 다른 메뉴도 같은 형식으로 추가
  ]);

  const [newMenu, setNewMenu] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleDelete = (index) => {
    // 확인 창 출력
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

    if (confirmDelete) {
      const updatedMenus = [...menus];
      updatedMenus.splice(index, 1);
      setMenus(updatedMenus);
    }
  };

  const handleAddMenu = () => {
    // 모든 필드 입력 창 출력
    if (
      newMenu.trim() === '' ||
      newPrice.trim() === '' ||
      newImage.trim() === ''
    ) {
      alert('모든 필드를 입력하세요.');
      return;
    }

    const updatedMenus = [
      // 메뉴 추가 라인
      ...menus,
      { name: newMenu, price: newPrice, image: newImage },
    ];
    setMenus(updatedMenus);

    setNewMenu('');
    setNewPrice('');
    setNewImage('');
  };

  return (
    <div // 현재메뉴 출력 div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <div style={{ width: '50%', height: '80vh', overflow: 'auto' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ backgroundColor: '#002884', color: 'white' }}
                >
                  <Typography variant="h7" gutterBottom>
                    메뉴
                  </Typography>
                </TableCell>
                <TableCell
                  style={{ backgroundColor: '#002884', color: 'white' }}
                >
                  <Typography variant="h7" gutterBottom>
                    가격
                  </Typography>
                </TableCell>
                <TableCell
                  style={{ backgroundColor: '#002884', color: 'white' }}
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
                      {menu.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" gutterBottom>
                      {menu.price}
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
      <div style={{ width: '40%', margin: '50px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
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
            style={{ marginTop: '20px' }}
          >
            추가하기
          </Button>
        </Paper>
      </div>
    </div>
  );
};

export default RecipeManage;
