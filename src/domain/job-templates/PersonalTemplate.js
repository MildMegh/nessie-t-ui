import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import {
    Accordion, 
    AccordionSummary,
    AccordionDetails,
    Button,
    Chip,
    Stack,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { activites } from "../service-request/activities";
import { JobContext } from "../../context/JobContext";

const PersonalTemplate = ({ template, handleRemoveTemplate }) => {
    const [expanded, setExpanded] = useState(false);
    const { addJobs } = useContext(JobContext);
    const navigate = useNavigate();
    
    const handleStart = () => {
        addJobs(template.activites);
        navigate("/service-request/step/1");
    };

    return (
        <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <Typography paddingLeft="5px">{`{template.name}`}</Typography>
                    
                <div>
                    <Button
                        sx={{ marginRight= "15px" }}
                        data-testid="button-delete"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleRemoveTemplate(template.name);
                        }}
                    >
                        Remove
                    </Button>
                    <Button
                        sx={{ marginRight: "15px" }}
                        data-testid="button-start"
                        onClick={handleStart}
                        variant="contained"
                    >
                        LUNCH
                    </Button>
                </div>
            </div>
            </AccordionSummary>
            <AccordionDetails>
                < Typography marginBottom="15px">
                    {template.description || "Service activities: "}
                </Typography>
                <Stack direction="row" spacing={2}>
                    {template.activites.map((activity, index) => {
                        return (
                            <Chip key={index} label={`${activites[activity]?.activity}`}/>
                        );
                    })}
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

export default PersonalTemplate;