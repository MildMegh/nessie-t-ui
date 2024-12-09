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

const AddressFamilyOptions = ({ routeTargets, rowId, activityId, errors }) => {
    const {updateJobParam, updateNestedJobParam, } = useContext(JobContext);
    const [isProtocolOptions] = useState(false);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        updateNestedJobParam(activityId, rowId, "routeTargets", index, name, value);
    };

    const handleAdd = () => {
        const list = [...routeTargets];
        list.push({ routeTarget: "", direction: "import" });
        updateJobParam(activityId, rowId, "routeTargets", list )
    };

    const handleRemomve = (index) => {
        const list = [...routeTargets];
        list.splice(index, 1);
        updateJobParam(activityId, rowId, "routeTargets", list);
    };

    return (
        <Stack spacing={1} marginTop={"5px"}>
            {routeTargets.map((rt, index) => (
                <React.Fragment key={`routeTargetragment-${index}`}>
                    <Stack key={`routeTargetStack-${index}`} direction="row" spacing={1} marginTop={"10px"}>
                        <TextField
                            label="Route Target"
                            name="routeTarget"
                            value={rt.routeTarget}
                            required
                            sx={{ width: "200px" }}
                            inputProps ={{"data-testid": `${rowId}_${index + 1}-input-routeTarget`}}
                            FormHelperTextProps={{ 'data-testid': `${rowId}_${index + 1}-routeTarget-error` }}
                            onChange={(e) => handleInputChange(index, e,)}
                            variant="outlined"
                            error={!!errors[`routeTarget${rowId}_${index + 1}`]}
                            helperText={errors[`routeTarget${rowId}_${index + 1}`]}
                        />
                        <TextField
                        label="Direction"
                        name="direction"
                        value={rt.direction}
                        select
                        required
                        sx={{ width: "175px" }}
                        inputProps={{
                            "data-testid": `${rowId}_${index + 1}-input-direction`,
                         }}
                        FormHelperTextProps={{ 'data-testid': `${rowId}_${index + 1}-direction-error` }}
                        onChange={(e) => handleInputChange(index, e)}
                        variant="outlined"
                        error={!!errors[`direction${rowId}_${index + 1}`]}
                        helperText={errors[`direction${rowId}_${index + 1}`]}          
                        >
                            <MenuItem value="import">Import</MenuItem>
                            <MenuItem value="export">Export</MenuItem>
                            <MenuItem value="both">Both</MenuItem>
                         </TextField>
                        <Tooltip title="Add Row" arrow>
                            <span>
                                <IconButton
                                    color="secondary"
                                    data-testid={`${rowId}-${index + 1}-button-routeTargetAdd`}
                                    aria-label="add"
                                    onClick={(e) => handleAdd}
                                >
                                    <AddIcon/>
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title="Delete Row" arrow>
                            <span>
                                <IconButton
                                    disabled={routeTargets.length < 2}
                                    color="secondary"
                                    data-testid={`${rowId}-${index + 1}-button-routeTargetDelete`}
                                    aria-label="remove"
                                    onClick={(e) => handleAdd(index)}
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

export default AddressFamilyOptions;
