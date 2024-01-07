import { Button, CircularProgress } from "@mui/material";
import React from "react";

const AppButton = ({ isLoading, label, onClick, disabled }) => {
  return (
    <Button onClick={onClick} variant="contained" fullWidth color="primary" disabled={isLoading || disabled}>
      {label} {isLoading && <CircularProgress color="inherit" size={16} sx={{ml:2}}/>}
    </Button>
  );
};
export default AppButton;
