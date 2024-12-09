import React, { useContext, useState } from "react";
import {
    Stack,
    TextField,
    MenuItem,
    Tooltip,
    IconButton,
} from "@mui/material";
import { JobContext } from "../../../context/JobContext";
import RemoveIcon from "@mui/material/Remove";
import AddIcon from "@mui/material/Add";

const AccessListOptions = ({ accessLists, rowId, activityId, enabledIPv6, errors }) => {
    const { updateJobParam, updateNestedJobParam } = useContext(JobContext);
    const [isProtocolOptions] = useState(false);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        updateNestedJobParam(activityId, rowId, "accessLists", index, name, value);
    };

    const handleAdd = () => {
        const list = [...accessLists];
        list.push({accessListAfi: "",accessListName: "",accessListDirection: "" });
        updateJobParam(activityId, rowId, "accessLists", list);
    };

    const handleRemove = (index) => {
        const list = [...accessLists];
        list.splice(index, 1);
        updateJobParam(activityId, rowId, "accessLists", list);
    };

    return (
        <Stack spacing={1}>
            {accessLists.map((acl, index) => (
                <React.Fragment key={`accessListFragment-${index}`}>
                    <Stack key={`accessListStack-${index}`} direction="row" spacing={1} marginTop={"5px"}>
                        <TextField
                             label="ACL Name"
                             name="accessListName"
                             value={accessListName.replace(/\s/g,'')}
                             sx={{ width: "250px" }}
                             placeholder="Ex. nmnet-only"
                             inputProps={{"data-testid": `${rowId}_${index + 1}-input-accessListName`}}
                             FormHelperTextProps={{ 'data-testid': `${rowId}_${index + 1}-accessListName-error`}}
                             onChange={(e) => handleInputChange(index, e)}
                             variant="outlined"
                             error={!!errors[`accessListName${rowId}_${index + 1 }`]}
                             helperText={errors[`accessListName${rowId}_${index + 1}`]}
                         />
                         <TextField
                            label="ACL AFI"
                            name="accessListAfi"
                            value={acl.accessListAfi || ""}
                            select
                            sx={{ width: "100px" }}
                            inputProps={{
                                "data-testid": `${rowId}_${index + 1}-input-accessListAfi`,
                            }}
                            FormHelperTextProps={{ 'data-testid': `${rowId}_${index + 1}-accessListAfi-error` }}
                            onChange={(e) => handleInputChange(index, e)}
                            variant="outlined"
                            error={!!errors[`accessListAfi${rowId}_${index +1}`]}
                            helperText={errors[`accessListAfi${rowId}_${index + 1}`]}
                        >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="ipv4">IPV4</MenuItem>
                                {!enabledIPv6 ? <MenuItem value="ipv6">ipv6</MenuItem> : ''}
                        </TextField>
                        <TextField
                            label="ACL Direction"
                            name="accessListDirection"
                            value={acl.accessListDirection || ""}
                            select
                            disabled={!accessList.accessListName}
                            sx={{ width: "150px" }}
                            inputProps={{"data-testid": `${rowId}_${index + 1}-input-accessListDirection`}}
                            FormHelperTextProps={{ 
                                'data-testid': `${rowId}_${index + 1}-accessListDirection-error`,
                             }}
                            onChange={(e) => handleInputChange(index, e)}
                            variant="outlined"
                            error={!!errors[`accessListDirectin${rowId}_${index + 1}`]}
                            helperText={errors[`accessListDirection${rowId}_${index + 1}`]}
                        >
                                 <MenuItem value="">None</MenuItem>
                                <MenuItem value="in">In</MenuItem>
                                <MenuItem value="out">out</MenuItem>
                        </TextField>
                        <Tooltip title="Add Row" arrow>
                            <span>
                                <IconButton
                                    color="secondary"
                                    data-testid={`${rowId}-${index + 1}-button-accessListAdd`}
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
                                    disabled={accessLists.length < 2}  
                                    color="secondary"
                                    data-testid={`${rowId}-${index + 1}-button-accessListRemove`}
                                    aria-label="remove"
                                    onClick={handleRemove(index)}
                                >
                                    <RemoveIcon/>
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Stack>
                </React.Fragment>
            ))}
        </Stack>
    );
};

export default AccessListDetails