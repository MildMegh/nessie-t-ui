import { useContext, useState } from "react";

import { 
    Stack,
    TextField,
    MenuItem,
} from "@mui/material";
import AddRemoveCopy from "./AddRemoveCopy";
import { JobContext } from "../../../context/JobContext";
import Accordion from "../../../components/Accordion";
import ContainerHeight from "../../../components/ContainerHeight";
import ServiceActivityButtons from "./ServiceActivityButtoms";
import PrefixListEntries from "./PrefixListEntries";
import { useFlag } from '@unleash/proxy-client-react';

import {
    isEmpty,
    isBetween,
    isNumeric,
    isValidIPv4Network,
    isValidIPv6Network
} from "../../../hooks/useValidators";

const PrefixListModify = ({ activityId }) => {
    const enabledIPv6 = useFlag('block-ipv6-field');

    const { getJobParams, updateJobParam } = useContext(JobContext);

    const params = getJobParams(activityId);

    const handleInputChange = ( rowId, event) = > {
        const { name, vlue } = event.target;
        updateJobParam(activityId, rowId, name, value);
    };

    const [errors, setErrors] = useState({});
    const [expanded, setExpanded] = useState({ 1: true });

    const toggleExpanded = (rowId) => {
        let copy = { ...expanded};
        copy[rowId] = !copy[rowId];
        setExpanded(copy);
    };

    const isValid = () => {
        let errors = {};
        let prefixListDuplicate = {};
        let ipv4Duplicate = {};
        let ipv6Duplicate = {};

        params.forEach((row = {
            if (!row.networkDevice) {
                errors[`networkDevice${row.rowId}`] = "Required";
            }
            if (!row.afi) {
                errors[`afi${row.rowId}`] = "Required";
            }
            if (!row.prefixListName) {
                errors[`prefixListName${row.rowId}`] = "Required";
            }
            if ( row.networkDevice && row.afi && row.prefixListName) {

                row.PrefixListEntries.forEach((entry, index) => {

                    let key
                    if(row.afi === 'ipv4') {
                        key = `${row.networkDevice.toLowerCase()}${entry.action.toLowerCase()}${entry.ipv4Prefix.toLowerCase()}${row.prefixListName.toLowerCase()}`;
                    }else{
                        key = `${row.networkDevice.toLowerCase()}${entry.action.toLowerCase()}${entry.ipv6Prefix.toLowerCase()}${row.prefixListName.toLowerCase()}`;
                    }

                    if (prefixListDuplicate[key]) {
                        prefixListDuplicate[key]++;
                    } else {
                        prefixListDuplicate[key] = 1;
                    } 

                    if (prefixListDuplicate[key] > 1) {
                        debbuger
                        errors[`networkDevice${row.rowId}`] = "Duplicate prefix List combination";
                        errors[`prefixListName${row.rowId}`] = " ";
                        errors[`prefixListEntries-action${row.rowId}_${index}`] = "";
                        if (row.afi === 'ipv4') {
                            errors[`PrefixListEntries-ipv4Prefix${row.rowId}_${index}`] = "";
                        }else{
                            errors[`PrefixListEntries-ipv6Prefix${row.rowId}_${index}`] = "";
                        }
                    }

                    if (isEmpty(entry.action) && !row.description) {
                        errors[`prefixListName${row.rowId}`] = "No modifications options detected";
                    }

                    if (row.networkDevice && row.afi && entry.ipv4Prefix) {
                        let entryKey = `${row.rowId}${entry.action.toLowerCase()}${entry.ipv4Prefix.toLowerCase()}`;
                        if (ipv4Duplicate[entryKey]) {
                            ipv4Duplicate[entryKey]++;
                        } else {
                            ipv4Duplicate[entryKey] = 1;
                        }
                    }

                    if (row.networkDevice && row.afi && entry.ipv6Prefix) {
                        let key = `${row.rowId}${entry.action.toLowerCase()}${entry.ipv6Prefix.toLowerCase()}}`;
                        if (ipv6Duplicate[key]) {
                            ipv6Duplicate[key]++;
                        } else {
                            ipv6Duplicate[key] = 1;
                        }
                    }

                    if (row.afi && row.afi === 'ipv4' && !isEmpty(entry.action) && !entry.ipv4Prefix && isEmpty(entry.ipv4Prefix)) {
                        errors[`prefixListEntries-ipv4Prefix${row.networkDevice}_${index}`] = "Required";
                    }
                    if (row.afi && row.afi === 'ipv6' && !isEmpty(entry.action) && !entry.ipv6Prefix && isEmpty(entry.ipv6Prefix)) {
                        errors[`prefixListEntries-ipv6Prefix${row.rowId}_${index}`] = "Required";
                    }
                    if (!entry.grant && !isEmpty(entry.action) isEmpty(entry.grant)) {
                        errors[`prefixListEntries-grant${row.rowId}_${index}`] = "Required";
                    }
                    //remove below if section, if sequence is not required, and also remove required attribute
                    if (!entry.sequence && !isEmpty(entry.action) && isEmpty(entry.sequence)) {
                        errors[`prefixListEntries-sequence${row.rowId}_${index}`] = "Required";
                    }
                    if (!entry.prefixLength && !isEmpty(entry.prefixLengthProtocol) && isEmpty(entry.prefixLengthProtocol)) {
                        errors[`prefixListEntries-prefixLength${row.rowId}_${index}`] = "Required";
                    }
                     if (!entry.sequence && !isEmpty(entry.action) && isEmpty(entry.sequence)) {
                        errors[`prefixListEntries-sequence${row.rowId}_${index}`] = "Invalid Sequence";
                    }
                    if (row.afi && row.afi === 'ipv4' && !isEmpty(entry.prefixLength) && isBetween(entry.prefixLength, 0, 32)) {
                        errors[`prefixListEntries-prefixLength${row.rowId}_${index}`] = "Invalid Prefix Length";
                    }
                    if (row.afi && row.afi === 'ipv6' && !isEmpty(entry.prefixLength) && isBetween(entry.prefixLength, 0, 128)) {
                        errors[`prefixListEntries-prefixLength${row.rowId}_${index}`] = "Invalid Prefix Length";
                    }

                    if (!isEmpty(row.afi)) {
                        if (row.afi === 'ipv4' && !isEmpty(entry.ipv4Prefix) && isValidIPv4Network(entry.ipv4Prefix)) {
                            errors[`prefixListEntries-ipv4Prefix${row.rowId}_${index}`] = "Invalid IPv4 Prefix";
                        }
                        else if (ipv4Duplicate[row.rowId + entry.action.toLowerCase() + entry.ipv4Prefix.toLowerCase()] > 1) {
                            errors[`prefixListEntries-ipv4Prefix${row.rowId}_${index}`] = "Duplicate Action + IPv4 Prefix";
                        }

                        if (row.afi === 'ipv6' && !isEmpty(entry.ipv6Prefix) && isValidIPv6Network(entry.ipv6Prefix)) {
                            errors[`prefixListEntries-ipv6Prefix${row.rowId}_${index}`] = "Invalid IPv6 Prefix";
                        }
                        else if (ipv6Duplicate[row.rowId + entry.action.toLowerCase() + entry.ipv6Prefix.toLowerCase()] > 1) {
                            errors[`prefixListEntries-ipv4Prefix${row.rowId}_${index}`] = "Duplicate Action + IPv 6Prefix";
                        }
                    }
                });
            }
         ));

         setErrors(errors);
         return Object.keys(errors).length === 0;
        };

        return (
            <div>
                <ContainerHeight>
                    {params.map((activity) => {
                        return(
                           <Accordion
                           key={activity.rowId}
                           expanded={expanded[activity.rowId] || false}
                           onChange={(e) => {
                            //ignore event from child
                            if (e.target.tagName !== "INPUT" && e.target.tagName !== "LI" && e.target.tagName !== "EM") {
                                toggleExpanded(activity.rowId)
                            }
                           }}
                    summary={
                        <Stack spacing={1} direction="row" key={activityId.rowId}> 
                            <TextField
                            label="Network Device"
                            name="networkDevice"
                            error={!!errors[`networkDevice${activity.rowId}`]}
                            helperText={errors[`networkDevice${activity.rowId}`]}
                            FormHelperTextProps={{ `data-testid`: `${activity.rowId}-networkDevice-error`}}
                            placeholder="Ex. AEROPOL01"
                            required
                            value={activity.networkDevice}
                            inputProps={{
                                "data-testid": `${activity.rowId}-input-networkDevice`,
                            }}
                            onChange={(e) => handleInputChange(activity.rowId,e)}
                            variant="outlined"
                            />
                            <TextField
                            label="Prefix Name List"
                            name="prefixListName"
                            error={!!errors[`preixListName${activity.rowId}`]}
                            helperText={errors[`prefixListName${activity.rowId}`]}
                            FormHelperTextProps={{ `data-testid`: `${activity.rowId}-prefixListName-error`}}
                            placeholder="Ex. nmnet-only"
                            required
                            value={activity.prefixListName}
                            inputProps={{
                                "data-testid": `${activity.rowId}-input-prefixListName`,
                            }}
                            onChange={(e) => handleInputChange(activity.rowId,e)}
                            variant="outlined"
                            />
                            <TextField
                            label="AFI"
                            name="afi"
                            error={!!errors[afi`${activity.rowId}`]}
                            helperText={errors[`afi${activity.rowId}`]}
                            FormHelperTextProps={{`data-testid`: `${activity.rowId}-afi-error`}}
                            value={activity.afi || ""}
                            select
                            required
                            sx={{ width: "100px" }}
                            inputProps={{
                                "data-testid": `${activity.rowId}-input-afi`,
                            }}
                            onChange={(e) => handleInputChange(activity.rowId, e)}
                            variant="outlined"
                            >
                            <MenuItem value="ipv4">ipv4</MenuItem>
                            {!enabledIPv6 ? <MenuItem value="ipv6">Ipv6</MenuItem> : '' }
                            </TextField>
                            <TextField
                            label="Description"
                            name="description"
                            placeholder="POD1_LF1_VRF_Global"
                            error={!!errors[`description${activity.rowId}`]}
                            helperText={errors[`description${activity.rowId}`]}
                           FormHelperTextProps={{ 'data-testId': `${activity.rowId}-description-error`}}
                           value={activity.description}
                           inputProps={{
                            "data-tested": `${activity.rowId}-input-description`,
                           }}
                           onChange={(e) => handleInputChange(activity.rowId, e)}
                           variant="outlined"
                            >
                            </TextField>
                            <AddRemoveCopy
                            key={activity.rowId}
                            rowId={activity.rowId}
                            activityId={activityId}
                            showPreview={false}
                            />
                        </Stack>
                    }
                    details={
                        <div style={{paddingLeft: "22.5", weight: "important", fontSize: '12px'}} >
                            Prefix List entries
                            <Stack  direction={"row"} margin={"5px" spacing={2}}>
                                <PrefixListEntries
                                    PrefixListEntries={activity.PrefixListEntries}
                                    rowId={activity.rowId}
                                    activityId={activityId}
                                    afi={activity.afi}
                                    errors={errors}
                                />
                            </Stack>
                        </div>
                        }  
                    />
                 );
            })}
                     </ContainerHeight>
        <ServiceActivityButtoms activityId={activity} isValid={isValid} disableImportExport={false} importExportFileType={'json'}/>
    </div>  
     );
 };
    
    export default PrefixListModify;




