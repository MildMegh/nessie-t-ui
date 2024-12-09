    import React, { Fragment, useContext, useState } from "react";
    import {
        Stack,
        TextField,
        MenuItem,
        Tooltip,
        IconButton,
        Icon,
    } from "@mui/material";
    import { JobContext } from "../../../context/JobContext";
    import RemoveIcon from "@mui/material/Remove";
    import AddIcon from "@mui/material/Add";

    const AccessListAces = ({ aclAces, rowId, activityId, addressFamilyIndicator, errors }) => {
        const { updateJobParam, updateNestedJobParam } = useContext(JobContext);
        const [isProtocolOptions] = useState(false);

        const handleInputChange = (index, event, relatedField) => {
            const { name, value } = event.target;

            if (name === "action") {
                if (value === "" || value === 'delete') {
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "grant", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "protocol", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "protocolOptions", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "fragments", false);
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "log",  false);
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "sourceType", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "source", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "sourcePortProtocol", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "sourcePort", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "destinationType", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "destination", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "destinationPortProtocol", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "destinationPort", "");   
                }
            }

            else if (name === "grant") {
                if (value === "") {
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "protocol", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "protocolOptions", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "fragments", false);
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "log", false);
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "sourceType", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "source", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "sourcePortProtocol", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "sourcePort", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "destinationType", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "destination", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "destinationPortProtocol", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "destinatonPort", "");

                }
            }
 
            else if (name === "protocol") {
                if (value !== "icmp") {
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "protocolOptions", "");
                }
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "sourceType", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "source", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "sourcePortProtocol", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "sourcePort", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "destinationType", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "destination", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "destinationPortProtocol", "");
                    updateNestedJobParam(activityId, rowId, "aclAces", index, "destinatonPort", "");
                }

                else if (name === "sourceType") {
                    if (value === "any") {
                        updateNestedJobParam(activityId, rowId, "aclAces", index, "source", "any");
                    } else {
                        updateNestedJobParam(activityId, rowId, "aclAces", index, "source", "");
                    }
                }

                else if (name === "destinationType") {
                    if (value === "any") {
                        updateNestedJobParam(activityId, rowId, "aclAces", index, "destination", "any");
                    } else {
                        updateNestedJobParam(activityId, rowId, "aclAces", index, "destination", "");
                    }
                }

                else if (name === "packetLengthType") {
                    if (value === "") {
                        updateNestedJobParam(activityId, rowId, "aclAces", index, "packetLength", "");
                    } 
                }

                else if (name === "sourcePortProtocol") {
                    if (value === "") {
                        updateNestedJobParam(activityId, rowId, "aclAces", index, "sourcePort", "");
                    } 
                }

                else if (name === "destinationPortProtocol") {
                    if (value === "") {
                        updateNestedJobParam(activityId, rowId, "aclAces", index, "destinationPort", "");
                    } 
                }

                else if (name === "fragments") {
                    if (value) {
                        updateNestedJobParam(activityId, rowId, "aclAces", index, "sourcePortProtocol", "");
                        updateNestedJobParam(activityId, rowId, "aclAces", index, "sourcePort", "");
                        updateNestedJobParam(activityId, rowId, "aclAces", index, "destinationPortProtocol", "");
                        updateNestedJobParam(activityId, rowId, "aclAces", index, "destinatonPort", "");
                    }
                }

                updateNestedJobParam(activityId, rowId, "aclAces", index, name, value);
            };



            const handleAdd = () => {
                const list = [...aclAces];
                list.push({
                    action: "",
                    sequence: "",
                    grant: "",
                    remark: "",
                    protocol: "",
                    isProtocolOptions: "",
                    Fragments: false,
                    log: false,
                    sourceType: "",
                    source: "",
                    sourecPortProtocol: "",
                    sourecPortProtocol: "",
                    destinationType: "",
                    destination: "",
                    destinationPortProtocol: "",
                    destinationPort: "",
                });
                updateJobParam(activityId, rowId, "aclAces", list);
            };

            const handleRemove = (index) => {
                const list = [...aclAces];
                list.slice(index, 1);
                updateJobParam(activityId, rowId, "aclAces", list);
            };

            return (
                <Stack spacing={1}>
                    {aclAces.map((ace, index) => (
                        <React.Fragment key={`accessListFragment-${index}`}>
                            <Stack key={`accessListStack-${index}`} direction="row" spacing={1} style={{ marginTop: '14px'}}>
                                <TextField
                                    label="Action"
                                    name="action"
                                    value={ace.action}
                                    select
                                    required
                                    sx={{ width: "100px" }}
                                    inputProps={{ "data-testid": `${rowId}_${index + 1}-input-action` }}
                                    FormHelperTextProps={{ 'data-testid': `aclAces-action${rowId}_${index + 1}-error` }}
                                    onChange={(e) => handleInputChange(index, e, ace.action)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-ation${rowId}_${index}`]}
                                    helperText={errors[`aclAces-action${rowId}_${index}`]}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="add">Add</MenuItem>
                                    <MenuItem value="delete">Delete</MenuItem>
                                </TextField>
                                <TextField
                                    label="Seq"
                                    name="sequence"
                                    value={ace.sequence}
                                    required
                                    sx={{ width: "px75" }}
                                    inputProps={{ 
                                        "data-testid": `${rowId}_${index + 1}-input-sequence`,
                                    }}
                                    FormHelperTextProps={{ 'data-testid': `aclAces-sequence${rowId}_${index + 1}-error` }}
                                    onChange={(e) => handleInputChange(index, e, ace.sequence)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-sequence${rowId}_${index}`]}
                                    helperText={errors[`aclAces-sequence${rowId}_${index}`]}
                                />
                                {ace.action !== "delete" && (
                                   <>
                                    <TextField
                                    label="Grant"
                                    name="grant"
                                    value={ace.grant}
                                    select
                                    required
                                    sx={{ width: "100px" }}
                                    inputProps={{ 
                                        "data-testid": `${rowId}_${index + 1}-input-grant`,
                                     }}
                                    FormHelperTextProps={{ 'data-testid': `aclAces-grant${rowId}_${index + 1}-error` }}
                                    onChange={(e) => handleInputChange(index, e, ace.grant)}
                                    select
                                    variant="outlined"
                                    error={!!errors[`aclAces-grant${rowId}_${index}`]}
                                    helperText={errors[`aclAces-grant${rowId}_${index}`]}
                                >
                                    <MenuItem value=""><em>Remark</em></MenuItem>
                                    <MenuItem value="permit">Permit</MenuItem>
                                    <MenuItem value="deny">Deny</MenuItem>
                                </TextField>
                                {ace.grant === "" && (
                                    <TextField
                                    label="Remark"
                                    name="remark"
                                    value={ace.action !== "add" && ace.grant !== "" ? "" : ace.remark}
                                    disabled={ace.action !== "add"}
                                    sx={{ width: "890px" }}
                                    inputProps={{ 
                                        "data-testid": `${rowId}_${index + 1}-input-remark`,
                                    }}
                                    FormHelperTextProps={{ 'data-testid': `aclAces-remark${rowId}_${index + 1}-error` }}
                                    onChange={(e) => handleInputChange(index, e, ace.remark)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-remark${rowId}_${index}`]}
                                    helperText={errors[`aclAces-remark${rowId}_${index}`]}
                                />
                               )}
                            </> 
                         )}
                         {ace.grant !== ""  && (
                            <>
                            <TextField
                                    label="Protocol"
                                    name="protocol"
                                    value={ace.action}
                                    select
                                    sx={{ width: "100px" }}
                                    inputProps={{
                                         "data-testid": `${rowId}_${index + 1}-input-action`,
                                         }}
                                    FormHelperTextProps={{ 'data-testid': `aclAces-action${rowId}_${index + 1}-error` }}
                                    onChange={(e) => handleInputChange(index, e, ace.action)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-ation${rowId}_${index}`]}
                                    helperText={errors[`aclAces-action${rowId}_${index}`]}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="ip">IP</MenuItem>
                                    <MenuItem value="icmp">ICMP</MenuItem>
                                    <MenuItem value="tcp">TCP</MenuItem>
                                    <MenuItem value="udp">UDP</MenuItem>
                                </TextField>
                                <TextField
                                    label="ICMP Options"
                                    name="protocolOPtions"
                                    value={ace.protocol === "icmp" ? ace.isProtocolOptions : ""}
                                    select
                                    sx={{ width: "150px" }}
                                    inputProps={{
                                         "data-testid": `${rowId}_${index + 1}-input-action`,
                                         }}
                                    onChange={(e) => handleInputChange(index, e, ace.action)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-ation${rowId}_${index}`]}
                                    helperText={errors[`aclAces-action${rowId}_${index}`]}
                                    disabled={ace.protocol !== "icmp"}
                                >
                                    <MenuItem value="" selected={isProtocolOptions}><em>Nome</em></MenuItem>
                                    <MenuItem value={"echoreply"}>echoreply</MenuItem>
                                    <MenuItem value={"portunreachable"}>Port unreachable</MenuItem>
                                    <MenuItem value={"unreachable"}>unreachable</MenuItem>
                                    <MenuItem value={"tt1exceeded"}>tt1exceeded</MenuItem>
                                </TextField>
                                <TextField
                                    label="Fragments"
                                    name="fragments"
                                    value={ace.Fragments}
                                    select
                                    sx={{ width: "125px" }}
                                    inputProps={{ "data-testid": `${rowId}_${index + 1}-input-fragments`}}
                                    onChange={(e) => handleInputChange(index, e, ace.action)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-fragments${rowId}_${index}`]}
                                    helperText={errors[`aclAces-fragments${rowId}_${index}`]}
                                >
                                    <MenuItem value={false}><em>None</em></MenuItem>
                                    <MenuItem value={true}>enabled</MenuItem>
                                </TextField>
                                <TextField
                                    label="Log"
                                    name="log"
                                    value={ace.log}
                                    select
                                    sx={{ width: "125px" }}
                                    inputProps={{ "data-testid": `${rowId}_${index + 1}-input-log`}}
                                    onChange={(e) => handleInputChange(index, e, ace.log)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-log${rowId}_${index}`]}
                                    helperText={errors[`aclAces-fragments${rowId}_${index}`]}
                                >
                                    <MenuItem value={false}><em>None</em></MenuItem>
                                    <MenuItem value={true}>enabled</MenuItem>
                                </TextField>
                            </>
                         )}
                         <Tooltip title="Add Row" arrow>
                            <span>
                                <IconButton
                                    color="secondary"
                                    data-testid={`${index}-button-add`}
                                    aria-label="add"
                                    onClick={handleAdd}
                                >
                                    <AddIcon/>
                                </IconButton>
                            </span>
                         </Tooltip>
                         <Tooltip title="Delete Row" arrow>
                            <span>
                                <IconButton
                                    disabled={aclAces.length < 2}
                                    color="secondary"
                                    data-testid={`${index}-button-remove`}
                                    aria-label="remove"
                                    onClick={handleRemove(index)}
                                >
                                    <RemoveIconIcon/>
                                </IconButton>
                            </span>
                         </Tooltip>
                    </Stack>
                    {ace.grant !== "" && (
                        <>
                        <Stack key={`sourceStack=${index}`} direction="row" spacing={1} style={{ marginTop: '24px', marginLeft: '110px'}}>
                            <>
                                <>
                                <TextField
                                    label="Source Type"
                                    name="sourceType"
                                    value={ace.sourceType}
                                    select
                                    required
                                    sx={{ width: "175px" }}
                                    inputProps={{
                                         "data-testid": `${rowId}_${index + 1}-input-sourceType`,
                                         }}
                                    FormHelperTextProps={{ 'data-testid': `aclAces-sourceType${rowId}_${index + 1}-error` }}
                                    onChange={(e) => handleInputChange(index, e)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-sourceType${rowId}_${index}`]}
                                    helperText={errors[`aclAces-sourceType${rowId}_${index}`]}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value={"any"}>any</MenuItem>
                                    <MenuItem value={"host"}>host</MenuItem>
                                    <MenuItem value={"prefix"}>prefix</MenuItem>
                                </TextField>
                                <TextField
                                    label="Source"
                                    name="source"
                                    value={ace.sourceType === "any" ? "any" : ace.source}
                                    required
                                    disabled={ace.sourceType === "any"}
                                    placeholder={ace.sourceType === "host" ? "10.128.128.3" : "10.128.128.0/24"}
                                    sx={{ width: "200px" }}
                                    inputProps={{
                                         "data-testid": `${rowId}_${index + 1}-input-source`,
                                         }}
                                    FormHelperTextProps={{ 'data-testid': `aclAces-source${rowId}_${index + 1}-error` }}
                                    onChange={(e) => handleInputChange(index, e, ace.source)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-source${rowId}_${index}`]}
                                    helperText={errors[`aclAces-source${rowId}_${index}`]}
                                />
                                {(ace.protocol === "tcp" || ace.protocol === "udp") && (
                                <>
                                    <TextField
                                    label="Source Operator"
                                    name="sourcePortProtocol"
                                    value={ace.sourecPortProtocol}
                                    select
                                    sx={{ width: "185px" }}
                                    inputProps={{
                                         "data-testid": `${rowId}_${index + 1}-input-sourcePortProtocol`,
                                         }}
                                    FormHelperTextProps={{ 'data-testid': `aclAces-sourcePortProtocol${rowId}_${index + 1}-error` }}
                                    onChange={(e) => handleInputChange(index, e)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-sourcePortProtocol${rowId}_${index}`]}
                                    helperText={errors[`aclAces-sourcePortProtocol${rowId}_${index}`]}
                                    disabled={ace.fragments}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"eq"}>Eq</MenuItem>
                                    <MenuItem value={"range"}>Ramge</MenuItem>
                                    <MenuItem value={"gt"}>Gt</MenuItem>
                                    <MenuItem value={"lt"}>Lt</MenuItem>
                                </TextField>
                                <TextField
                                    label="Source Port"
                                    name="sourcePort"
                                    value={ace.sourcePort}
                                    disabled={ace.fragments}
                                    sx={{ width: "180px" }}
                                    inputProps={{
                                         "data-testid": `${rowId}_${index + 1}-input-sourcePort`,
                                         }}
                                    FormHelperTextProps={{ 'data-testid': `aclAces-sourcePort${rowId}_${index + 1}-error` }}
                                    onChange={(e) => handleInputChange(index, e, ace.sourcePort)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-sourcePort${rowId}_${index}`]}
                                    helperText={errors[`aclAces-sourcePort${rowId}_${index}`]} 
                                    required={ace.sourecPortProtocol !== ""}
                                />
                                </>
                                )}
                                </>
                            </>
                        </Stack>
                        <Stack key={`destinationStack-${index}`} direction="row" spacing={1} style={{ marginTop: '14px', marginLeft: "110px" }}>
                            <>
                                <>
                                <TextField
                                    label="Dest Type"
                                    name="destinationType"
                                    value={ace.destinationType}
                                    select
                                    required
                                    sx={{ width: "175px" }}
                                    inputProps={{
                                         "data-testid": `${rowId}_${index + 1}-input-destinationType`,
                                         }}
                                    FormHelperTextProps={{ 'data-testid': `aclAces-destinationType${rowId}_${index + 1}-error` }}
                                    onChange={(e) => handleInputChange(index, e, ace.destinationType)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-destinationType${rowId}_${index}`]}
                                    helperText={errors[`aclAces-destinationType${rowId}_${index}`]}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value=""any>an    y</MenuItem>
                                    <MenuItem value="host">host</MenuItem>
                                    <MenuItem value="prefix">prefix</MenuItem>
                                </TextField>
                                <TextField
                                    label="Destination"
                                    name="destination"
                                    value={ace.destinationType === "any" ? "any" : ace.destination}
                                    required
                                    disabled={ace.destinationType ==="any"}
                                    sx={{ width: "200px" }}
                                    inputProps={{
                                         "data-testid": `${rowId}_${index + 1}-input-destination`,
                                         }}
                                    FormHelperTextProps={{ 'data-testid': `aclAces-destination${rowId}_${index + 1}-error` }}
                                    onChange={(e) => handleInputChange(index, e, ace.destination)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-destination${rowId}_${index}`]}
                                    helperText={errors[`aclAces-sourcePort${rowId}_${index}`]}
                                />
                                </>
                                {(ace.protocol === "tcp" || ace.protocol === "udp") && (
                                    <>
                                     <TextField
                                    label="Dest Operator"
                                    name="destinationPortProtocol"
                                    value={ace.destinationPortProtocol}
                                    select
                                    sx={{ width: "185px" }}
                                    inputProps={{
                                         "data-testid": `${rowId}_${index + 1}-input-destinationPortProtocol`,
                                         }}
                                    FormHelperTextProps={{ 'data-testid': `aclAces-destinationPortProtocol${rowId}_${index + 1}-error` }}
                                    onChange={(e) => handleInputChange(index, e)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-destinationPortProtocol${rowId}_${index}`]}
                                    helperText={errors[`aclAces-destinationPortProtocol${rowId}_${index}`]}
                                    disabled={ace.fragments}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"eq"}>Eq</MenuItem>
                                    <MenuItem value={"range"}>Ramge</MenuItem>
                                    <MenuItem value={"gt"}>Gt</MenuItem>
                                    <MenuItem value={"lt"}>Lt</MenuItem>
                                </TextField>
                                <TextField
                                    label="Dest Port"
                                    name="destinationPort"
                                    value={ace.destinationPort}
                                    sx={{ width: "180px" }}
                                    inputProps={{
                                         "data-testid": `${rowId}_${index + 1}-input-destinationPort`,
                                         }}
                                    FormHelperTextProps={{ 'data-testid': `aclAces-destinationPort${rowId}_${index + 1}-error` }}
                                    onChange={(e) => handleInputChange(index, e, ace.destinationPort)}
                                    variant="outlined"
                                    error={!!errors[`aclAces-destinationPort${rowId}_${index}`]}
                                    helperText={errors[`aclAces-destinationPort${rowId}_${index}`]}
                                    disabled={ace.fragments}
                                    required={ace.destinationPortProtocol !== ""}
                                />
                                    </>
                                )}
                            </>
                        </Stack>
                        </>
                    )}
                </React.Fragment>
            ))}
        </Stack>
      );
    };

    export default AccessListAces;