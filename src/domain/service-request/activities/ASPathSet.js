import React, { useContext, useState } from "react";

import {
    Stack,
    TextField,
    MenuItem,
    Typography,
    IconButton,
} from "@mui/material";
import { JobContext } from "../../../context/JobContext";
import CloseIcon from "@mui/material/Close";
import AddIcon from "@mui/material/Add";
import AddRemoveCopy from "./AddRemoveCopy";
import PreNextStep from "./PreNextStep";
import Accordion from "../../../components/Accordion";
import ContainerHeight from "../../../components/ContainerHeight";

const EntryKeyHelp = {
    remark:"Plain text comment or label string commonly starts with space",
    "dfa-regex": 

};









const ASPathSet = ({ activityId }) = {
    const { getJobParams, updateJobParam } = useContext(JobContext);

    const params = getJobParams(activityId);
    const [errors, setErrors] = useState({});
    const [expanded, setExpanded] = useState({ 1: true });
    const [entry, setEntry] = useState({ key: "remark", value: "" });

    const handleInputChange = (rowId, event) => {
        const { name, value } = event.target;
        updateJobParam(activityId, rowId, name, value);
    };

    const handleAdd = (rowId, entries) => {
        let copy = [...entries];
        if (entry.value === "") {
            return;
        }
    
        copy.push({...entry});

        updateJobParam(activityId, rowId, "entries", copy);
        setEntry({ key: "remark", value: ""});
    };
    const handleRemove = (rowId, entries, index) => {
        let copy = [...entries];
        copy.splice(index, 1);
        updateJobParam(activityId, rowId, "entries", copy);
    };

    const toggleExpanded = (rowId) => {
        let copy = {...expended};
        copy.[rowId] = !copy[rowId];
        setExpanded(copy);
    };

    const isValid = () => {
        let errors = {};
        let networkDevice = {};
        params.forEach((row) => {
            let key = row.networkDevice.toLowerCase() + row.name.toLowerCase();
            if (networkDevices[key]) {
                networkDevices[key]++;
            } else {
                networkDevices[key] = 1;
            }
        })
        params.forEach((row) => {
            if (!row.networkDevice) {
                errors[`networkDevice${row.rowId}`] = "Required";
            } else (
                networkDevices[row.networkDevice.toLowerCase() + row.name.toLowerCase()] > 1
            ) {
                errors[`networkDevice${row.rowId}`] = "Duplicate";
                errors[`name${row.rowId}`] = "Duplicate";
            }
            if (!row.name) {
                errors[`name${row.rowId}`] = "Required";
            }
        });

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div>
            <ContainerHeight>
                {params.map()}
            </ContainerHeight>
        </div>
    )
}
