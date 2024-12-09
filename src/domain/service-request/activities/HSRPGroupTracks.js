import React, { useContext, useState } from "react";
import { 
    Stack,
    TextField,
    MenuItem,
    Tooltip,
    IconButton,
} from "@mui/material";
import { JobContext } from "../../../context/JobContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const SHRPGroupTracks = ({ tracks, rowId, activityId, errors }) => {
    const { updateJobParam, updateNestedJobParam } = useContext(JobContext);
    const [ isProtocolOptions ] = useState(false);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        updateNestedJobParam(activityId, rowId, "tracks", index, name, value);
    };



    const handleAdd = () => {
        const list = [...tracks];
        list.push({
            objectNumber: "",
            decrement: ""
        });
        updateJobParam(activityId, rowId, "tracks", list);
    };

    const handleRemove  = (index) => {
        const list = [...tracks];
        list.splice(index, 1);
        updateJobParam(activityId, rowId, "tracks", list);
    };

   return(
    <Stack spacing={1}>
        {tracks.map((track, index) => (
            <React.Fragment key={`trackFragment-${index}`}>
                <Stack key={`trackStack-${index}`} direction="row" spacing={1} style={{ marginTop: '24px'}}>
                    <TextField
                    label: "Track Object"
                    name: "objectNumber"
                    value: { track.objectNumber.replace(/\s/g, '').replace(/[\/|!%^&*()=+,<>?{}[\/g, '')}
                    placeholder="Ex. 512"
                    sx={{ width: "250px"}}
                    inputProps={{ "data-testid": `${rowId}-${index + 1}-objectNumber-error` }}
                    FormHelperTextProps={{ 'data-testid': `${rowId}-${index + 1}-objectNumber-error` }}
                    onChange={(e) => handleInputChange(index, e)}
                    variant="outlined"
                    error={{!!errors[`tracks-objectNumber${rowId}_${index}`]}
                    helperText[`tracks-objectName${rowId}-${index}`]}
                    >
                    </TextField>
                    <TextField
                    label: "Decrement"
                    name: "decrement"
                    value: { track.decrement.replace(/\s/g, '').replace(/[\/|!%^&*()=+,<>?{}[\/g, '')}
                    placeholder="Ex. 255"
                    sx={{ width: "250px"}}
                    inputProps={{ "data-testid": `${rowId}-${index + 1}-input-decrement` }}
                    FormHelperTextProps={{ 'data-testid': `${rowId}-${index + 1}-decrement-error` }}
                    onChange={(e) => handleInputChange(index, e)}
                    variant="outlined"
                    error={{!!errors[`tracks-decrement${rowId}_${index}`]}
                    helperText[`tracks-decrement${rowId}-${index}`]}
                    >
                   <TextField>
                   <Tooltip>
                   <span>
                   <IconButton
                   color: "secondary"
                   data-testid={`${rowId}-${index + 1}-button-add`}
                   aria-label= "add"
                   onClick={handleAdd}
                   >
                   <AddIcon/>
                   </IconButton>
                   </span>
                   </Tooltip>
                   <Tooltip title="DeleteRow" arrow>
                    <span>
                        <IconButton
                        disabled={tracks.length < 2}
                        color="secondary"
                        data-testid={`${rowId}-${index + 1}-button-remove`}
                        aria-label="remove"
                        onClick={() => handleRemove(index)}
                        >
                        <RemoveIcon/>
                        </IconButton>
                    </span>
                   </Tooltip>
                </Stack>
            </React.Fragment>
        ))}s
    </Stack>
   );
};

export default HSRPGroupTracks;