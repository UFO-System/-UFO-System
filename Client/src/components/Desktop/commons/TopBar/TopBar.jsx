import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AppBar, Divider } from "@mui/material";
import "./css/TopBar.css";
import { useState } from "react";
import UFO from "../../../../assets/UFO.png";
const menuLists = ["주문 관리", "메뉴 관리", "매출 관리"];
const pages = ["OrderManage", "RecipeManage", "SalesManage"];
function TopBar({ children }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [, , removeCookie] = useCookies(["id"]);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleLogout = () => {
    // 전달된 쿠키 삭제
    removeCookie("user"); // 쿠키를 삭제
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl" sx={{ margin: "0" }}>
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <img src={UFO} style={{ width: "43px", height: "43px" }} />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              UFO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {menuLists.map((menuList, idx) => (
                  <MenuItem
                    key={menuList}
                    onClick={() => {
                      navigate("/" + pages[idx]);
                    }}
                  >
                    <Typography textAlign="center">{menuList}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
              <img src={UFO} style={{ width: "43px", height: "43px" }} />
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              UFO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {menuLists.map((menuList, idx) => (
                <>
                  <Button
                    key={menuList + "a"}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/" + pages[idx]);
                    }}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      marginLeft: "20px",
                    }}
                  >
                    {menuList}
                  </Button>
                  <Divider orientation="vertical" sx={{ display: "inline" }} />
                </>
              ))}
            </Box>
            <Box sx={{ float: "right" }}>
              <Typography
                sx={{
                  my: 2,
                  marginRight: "10px",
                  display: "inline-block",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                관리자:김호진
              </Typography>
              <Button
                onClick={() => navigate("/Phone")}
                sx={{
                  my: 2,
                  color: "white",
                  display: "inline",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
              >
                모바일
              </Button>
              <Divider orientation="vertical" sx={{ display: "inline" }} />
              <Button
                onClick={() => navigate("/MyPage")}
                sx={{
                  my: 2,
                  color: "white",
                  display: "inline",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
              >
                마이페이지
              </Button>
              <Divider orientation="vertical" sx={{ display: "inline" }} />
              <Button
                onClick={() => handleLogout()}
                sx={{
                  my: 2,
                  color: "white",
                  display: "inline",
                  marginLeft: "10px",
                }}
              >
                로그아웃
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{ paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}
      >
        {children}
      </Box>
    </>
  );
}
export default TopBar;
