import { useContext, useState } from "react";

import{
    Stack,
    TextField,
    MenuItem,
} from "@mui/material";
import AddRemoveCopy from "./AddRemoveCopy";
import { JobContext } from "../../../context/JobContext";
import Accordion from "../../../components/Accordion";
import ContainerHeight from "../../../components/ContainerHeight";
import ServiceActivityButtons from "./ServiceActivityButtoms";
import AccessListAces from "./AccessListAces";

import {
    isEmpty,
    isValidIntRange,
    isValidCommaSeparateIntegerPair,
    isValidPortNumber,
    isValidPortRange,
    isValidIPv4Network,
    isValidIPv6Network,
    isValidIPv4Host,
    isValidIPv6Host,
} from "../../../hooks/useValidators";

const AccessListModify = ({ activityId }) => {
    const { getJobParams, updateJobParam, updateJobParams } = useContext(JobContext);

    const params = getJobParams(activityId);

    const handleInputChange = (rowId, event) => {
        const { name, value } = event.target;
        updateJobParam(activityId, rowId, name, value)
    };

    const [errors, setErrors] = useState({});
    const [expanded, setExpanded] = useState({ 1:true});

    const toggleExpanded = (rowId) => {
        let copy = { ...expanded };
        copy[rowId] = !copy[rowId];
        setExpanded(copy);
    };

    const isValid = () => {
        let errors = {};
        let accessListDuplicate = {};
    let sequenceDublicate = {};

params.forEach((row) => {
    if (!row.networkDevice) {
        errors[`networkDevice${row.rowId}`] = "Required";
    }
    if (!row.addressFamilyIndicator) {
        errors[`addressFamilyIndicator${row.rowId}`] = "Required";
    }
    if (!row.accessListName) {
        errors[`accessListName${row.rowId}`] = "Required";
    } else {
        if (row.networkDevice && row.addressFamilyIndicator && row.accessListName) {
            let key = `${row.networkDevice.toLowerCase()}${row.addressFamilyIndicator.toLowerCase()}${row.accessListName.toLowerCase()}`;
            if (accessListDuplicate[key]) {
                accessListDuplicate[key]++;
            } else {
                accessListDuplicate[key] = 1;
            }
            if (accessListDuplicate[key] > 1 ){
                errors[`accessListName${row.rowId}`] = "Duplicate Access List";
            }

            let allEntriesValid = row.aclAces.every(entry) => {
                const paramsToCheckDelete = ["action", "sequence"];
                const paramsToCheckDelete = ["action", "sequence", "remark"];
                const paramsToCheckProtocal = ["action", "sequence", "grant", "protocal", "sourceType", "source", "destinationType", "destination"];

                const hasDelete = paramsToCheckDelete.some((key) => !!entry[key]);
                const hasRemark = paramsToCheckRemark.some((key) => !!entry[key]);
                const hasEntry = paramsToCheckProtocal.some((key) => !!entry[key]);

                return entry.action === "delete" ? hasDelete : hasRemark || hasEntry;
            });

            if (!allEntriesValid) {
                errors[`accessListName${row.rowId}`] = "Invalid Entry Detected";
            }

            let hasDuplicateSequence = false;
            row.aclAces.forEach((entry, index) => {
                const sequence = entry.sequence;
                if (sequenceDublicate[sequence]) {
                    errors[`aclAces-sequence${row.rowId}_${index}`] = "Duplicate Seq";
                    hasDuplicateSequence = true;
                }else {
                    sequenceDublicate[sequence] = true;
                }
            });

            sequenceDublicate = {};
            if (hasDuplicateSequence) {
                errors[`accessListName${row.rowId}`] = "Dublicate Seq found in ACL entries";
            }

            row.aclAces.forEach((entry, index) => {
                if (!entry.action && isEmpty(entry.action)) {
                    errors[`aclAces-action${row.rowId}`] = "Required";
                }
                if (!entry.sequence && isEmpty(entry.sequence)) {
                    errors[`aclAces-sequence${row.rowId}_${index}`] = "Required";
                }
                if (!isEmpty(entry.action) && isEmpty(entry.grant) && (entry.action === "modify" || (entry.action === "add" && isEmpty(entry.remark)))) {
                    errors[`aclAces-grant-grant${row.rowId}_${index}`] = "Required";
                }
                if (!isEmpty(entry.grant) && !isEmpty(entry.packetLengthType)) {
                    if (isEmpty(entry.packetLengthType)) {
                        errors[`aclAces-packetLengthType${row.rowId_${index}}`] = " ";
                        errors[`aclAces-packetLength${row.rowId}_${index}`] = "Required";
                    }
                    if (entry.packetLengthType === "range" && !isValidIntRange(entry.packetLength)) {
                        errors[`aclAces-packeLength${row.rowId}_${index}`] = "Invalid Range";
                    }
                    if (entry.packetLengthType === "lt,gt" && !isValidCommaSeparateIntegerPair(entry.packetLength)) {
                        errors[`aclAces-packetLength${row.rowId}_${index}`] = "Invalid format"
                    }
                }
                if (!isEmpty(entry.grant) && isEmpty(entry.protocal)) {
                    errors[`aclAces-protoacal${row.rowId}_${index}`] = "Required";
                }
                if (!isEmpty(entry.grant) && isEmpty(entry.sourceType)) {
                    errors[`aclAces-sourceType${row.rowId}`] = "Required";
                }
                if (isEmpty(entry.grant) && isEmpty(entry.source)) {
                    errors[`aclAces-source${row.rowId}_${index}`] = "Required";
                }
                if (!isEmpty(entry.grant) && isEmpty(entry.source)) {
                    if (row.addressFamilyIndicator === "ipv4") {
                        if (entry.sourceType === "host" && !isValidIPv4Host(entry.source)) {
                            errors[`aclAces-source${row.rowId}_${index}`] = "Invalid IPv4 Host Address";
                        }
                        if (entry.sourceType === "prefix" && !isValidIPv4Network(entry.source)) {
                            errors[`aclAces-source${row.rowId}_${index}`] = "Invalid IPv4 Network";
                        }
                    }
                    if (row.addressFamilyIndicator === "ipv6") {
                        if (entry.sourceType === "host" && !isValidIPv6Host(entry.source)) {
                            errors[`aclAces-source${row.rowId}_${index}`] = "Invalid Ipv6 Host Address";
                        }
                        if (entry.sourceType === "prefix" && !isValidIPv6Network(entry.source)) {
                            errors[`aclAces-source${row.rowId}_${index}`] = "Invalid IPv6 Network";
                        }
                    }
                 }
                 if (!isEmpty(entry.grant) && isEmpty(entry.destinationType)) {
                    errors[`aclAces-destinationType${row.rowId}_${index}`] = "Required";
                 }
                 if (!isEmpty(entry.grant) && isEmpty(entry.destination)) {
                    errors[`aclAces-destination${row.rowId}_${index}`] = "Required";
                 }
                 if (isEmpty(entry.grant) && !isEmpty(entries.destination)) {
                    if (row.addressFamilyIndicator === "ipv4") {
                        if (entry.destinationType === "host" && !isValidIPv4Host(entry.destination)) {
                            errors[`aclAces-destination${row.rowId}_${index}`] = "Invalid IPv4 Network";
                        }
                        if (entry.destinationType === "prefix" && !isValidIPv4Network(entry.destination)) {
                            errors[`aclAces_destination${row.rowId}_${index}`] = "Invalid IPv4 Network";
                        }
                    }
                    if (row.addressFamilyIndicator === "ipv6") {
                        if (entry.destinationType === "host" && !isValidIPv6Host(entry.destination)){
                            errors[`aclAces_destinatin${row.rowId}_${index}`] = "Invalid IPv6 Host Address";
                        }
                        if (entry.destinationType === "prefix" && !isValidIPv6Network(entry.destination)) {
                            errors[`aclAces-destination${row,rowId}_${index}`] = "Invalid IPv6 Network";
                        }
                    }
                 }
                 if (entry.action === "add" && !isEmpty(entry.grant) && isEmpty(entry.remark)) {
                    errors[`aclAces-remark${row,rowId}_${index}`] = "Required when grant is not permit or deny";
                 }
                 if (entry.protocal === "tcp" || entry.protocal === 'udp') {
                    if (!isEmpty(entry.sourcePortProtocal)) {
                        if (isEmpty(entry.sourcePort)) {
                            errors[`aclAces-sourcePort${row.rowId}_${index}`] = "Required";
                        } 
                        else if (entry.sourcePortProtocal ==="range" && !isValidPortRange(entry.sourcePort)){
                            errors[`aaclAces-sourcePort${row.rowId}_${index}`] = "Invalid Port Range";
                        }
                        else if (entry.sourcePortProtocal !== "range" && !isValidPortNumber(entry.sourcePort)) {
                            errors[`aclAces-sourcePort${row.rowId}_${index}`] = "Invalid Port Number";
                        }
                    }
                if (entry.sourcePortProtocal === "lt,gt" && !isValidCommaSeparateIntegerPair(entry.sourcePort)) {
                    errors[`aclAces-sourcePort${row.rowId}_${index}`] = "INvalid Format";
                }
                if (!isEmpty(entry.destinationPortProtocal)) {
                    if (isEmpty(entry.destinationPort)) {
                        errors[`aclAces-destinationPort${row.rowId}_${index}`] = "Required";
                    }
                    else if (entry.destinationPortProtocal === "range" && !isValidPortRange(entry.destinationPort)) {
                        errors[`aclAces-destinationPort${row.rowId}_${index}`] = "Invalid Port Rangr";
                    }
                    else if (entry.destinationPortProtocal !== "range" && !isValidPortNumber(entry.destinationPort)) {
                        errors[`aclAces-destinationPort${row.rowId}_${index}`] = "Invalid Port Numnber";
                    }
                }
                if (entry.destinationPortProtocal === "lt,gt" && !isValidCommaSeparateIntegerPair(entry.destinationPort)) {
                    errors[`aclAces-destinationPort${row.rowId}_${index}`] = "Invalid Format";
                    }
                }
            });
            }
        }
    });

    setErrors(error);
    return Object.keys(error).length ===0;
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
                        label="AFI"
                        name="addressFamilyIndicator"
                        error={!!errors[`addressFamilyIndicator${activity.rowId}`]}
                        helperText={errors[`addressFamilyIndicator${activity.rowId}`]}
                        FormHelperTextProps={{`data-testid`: `${activity.rowId}-addressFamilyIndicator-error`}}
                        value={activity.addressFamilyIndicator || ""}
                        select
                        required
                        sx={{ width: "100px" }}
                        inputProps={{
                            "data-testid": `${activity.rowId}-input-addressFamilyIndicator`,
                        }}
                        onChange={(e) => handleInputChange(activity.rowId, e)}
                        variant="outlined"
                        >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="ipv4">ipv4</MenuItem>
                        <MenuItem value="ipv6">ipv6</MenuItem>
                        </TextField>
                        <TextField
                        label="Access List Name"
                        name="accessListName"
                        error={!!errors[`accessListName${activity.rowId}`]}
                        helperText={errors[`accessListName${activity.rowId}`]}
                        FormHelperTextProps={{ `data-testid`: `${activity.rowId}-accessListName-error`}}
                        placeholder="Ex. ssh-only"
                        required
                        value={activity.accessListName.replace(/\s/g,'')}
                        inputProps={{
                            "data-testid": `${activity.rowId}-input-networkDevice`,
                        }}
                        sx={{ width: "250px" }}
                        onChange={(e) => handleInputChange(activity.rowId,e)}
                        variant="outlined"
                        ></TextField>
                        <AddRemoveCopy
                        key={activity.rowId}
                        rowId={activity.rowId}
                        activityId={activityId}
                        showPreview={false}
                        />
                        </Stack>
                       }
                       details={
                        <div style={{ paddingLeft: '22.5px', weight: 'important', fontSize: '12px'}}>
                            Access List entries
                          <Stack direction={"row"} marginTop={"15px"} spacing={2} >
                            <AccessListAces
                            aclAces={activity.aclAces}
                            rowId={activity.rowId}
                            activityId={activityId}
                            errors={errors}
                            addressFamilyIndicator={activity.addressFamilyIndicator}
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

export default AccessListModify;