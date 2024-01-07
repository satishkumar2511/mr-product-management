import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import AppButton from "../../../components/Button";

function Login({ onSubmit, isLoading }) {
  const [user, setUser] = React.useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value, // Update the specific property using dynamic key
    }));
  };
  return (
    <>
      <Box sx={style.container}>
        <Box sx={style.formContainer}>
          <Typography variant="h4">LOGIN</Typography>
          <Typography sx={{ mb: 2 }}>Welcome Back:)</Typography>

          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={user?.email || ""}
            sx={style.inputField}
            onChange={handleChange}
          />

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            value={user?.password || ""}
            sx={style.inputField}
            onChange={handleChange}
          />

          {/* <Button onClick={() => onSubmit(user)} variant="contained" fullWidth>
            login
          </Button> */}
          <AppButton
            label={"Login"}
            isLoading={isLoading}
            onClick={() => onSubmit(user)}
          />
        </Box>
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
  formContainer: {
    maxWidth: "410px",
    spacing: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  inputField: {
    mb: 2,
  },
};
export default Login;
