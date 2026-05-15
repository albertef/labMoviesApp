import { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { useAuthContext } from "../contexts/useAuthContext";

const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const auth = useAuthContext();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "TV", path: "/tv" },
    { label: "Search", path: "/search" },
    { label: "Fantasy", path: "/fantasy-movie" },
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
  };

  const handleAuthAction = () => {
    if (auth.isAuthenticated) {
      auth.logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const authButtonLabel = auth.isAuthenticated ? "Logout" : "Login";

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="warning">
        <Toolbar>
          <MovieFilterIcon sx={{ mr: 1 }} />
          <Typography variant="h5" sx={styles.title}>
            MOVIE APP
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All about Movies!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => {
                      setAnchorEl(null);
                      handleMenuSelect(opt.path);
                    }}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    handleAuthAction();
                  }}
                >
                  {authButtonLabel}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}
              {auth.user && (
                <Typography variant="body2" sx={{ ml: 2, mr: 1 }}>
                  {auth.user.email || auth.user.username || auth.user.name}
                </Typography>
              )}
              <Button color="inherit" onClick={handleAuthAction}>
                {authButtonLabel}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
