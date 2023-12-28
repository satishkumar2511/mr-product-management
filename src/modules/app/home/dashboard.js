import React from "react";
import { Box, Typography } from "@mui/material";
import FullFeaturedCrudGrid from "../../../components/grid";
import DataGridDemo from "../../../components/grid/DataGridDemo";

function Dashboard() {
  return (
    <>
      <Box sx={style.container}>
        <Typography component={"div"} sx={{ color: "text.primary" }}>
          Data-Grid Demo
        </Typography>
        <DataGridDemo />
        <Typography sx={{ mt: 2, color: "text.primary" }}>
          Full Featured Crud Grid
        </Typography>
        <FullFeaturedCrudGrid />
      </Box>
    </>
  );
}
const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    //alignItems: "center",
    //minHeight: "99vh",
    flexDirection: "column",
    // overflow: "scroll",
  },
};
export default Dashboard;
