import { useState, useContext, } from "react";
import { MenuItem, Stack, Button, TextField, useTheme } from "@mui/material";
import { getActivities, getCategories, getServices } from "./activities";
import { JobContext } from "../../context/JobContext";

const ActivitySelector = ({ activeActivityIds, isDisabled}) => {
    const [activityId, setActivityId]  = useState("");
    const [category, setCategory] = useState("");
    const [service, setService] = useState("");
    const [isDirty, setIsDirty] = useState(false);
    const [services, setServicies] = useState([]);
    const [activities, setActivities] = useState([]);
    const { addJob } = useContext(JobContext);
    const theme = useTheme();

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setServicies(getServices(event.target.value, activeActivityIds));
        setIsDirty(true);
        setService("");
        setActivities([]);
        setActivityId("");
    };

    const handleServiceChange = (event) => {
        setService(event.target.value);
        const activities = getActivities(category, event.target.value, activeActivityIds);
        setActivities(activities);
        setActivityId("");
        setIsDirty(true);
    };

    const handleActiveChandle = (event) => {
        setActivityId(event.target.value);
        setIsDirty(true);
    };

    const handleAddJob = () => {
        addJob(activityId);
        setActivityId("");
        setIsDirty(false);
    };

    return (
        <div style={{ position: "relative" }}>
            <Stack spacing={2}>
                <TextField
                    label="Category"
                    select
                    inputProps={{ "data-testid": "select-category" }}
                    value={category}
                    onChange={handleCategoryChange}
                    style={{ width: 100% }}
                    disabled={isDisabled}
                    className={isDisabled ? "disable-category" : ""}
                >
                    {getCategories(activeActivityIds).map((key) => (
                        <MenuItem data-testid={`select-option-${key}`} key={key} value={key}>
                            {key}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Service"
                    select
                    inputProps={{ "data-testid": "select-service" }}
                    value={service}
                    onChange={handleServiceChange}
                    style={{ width: 100% }}
                    disabled={isDisabled}
                >
                    {service.map((key) => (
                        <MenuItem key={key} value={key}>
                            {key}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Activity"
                    select
                    inputProps={{ "data-testid": "select-activity" }}
                    value={activityId}
                    onChange={handleCategoryChange}
                    style={{ width: 100% }}
                    disabled={isDisabled}
                >
                    {activities.map((key) => (
                        <MenuItem key={i} value={activityId.id}>
                            {activity.activity}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    data-testid="button-add-job"
                    disabled={isDisabled}
                    onClick={handleAddJob}
                    variant="contained"
                >
                    ADD TO REQUEST
                </Button>
                {isDisabled && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: 100%,
                            height: 100%,
                            background: theme.palette.mode === 'dark' ? "rgba(226, 0, 116, 0.4" : "rgba(0, 0, 0, 0.25)",
                            display:"flex",
                            justifyContent: "center",
                            alignItems: "center";
                            zIndex: 1,
                            marginTop: 0,
                        }}
                    >
                        <span style={{ color: theme.palette.mode === "dark" ? "#fff" : "#000", fontWeight: "bold" }}>
                            All service activities are disabled
                        </span>
                    </div>
                )}
            </Stack>
        </div>
    )
};

export default ActivitySelector;