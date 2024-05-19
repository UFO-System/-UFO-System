import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { AppBar } from "@mui/material";
import "./css/TopBar.css";
import Icon from "@mdi/react";
import { mdiUfoOutline } from "@mdi/js";
function LogoutTopBar({ children }) {
  return (
    <div className="notLoginTopBar">
      <AppBar position="static">
        <Container maxWidth="xl" sx={{ margin: "0" }}>
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <Icon path={mdiUfoOutline} size={1.8} />
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
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
              <Icon path={mdiUfoOutline} size={1.8} />
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
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{ paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}
      >
        {children}
      </Box>
    </div>
  );
}
export default LogoutTopBar;
