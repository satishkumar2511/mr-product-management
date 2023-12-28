import React from "react";
import { Box, Button } from "@mui/material";

function Login({ onSubmit }) {
  return (
    <>
      <Box sx={style.container}>
        <Button
          onClick={() => onSubmit({ email: "anc", password: "123" })}
          variant="contained"
        >
          Click to login
        </Button>
      </Box>
    </>
  );
}
const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "99vh",
    flexDirection: "column",
  },
};
export default Login;
