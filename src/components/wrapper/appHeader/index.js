import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { GetLanguage, SetLanguage, userLogout, GetLoggedInUserDetails } from "../../../utils/helper";
import i18n from "../../../i18n";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { path } from "../../../utils/constant";
import { drawerWidth } from "../../../utils/config";


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppHeader = ({ toggleTheme, toggleDrawer, open }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loggedInUser, setloggedInUser] = React.useState({});

  
  React.useEffect(() => {
    setloggedInUser(GetLoggedInUserDetails())
  }, [loggedInUser])

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

  // console.log("loggedInUser")
  //console.log(loggedInUser)

  return (
    // <Box sx={{ flexGrow: 1 }}>
    loggedInUser && <AppBar position="fixed" color="primary" enableColorOnDark open={open}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography
              variant="h6"
              component="a"
              href={path.PLAYGROUND_PAGE}
              sx={{ flexGrow: 1 }}
            >
              app/Logo
            </Typography> */}
        </Box>

        <Box>
          {/* <Select
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
          </Select> */}

Welcome, {loggedInUser.user_first_name} <IconButton
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
          <MenuItem onClick={Logout}>{loggedInUser.user_first_name} {loggedInUser.user_last_name}</MenuItem>
          <MenuItem onClick={Logout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
    // </Box>
  );
};
export default AppHeader;
