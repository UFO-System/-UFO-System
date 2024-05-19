import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import "./css/OrderPage.css";

const OrderPage1 = () => {
  // 매장 이름
  const name = "소웨";

  // 메뉴 이름
  const menu1 = "사과";
  const menu2 = "포도";
  const menu3 = "망고";

  // 메뉴 가격
  const price1 = 1000;
  const price2 = 2000;
  const price3 = 3000;

  // 메뉴 수량 더하기
  const [count1, setCount1] = useState(0);
  function plus1() {
    setCount1(count1 + 1);
  }
  const [count2, setCount2] = useState(0);
  function plus2() {
    setCount2(count2 + 1);
  }
  const [count3, setCount3] = useState(0);
  function plus3() {
    setCount3(count3 + 1);
  }

  // 메뉴 수량 빼기
  function minus1() {
    if (count1 == 0) {
      count1 == 0;
    } else {
      setCount1(count1 - 1);
    }
  }
  function minus2() {
    if (count2 == 0) {
      count2 == 0;
    } else {
      setCount2(count2 - 1);
    }
  }
  function minus3() {
    if (count3 == 0) {
      count3 == 0;
    } else {
      setCount3(count3 - 1);
    }
  }
  // 페이지 전환
  const navigate = useNavigate();

  return (
    <Container fixed>
      <div className="app">
        <AppBar position="static">
          <h4 className="name">{name}</h4>
        </AppBar>
        <div className="menu">
          <h5>
            {menu1} {count1} 개
            <Button
              className="OrderPageBtn"
              variant="contained"
              onClick={minus1}
              style={{ background: "red" }}
            >
              {" "}
              -{" "}
            </Button>
            <Button
              className="OrderPageBtn"
              variant="contained"
              onClick={plus1}
            >
              {" "}
              +{" "}
            </Button>
          </h5>
          <p>{price1} 원</p>
        </div>
        <div className="menu">
          <h5>
            {menu2} {count2} 개
            <Button
              className="OrderPageBtn"
              variant="contained"
              onClick={minus2}
              style={{ background: "red" }}
            >
              {" "}
              -{" "}
            </Button>
            <Button
              className="OrderPageBtn"
              variant="contained"
              onClick={plus2}
            >
              {" "}
              +{" "}
            </Button>
          </h5>
          <p>{price2} 원</p>
        </div>
        <div className="menu">
          <h5>
            {menu3} {count3} 개
            <Button
              className="OrderPageBtn"
              variant="contained"
              onClick={minus3}
              style={{ background: "red" }}
            >
              {" "}
              -{" "}
            </Button>
            <Button
              className="OrderPageBtn"
              variant="contained"
              onClick={plus3}
            >
              {" "}
              +{" "}
            </Button>
          </h5>
          <p>{price3} 원</p>
        </div>
        <div className="bottom">
          <h4>
            총 수량: {count1 + count2 + count3}개 | 총 금액:{" "}
            {price1 * count1 + price2 * count2 + price3 * count3}원
          </h4>
        </div>
        <AppBar
          position="static"
          style={{ height: "80px", paddingTop: "15px", display: "flex" }}
        >
          <center>
            <Button
              className="orderBt"
              onClick={() => {
                navigate("/OrderPage2", {
                  state: {
                    total: price1 * count1 + price2 * count2 + price3 * count3,
                    name: name,
                  },
                });
              }}
              style={{ color: "white", boxShadow: "1px 1px 5px black" }}
            >
              주문하기
            </Button>
          </center>
        </AppBar>
      </div>
    </Container>
  );
};
export default OrderPage1;
