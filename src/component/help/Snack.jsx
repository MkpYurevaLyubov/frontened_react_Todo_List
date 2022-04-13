import React from "react";
import { Alert, Snackbar } from "@mui/material";

const Snack = ({ isOpen, handleClose, text}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isOpen}
      onClose={handleClose}
      autoHideDuration={2000}
    >
      <Alert
        severity="error"
        variant={"filled"}
        sx={{ width: '250px' }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
