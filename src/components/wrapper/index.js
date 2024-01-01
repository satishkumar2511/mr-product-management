import { Box, CssBaseline, Divider, IconButton } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AppHeader from "./appHeader";
import AppMenu from "./appMenu";
import { useGetUserDetailsQuery } from "../../store/api/auth";
import { drawerWidth } from "../../utils/config";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MainTemplateContainer = ({ children, toggleTheme }) => {
  const theme = useTheme();

  const [isOpenDrawer, setIsOpenDrawer] = useState(true);
  const { data } = useGetUserDetailsQuery({});
  console.log("data: ", data);

  const handleDrawerClose = () => {
    setIsOpenDrawer(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <React.Fragment key={"left"}> */}
        <AppHeader
          toggleTheme={toggleTheme}
          toggleDrawer={() => setIsOpenDrawer(!isOpenDrawer)}
          open={isOpenDrawer}
        />
        <Drawer
          variant="permanent"
          anchor={"left"}
          open={isOpenDrawer}
          //onClose={handleDrawerClose}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <AppMenu
            anchor={"left"}
           // toggleDrawer={() => setIsOpenDrawer(false)}
            open={isOpenDrawer}
          />
        </Drawer>
        <Box sx={sxStyles.container} component="main">
          {children}
        </Box>
      {/* </React.Fragment> */}
    </Box>
  );
};
export default withTranslation()(MainTemplateContainer);

const sxStyles = {
  container: {
    p: 2,
    flexGrow: 1,
    pt: 10,
    bgcolor: "background.paper",
    minHeight: "calc(100vh - 96px)",
  },
};
