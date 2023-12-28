import { Box, Drawer } from "@mui/material";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import AppHeader from "./appHeader";
import AppMenu from "./appMenu";
import { useGetUserDetailsQuery } from "../../store/api/auth";

const MainTemplateContainer = ({ children, toggleTheme }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { data } = useGetUserDetailsQuery({});
  console.log("data: ", data);

  return (
    <Box sx={{}}>
      <AppHeader
        toggleTheme={toggleTheme}
        toggleDrawer={() => setIsOpenDrawer(!isOpenDrawer)}
      />
      <React.Fragment key={"left"}>
        <Drawer
          anchor={"left"}
          open={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
        >
          <AppMenu
            anchor={"left"}
            toggleDrawer={() => setIsOpenDrawer(false)}
          />
        </Drawer>
        <Box sx={sxStyles.container}>{children}</Box>
      </React.Fragment>
    </Box>
  );
};
export default withTranslation()(MainTemplateContainer);

const sxStyles = {
  container: {
    p: 2,
    // pt: 10,
    bgcolor: "background.paper",
    minHeight: "calc(100vh - 96px)",
  },
};
