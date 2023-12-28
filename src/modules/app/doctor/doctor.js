import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/constant";
import { useTranslation } from "react-i18next";

function Doctor() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box sx={style.container}>
      <Typography variant="h2">{t("page_name")}</Typography>
      <Typography variant="h4">react-mui-kickstarter</Typography>
      <Typography variant="h5">
        Setup is ready for React, Eslint, Mui, i18next, Redux, Navigation
      </Typography>
      <Typography variant="h6">
        Start to edit app from{" "}
        <i>
          <b>src/modules/app/playground</b>
        </i>
      </Typography>
      <Button variant="contained" onClick={() => navigate(path.HOME_PAGE)}>
        Go to dashboard
      </Button>
    </Box>
  );
}
const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    flexDirection: "column",
  },
};
export default Doctor;
