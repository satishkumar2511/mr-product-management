import React from "react";
import { Box, Button, TextField } from "@mui/material";

function Login({ onSubmit }) {
  const [user, setUser] = React.useState({email:'', password : ''});

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
            onChange={handleChange}
          />
        <Button
          onClick={() => onSubmit(user)}
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
