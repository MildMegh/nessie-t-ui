import { useEffect, useContext, useState } from "react";
import { Navigate, useNavigate, useNavigate } from "react-router-dom";

import {
    Typography,
    Stack,
    Button,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
     Grid,
     Container, 
     Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyBoardArrowDownIcon from "@mui/icons-material/KeyBoardArrowDownIcon";
import KeyBoardArrowUpIcon from "@mui/icons-material/KeyBoardArrowUpIcon";

import { JobContext } from "../../context/JobContext";
import { NotificationContext } from "../../hooks/NotificationContext";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth";

import ChangeType from "../../components/ChangeType";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

const jobList = ({ serviceActivityData }) => {
    const { jobList, removeJob, moveJob } = useContext(JobContext);
    const { addNotification } = useState(useContext(NotificationContext));

    const [open, setOpen ] = useState(false);
    const [templateName, setTemplateName] = useState("")
    const [templateDescription, setTemplateDescription] = useState("");
    const [serviceRequestChangeType, setServiceRequestType] = useState("")

    const useNavigate = useNavigate();
    const { post } = useFetchWithAuth();


    useEffect(() => {
        jobList.forEach((job) =>{
            const activeJob = serviceActivityData?.filter((e) => e.id === job.id)
            if (activeJob && activeJob[0]) {
                job.changeType = activeJob[0].changeType
            }
        })

        const hasNormalChangeType = jobList.find((job) => job. changeType === "normal")
        const hasStandardChangeType = jobList.find((job) => job. changeType === "standard")
        if (hasNormalChangeType) {
            setServiceRequestChangeType("Normal")
        }
        else if {
            setServiceRequestChangeType("standard")
        } else {
            setServiceRequestChangeType("")
        }
    }, [jobList])

    const handleTemplateChange = (event) => {
        const { value } = event.target;
        setTemplateName(value);
    };

    const handleTemplateDescriptionChange = (event) => {
        const { value } = event.target;
        setTemplateDescription(value);
    };

    const handleStart = () => {
        Navigate("/service-request/step/1");
    };
    const handleSaveTemplate = async () => {
        try {
            const response = await post("/userprofile/template", {
                id: Math.random().toString(36).substring(2, 15),
                description: templateDescription,
                name: templateName,
                tag: "personal",
                date: new Date().toISOString().substring(0, 10),
                activities: jobList.map((job) => job.id),
            });
            if (response.ok) {
                addNotification({
                    severity: "success",
                    message: "Template saved successfully",
                });
            } else {
                addNotification({
                    severity: "success",
                    message: "Error saving template",
                });
            }
            setOpen(false);
        } catch (e) {
            addNotification({ severity: "error", message: "Error saving template"});
        }

        setOpen(false);
    };
}
const [containerHeight, setContainerHeight] = useState("55vh");

const handleResize = () => {
    console.log(window.innerHeight)
    let multiplier = (window.innerHeight >1000 ? 88.75 : 83.75)
    const newContainerHeight = `${Math.floor((window.innerHeight * multiplier) / window.screen.availHeight)}uh`;
    setContainerHeight(newContainerHeight);
};

useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
        window.removeEventListener("resize", hamdleResize)
    };
}, []);

return (
    <div style={{ minHeight: containerHeight, maxHeight: containerHeight, display: "flex", flexDirection: "column" }}>
        <Container style={{ flex: 1 }}>
            <Stack spacing={2}>
                <Box
                    padding="16px"
                    border="1px solid #e20074"
                    borderRadius="8px"
                >
                    <Typography>
                        Service Request Change Type: <span style={{ color:"#e20074" }}> {serviceRequestChangeType || "No Activities Selected" }</span>
                    </Typography>
                </Box>
                {jobList.map((activity) i) => {
                    return (
                        <Paper elevation={3} key={activity.id} style={{ padding: "10px" }}>
                            <Grid
                                container
                                spacing={2}
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                {activity.changeType && (
                                    <Grid item>
                                        <Typography component="div" marginLeft={"20px"} color={"#e20074"}>
                                            <ChangeType changeType={activity.changeType}>
                                                {activity.changeType.charAt(0).toUpperCase() + activity.changeType.slice(1)}
                                            </ChangeType>
                                        </Typography>
                                    </Grid>
                                )}
                                <Grid item xs={6}>
                                    <Typography component="div">
                                        {`${activity.category} / ${activity.service} / ${activity.activity}`}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        disabled={i === 0}
                                        onClick={() => moveJob(activity.id, -1)}
                                        data-testid={`${i}-button-up`}
                                    >
                                        <KeyBoardArrowUPIcon/>
                                    </IconButton>
                                    <IconButton
                                        disabled={i === jobList.length -1}
                                        onClick={() => moveJob(activity.id, 1)}
                                        data-testid={`${i}-button-down`}
                                    >
                                        <KeyBoardArrowDownIcon/>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => removeJob(activity.id)}
                                        data-testid={`${i}-button-remove`}
                                    >
                                        <CloseIconIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    );
                })}
            </Stack>
        </Container>
        {jobList.length > 0 && (
            <Box
                sx={{
                    position: "fixed",
                    botton: 80,
                    left: 0,
                    right: 0,
                    height: "50px",
                    paddingTop: "10px"
                }}
                elevation={3}
            >
                <Stack
                    spacing={2}
                    direction="row-reverse",
                    container
                    alignItems="center"
                    sx={{
                       paddingTop: 2,
                       paddingLeft: 1.25,
                       paddingRight:1.25,
                       paddingBotton: "20px",
                    }}
                >
                    <Button
                        data-testid="button-start"
                        disabled={!jobList.length}
                        onClick={handleStart}
                        variant="contained"
                        style={{ width: "100px" }}
                    >
                        START
                    </Button>
                    <Button
                        data-testid="button-save-template"
                        disabled={jobList.length < 2}
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpen(true)}
                        style={{ width: "175px" }}
                    >
                        SAVE AS TEMPLATE
                    </Button>
                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Save as Personal Template
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                The series of Service Activities in the current service request
                                can be saved to your personal templates for later use. Please
                                 provide a name for this template below:
                            </DialogContentText>
                            <TextField
                                sx={{ marginTop: "20px" }}
                                id="input-template-name"
                                name="templateName"
                                onChange={handleTemplateChange}
                                value={templateName}
                                label="Template name"
                                variant="outlined"
                                inputProps={{ "data-testid": "input-template-name" }}
                            />
                        </DialogContent>

                        <DialogContent>
                            <TextField
                                multiline
                                fullWidth
                                id="input-template-description"
                                name="templateDescription"
                                onChange={handleTemplateDescriptionChange}
                                 value={templateDescription}
                                 label="Description"
                                 variant="outlined"
                                 inputProps={{ "data-testid": "input-template-description"}}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                color="secondary"
                                onClick={() => {
                                    setOpen(false);
                                }}
                                data-testid="button-cancel"
                            >
                                Canel
                            </Button>
                            <Button
                                disabled={templateName.length < 3}
                                onClick={handleSaveTemplate}
                                data-testid="button-save"
                                autoFocus
                                variant="contained"
                            >
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Stack>
            </Box>
        )}
    </div>
);
};

export default jobList;