import React, { Children } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button, 
    CircularProgress,
} from "@mui/material";

const ConfirmDialog = ({
    open,
    title,
    content,
    onConfirm,
    onCancel,
    isBusy,
    actionButtonText,
    Children,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                width: "100%",
                minWidth: "xs",
                maxWidth: "xs",
            }}
            PaperProps={{
                sx: {
                    width: "100%",
                    minWidth: "xs",
                    maxWidth: "xs",
                },
            }}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
                {Children}
            </DialogContent>
            <DialogActions>
                {isBusy && <CircularProgress color="secondary" size={25} />}
                <Button disabled={isBusy} onClick={onCancel} color="primary">
                    Cancel
                </Button>
                <Button
                    disabled={isBusy}
                    onClick={onConfirm}
                    color="secondary"
                    autoFocus
                >
                    {actionButtonText ? actionButtonText : "Confirm"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;