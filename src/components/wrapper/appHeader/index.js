import React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { GetLanguage, SetLanguage, userLogout } from "../../../utils/helper";
import i18n from "../../../i18n";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { path } from "../../../utils/constant";

const AppHeader = ({ toggleTheme, toggleDrawer }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const Logout = () => {
    userLogout();
  };

  const changeLanguage = (e) => {
    const { value } = e.target;

    SetLanguage(dispatch, value);
    i18n.changeLanguage(value);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const lang = GetLanguage();

  return (
    // <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="primary" enableColorOnDark>
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
          <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="a"
              href={path.PLAYGROUND_PAGE}
              sx={{ flexGrow: 1 }}
            >
              app/Logo
            </Typography>
          </Box>

          <Box>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lang}
              label="Language"
              onChange={changeLanguage}
            >
              <MenuItem value={"en"}>
                <Typography>En</Typography>
              </MenuItem>
              <MenuItem value={"ja"}>Ja</MenuItem>
            </Select>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
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
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                toggleTheme();
                handleClose();
              }}
            >
              Theme toggle
            </MenuItem>
            <MenuItem onClick={Logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    // </Box>
  );
};
export default AppHeader;
