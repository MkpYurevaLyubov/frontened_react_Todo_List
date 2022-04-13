import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText
} from "@mui/material";

const ResponsiveDialog = ({ isOpen, handleClose, text, onClickYes }) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickYes}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResponsiveDialog;
