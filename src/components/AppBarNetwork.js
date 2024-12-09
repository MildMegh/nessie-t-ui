import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useMsal } from "@azure/msal-react";

import { ReactComponent as Logo } from "../assets/nessie-logo.svg";

const pages = [
    {
    title: "Service Request",
    nav: "service-request",
  },
  { title: "Request Templates", nav: "templates" },
  { title: "Request Log", nav: "request-log" },
  { title: "Regenerate Inventory", nav: "regenerate-inventory" },
];

const AppBarNetwork = () => {
  const location = useLocation();
  const { accounts } = useMsal();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const isAdmin = accounts[0]?.idTokenClaims?.groups?.includes("nessie_admin");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  const handleColorForNav = (nav) => {
    if (location?.pathname && location.pathname.includes(nav)) {
      return "secondary";
    }
    if (location.pathname === "/" && nav === "service-request") {
      return "secondary";
    }

    return "primary";
  };
  
  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="false">
          <Toolbar disableGutters></Toolbar>
          <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <Logo fill="#fff" width="100px" />
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
                {pages.map((page, i) => (
                  <MenuItem
                    key={i}
                    onClick={handleCloseNavMenu}
                    component={RouterLink}
                    to={page.nav}
                  >
                    <Typography sx={{ textTransform: "none" }}>
                      {page.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              NESSIE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, i) => (
                <Button
                  key={i}
                  component={RouterLink}
                  to={page.nav}
                  onClick={handleCloseNavMenu}
                  variant="contained"
                  color={handleColorForNav(page.nav)}
                  sx={{ my: 2, display: "block", textTransform: "none" }}
                >
                    {page.title}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{ bgcolor: "secondary.main" }}
                    alt={accounts[0]?.name}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  name="userprofile"
                  key="userprofile"
                  component={RouterLink}
                  to="userprofile"
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">User Profile</Typography>
                </MenuItem>
                {isAdmin && (
                  <MenuItem
                    name="admin"
                    key="admin"
                    component={RouterLink}
                    to="admin"
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">Admin Dashboard</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export { AppBarNetwork };
