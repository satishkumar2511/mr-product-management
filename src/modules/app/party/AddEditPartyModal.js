import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

export const style = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    // border: "2px solid #000",
    boxShadow: 24,
  },
  header: {
    display: "flex",
    height: 50,
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    p: 4,
    "& h2": {
      fontWeight: "bold",
    },
  },
  body: {
    p: 3,
    // padding: "10px 0px ",
  },
  inputField: {
    mb: 2,
  },
  footer: {
    p: 3,
    pt: 0,
    float: "right",
  },
};

export default function AddEditPartyModal({
  open,
  handleClose,
  handleSave,
  initData,
}) {
  const [partyDetails, setMrDetails] = React.useState(initData);

  React.useEffect(() => {
    setMrDetails(initData);
  }, [initData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMrDetails((prevState) => ({
      ...prevState,
      [name]: value, // Update the specific property using dynamic key
    }));
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style.container}>
        <Box sx={style.header}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            {`${initData ? "Edit" : "Add"} Party`}
          </Typography>
        </Box>
        <Box sx={style.body}>
          <TextField
            id="outlined-basic"
            label="Party Name"
            variant="outlined"
            fullWidth
            name="party_name"
            value={partyDetails?.party_name || ""}
            sx={style.inputField}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Party Address"
            variant="outlined"
            fullWidth
            name="party_address"
            value={partyDetails?.party_address || ""}
            sx={style.inputField}
            onChange={handleChange}
          />
        </Box>

        <Box sx={style.footer}>
          <Button variant="text" sx={{ mr: 2 }} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => handleSave(partyDetails)}>
            save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
