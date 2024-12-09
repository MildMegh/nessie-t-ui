import { useState } from "react";

import { MenuItem, Stack, Button, TextField } from "@mui/material";

import {
    getActivities,
    getCategories,
    getServices,
    getAllActivityIds,
} from "../service-request/activities";

const RequestPermissions = () => {
    const activeActivityIds = getAllActivityIds();

    const [activity, setActivity] = useState("");
    const [category, setCategory] = useState("");
    const [service, setService] = useState("");

    const [service, setService] = useState([]);
    const [activities, setActivties] = useState([]);
    const [categories] = useState(getCategories(activeActivityIds));

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setServices(getServices(event.target.value, activeActivityIds));

        setService("");
        setActivties([]);
        setActivity("");
    };

    const handleServiceChange = (event) => {
        setService(event.target.value);
        setActivities(
            getActivities(category, event.target.value, activeActivityIds)
        );
        setActivity("");
    };
    const handleActivityChange = (event) => {
        setActivity(event.target.value);
    };

    const handleRequestPermission = () => {
        window.open(
            "https://compass.t-mobile.com/compass?id=sc_cat_item&table=sc_cat_item&sys_id=5724a9836f077100fd9277f16a3ee489"
        );
    };

    return (
        <div>
            <div>Access Guidelines</div>
            <div style={{ fontSize: "12px", marginBottom: "10px", color: "red" }}>
            Please read the instruction below
            </div>
            <div style={{ fontSize: "14px", marginBottom: "10px" }}>
                To gain access to a specific network service, use the drop down menu
                below to identify the appropriate security group, then click the {" "}
                <span style={{ fontWeight: "bold"}}>request access</span> button and 
                submit for group access. These groups are created on an as-needed basis,
                if the security group is not available in service now, please reach out
                to us on Teams.
            </div>
            <div style={{ fontSize: "14px", marginBottom: "10px"}}>
                To gain access to the entire network setServices catalog, please reach out to us on Teams.
            </div>
            <div style={{ fontSize: "14px", marginBottom: "10px"}}>
                Team suport channel:{" "}
                <a href="https://teams.microsoft.com/1/channel/19%3AfwQuY4LRBrXoHW_CvJMBx_QnA0Is5IMLUp1zG6s_UbA1%40thread.tacv2/APTX%20Nessie%20and%20Nessie%20Support?groupId=a3acd457-a8ff-44ac-b68a-6c8d567e9b4e&tenantId=be0f980b-dd99-4b19-bd7b-bc71a09b026c&ngc=true&allowXTenantAccess=true">
                <span>APTX and Nessie Support</span>
                </a>
                .
            </div>
            <div>Request Access</div>
            <div style={{ fontSize: "12px", marginBottom: "10px"}}>
                Request access to additional service activities
            </div>
            <Stack spacing={2}>
                <TextField
                    label="Category"
                    select
                    inputProps={{ "data-testid": "select-category" }}
                    value={category}
                    onChange={handleCategoryChange}
                    style={{ width: "100%" }}
                    >
                        {categories.map((key) => {
                            return (
                                <MenuItem
                                    data-testid={`select-option-${key}`}
                                    key={key}
                                    value={key}
                                >
                                    {key}
                                </MenuItem>
                            );
                        })}
                    </TextField>
                    <TextField
                    label="Service"
                    select
                    inputProps={{ "data-testid": "select-service" }}
                    value={service}
                    onChange={handleServiceChange}
                    style={{ width: "100%" }}
                    >
                        {service.map((key) => (
                            <MenuItem key={key} value={key}>
                                {key}
                            </MenuItem>    
                        ))}    
                    </TextField>
                    <TextField
                    label="Activtiy"
                    select
                    inputProps={{ "data-testid": "select-activity" }}
                    value={activity}
                    onChange={handleActivityChange}
                    style={{ width: "100%" }}
                    >
                        {activity.map((activity, i)=> {
                           <MenuItem key={i} value={activity.id}>
                            {activity.activity}
                           </MenuItem>
                        })}
                    </TextField>
                    <TextField
                    label="SecurityvGroup"
                    name="securityGroup"
                    inputProps={{ "data-testid": "input-securityGroup" }}
                    value={activity}
                    style={{ width: "100%" }}
                    variant="outlined"
                    disabled={true}
                    >
                        {activities.map((activity, i) => (
                            <MenuItem key={i} value={activity.id}>
                                {activity.activity}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        data-tested="button-request-permission"
                        onClick={handleRequestPermission}
                        variant="contained"
                    >
                        { " " }
                        Request Access
                    </Button>
            </Stack>
        </div>
    );
};

export default RequestPermissions;