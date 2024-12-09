import React from "react";
import { MenuItem, Stack, TextField } from "@mui/material";

const ServiceActivityAddNew = ({ serviceActivity, setServiceAcitivty }) => {
    const handleTextChange = (event) => {
        console.log(event.target.value);
        setServiceAcitivty({ ...serviceActivity, [event.target.name]: event.target.value});
    };

    return (
        <Stack padding={"5px"} spacing={2}>
            <TextField
                label="ID"
                name="id"
                value={serviceActivity.id}
                onChange={handleTextChange}
                placeholder="nessie_ns_vlanAdd"
            ></TextField>
            <TextField
                select
                label="Category"
                name="categoryName"
                value={serviceActivity.categoryName}
                onChange={handleTextChange}
            >
                <MenuItem value="IP">IP</MenuItem>
                <MenuItem value="Security">Security</MenuItem>
            </TextField>
            <TextField
                label="Service"
                name="ServiceName"
                value={serviceActivity.serviceName}
                onChange={handleTextChange}
                placeholder="Vlan"
            ></TextField>
            <TextField 
                label="Activity"
                name="name"
                value={serviceActivity.name}
                onChange={handleTextChange}
                placeholder="Vlan Add"
            ></TextField>
            <TextField
                select
                label="Change Type"
                name="changeType"
                value={serviceActivity.changeType}
                onChange={handleTextChange}
            >
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="standard">Standard</MenuItem>
            </TextField>
        </Stack>
    );
};

export default ServiceActivityAddNew;