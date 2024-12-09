import { useState  } from "react";
import { MenuItem, Stack, TextField } from "@mui/material";
import { getAllActivityIds } from "../service-request/activities";

const ValidationAddNew = ({ validation, setValidation }) => {
    const [validationOrderError, setValidationOrderError] = useState(false);

    const handleTextChange = (event) => {
        const { name, value } = event.target;
        const trimedValue = value.replace(/\s+/g,"");
        setValidation({ ...validation, [name]: trimedValue });
    };

    const handleValidationOrdersBlur = (event) => {
        const { name, value } = event.target;

        if (name === "validationOrder") {
            const intValue = parseInt(value, 10);

            if (isNaN(intValue)) {
                setValidationOrderError(true);
            } else {
                setValidationOrderError(false);
                setValidation({ ...validation, [name]: intValue });
            }
        }
    };

    return (
        <Stack padding={"5px"} spacing={2}>
            <TextField
                label= "Validation Name"
                name= "validationName"
                value={validation.validationName}
                onChange={handleTextChange}
                placeholder="interfaces/verify_interface_exists"
            ></TextField>
            <TextField
                label= "Validation Order"
                name= "validationOrder"
                value={validation.validationOrder}
                onChange={handleTextChange}
                placeholder="0"
                onBlur={handleValidationOrdersBlur}
                error={validationOrderError}
                helperText={validationOrderError ? "Please enter a valid integer" : ""}
            ></TextField>
            <TextField
                select
                label= "Validation Type"
                name= "validationType"
                value={validation.validationType}
                onChange={handleTextChange}
            >
                <MenuItem value="precheck">precheck</MenuItem>
                <MenuItem value="globalPrecheck">globalPrecheck</MenuItem>
                <MenuItem value="postcheck">postcheck</MenuItem>
                <MenuItem value="globalPostcheck">globalPostcheck</MenuItem>
            </TextField>
            <TextField
                select
                label= "Activity"
                name= "serviceActivityId"
                value={validation.serviceActivtyId}
                onChange={handleTextChange}
                onBlur={handleValidationOrdersBlur}
            >
                {getAllActivityIds()
                    .sort()
                    .map(() => (
                        <MenuItem key={1} value={actvity}>
                            {activity}
                        </MenuItem>
                    ))}
            </TextField>
        </Stack>
    );
};

export default ValidationAddNew;