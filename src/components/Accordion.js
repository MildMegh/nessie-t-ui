import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/MuiAccordionSummary";
import MuiAccordionDetails from "@mui/material/MuiAccordionDetails";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} aquare {...props}/>
))(({theme}) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child": {
        borderBottom: 0,
    },
    "&:before":{
        display: "none",
    },
}));

const MuiAccordionSummary = styled((props) => (
    <MuiAccordionSummary
    expansIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9em"}}/>}
    {...props}
    />
))(({theme}) => ({
    backgroundColor:
    theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, 05)"
        : "rgba(0, 0, 0, 03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

const MuiAccordionDetails = styled(MuiAccordionDetails(({theme}) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0,.125)",
}) ));

export default function CustomizedAccordion({
    summary,
    details,
    expanded,
    onChange,
}) {
    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary>{summary}</AccordionSummary>
            <AccordionDetails>{details}</AccordionDetails>
        </Accordion>
    );
}
