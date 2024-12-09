import React, { Fragment, useContext, useState } from "react";

import {
    IconButton,
    Stack,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/material/Close";
import { JobContext } from "../../../context/JobContext";
import RemoveIcon from "@mui/material/Remove";
import AddIcon from "@mui/material/Add";
import ContentCopyIcon from "@mui/material/ContentCopy";
import SkipPreviousIcon from "@mui/material/SkipPrevious";
import SkipNextIcon from "@mui/material/SkipNext";
import PreviewIcon from "@mui/material/Preview";

const DisPlayPreview = (dataObect) => {
    const filteredKeys = Object.keys(dataObect).filter(
        (key) => !["id", "activityId", "rowId"].includes(key)
    );

    return (
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 16px" }}>
            {filteredKeys.map((key) => (
                <Fragment key={key}>
                    <span style={{ fontWeight: "bold"}}>{key}:</span>
                    <span>{dataObect[key]}</span>
                </Fragment>
            ))}
        </div>
    ); 
};

const AddRemoveCopy = ({ activityId, rowId, showPreview }) => {
    const {
        copyJobParamsRow,
        removeJobparamsRow,
        addJobParamsRow,
        getJobParams,
    } = useContext(JobContext);
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState("");
    const [previewIndex, setPreviewIndex] = useState(0);

    const paramsLength = getJobParams(activityId).length;

    const handleClose = () => {
        setOpen(false);
    };

    const handleCopy = (e, rowId) => {
        e.stopPropogation();
        copyJobParamsRow(activityId, rowId);
    };

    const handleRemove = (e, rowId) => {
        e.stopPropogation();
        removeJobparamsRow(activityId, rowId);
    };

    const handleAdd = (e, rowId) => {
        e.stopPropogation();
        addJobParamsRow(activityId, rowId);
    };
    const handlePreview = (e, rowId) => {
        e.stopPropogation();
        let params = getJobParams(activityId);
        let row = params.find((row) => row.rowId === rowId);
        setPreviewIndex(params.indexOf(row));
        setPreview(row);
        setOpen(true);
    };
    const handlePreviousNext = (e, direction) = {
        e.stopPropogation();
        let params = getJobParams(activityId);
        let nextIndex = previewIndex + direction;
        if (nextIndex < 0) nextIndext = params.length - 1;
        if (nextIndex > params.length - 1) nextIndex = 0;
        setPreviewIndex(nextIndex);
        let nextRow = params[nextIndex];
        setPreview(nextRow);
    };

    return ( 
        <Stack
            sx={{ paddingTop: "5px", paddingLeft: "5px" }}
            alignItems="flex-start"
            spacing={0}
            direction="row"
        >
            <Tooltip title="Add Row" arrow>
                <span>
                    <IconButton
                        color="secondary"
                        data-testid={`${rowId}-button-add`}
                        aria-label="add"
                        onClick={(e) => handleAdd(e, rowId)}
                    >
                        <AddIcon/>
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Delete Row" arrow>
                <span>
                    <IconButton
                        disabled={paramsLength < 2}
                        color="secondary"
                        data-testid={`${rowId}-button-remove`}
                        aria-label="remove"
                        onClick={(e) => handleRemomve(e, rowId)}
                    >
                        <AddIcon/>
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Duplicate Row" arrow>
                <span>
                    <IconButton
                        color="secondary"
                        data-testid={`${rowId}-button-copy`}
                        aria-label="remove"
                        onClick={(e) => handleCopy(e, rowId)}
                    >
                        <AddIcon/>
                    </IconButton>
                    </span>
            </Tooltip>
            {showPreview && (
                <Tooltip title="Preview Row Data" arrow>
                <span>
                    <IconButton
                        color="secondary"
                        data-testid={`${rowId}-button-preview`}
                        aria-label="preview"
                        onClick={(e) => handleCopy(e, rowId)}
                    >
                        <AddIcon/>
                    </IconButton>
                    </span>
            </Tooltip>

            )}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    Data Preview - Row {previewIndex + 1}
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpen(false)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {DisPlayPreview(preview)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <IconButton
                        color="secondary"
                        data-testid={`${rowId}-button-copy`}
                        aria-label="previous"
                        onClick={(e) => handlePreviousNext(e, -1)}
                    >
                        <SkipPreviousIcon/>
                    </IconButton>

                    <IconButton
                        color="secondary"
                        data-testid={`${rowId}-button-copy`}
                        aria-label="previous"
                        onClick={(e) => handlePreviousNext(e, -1)}
                    >
                        <SkipNextIcon/>
                    </IconButton>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

export default AddRemoveCopy;

