import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Desktop/Login/Login";
import MainPage from "./components/MainPage";
import Register from "./components/Desktop/Register/Register";
import KitchenPage from "./components/Mobile/Kitchen/KitchenPage";
import OrderPage1 from "./components/Mobile/Order/OrderPage1";
import OrderPage2 from "./components/Mobile/Order/OrderPage2";
import MyPage from "./components/Desktop/MyPage/MyPage";
import RecipeManage from "./components/Desktop/RecipeManagePage/RecipeManage";
import OrderManage from "./components/Desktop/OrderManagePage/OrderManage";
import SalesManage from "./components/Desktop/SalesManagePage/SalesManage";
import Phone from "./components/Mobile/Phone";
import LogoutTopBar from "./components/Desktop/commons/TopBar/LogoutTopBar";
import TopBar from "./components/Desktop/commons/TopBar/TopBar";
function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인 화면 */}
        <Route
          path="/"
          element={
            <LogoutTopBar>
              <Login />
            </LogoutTopBar>
          }
        />
        {/* 회원 가입 화면 */}
        <Route
          path="/Register"
          element={
            <LogoutTopBar>
              <Register />
            </LogoutTopBar>
          }
        />
        {/* 로그인 후 첫화면 */}
        <Route
          path="/Main"
          element={
            <TopBar>
              <MainPage />
            </TopBar>
          }
        />
        {/* 주문관리 */}
        <Route
          path="/OrderManage"
          element={
            <TopBar>
              <OrderManage />
            </TopBar>
          }
        />
        {/* 메뉴 관리 */}
        <Route
          path="/RecipeManage"
          element={
            <TopBar>
              <RecipeManage />
            </TopBar>
          }
        />
        {/* 매출 관리 */}
        <Route
          path="/SalesManage"
          element={
            <TopBar>
              <SalesManage />
            </TopBar>
          }
        />
        {/* 마이페이지 (정보 수정용) */}
        <Route
          path="/MyPage"
          element={
            <TopBar>
              <MyPage />
            </TopBar>
          }
        />

        {/* 폰화면 */}
        <Route path="/Phone" element={<Phone />} />
        {/* 부엌에서 볼 화면 */}
        <Route path="/KitchenPage" element={<KitchenPage />} />
        {/* 주문 화면 */}
        <Route path="/OrderPage1" element={<OrderPage1 />} />
        <Route path="/OrderPage2" element={<OrderPage2 />} />
      </Routes>
    </Router>
  );
}

export default App;
