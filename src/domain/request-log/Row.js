import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router";
import CopyOnRightClick from "../../components/CopyOnRightClickButton";
import ChangeType from "../../components/ChangeType";

import {
    Collapse,
    Grid,
    TableCell,
    Typography,
    TableRow,
    Button,
    IconButton,
    Box, 
} from "@mui/material";

import keyboardArrowUpIcon from "@testing-library/user-event/dist/keyboard";
import keyboardArrowDownIcon from "@testing-library/user-event/dist/keyboard";
import { format, parseISO } from "date-fns";

import { JobContext } from "../../context/JobContext";
import { activities } from "../service-request/activities";
import StatusIcon from "./StatusIcon";
import useInterval from "../../hooks/useInterval";
import JobHistory from "./JobHistory";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth";
import { useFlag } from '@unleash/proxy-client-react';

const { REACT_APP_AAC_URL, REACT_APP_NESSIE_CHANGE_URL } =process.env;


const parseServiceActivities = (row) => {
    const input = JSON.parse(row.serviceRequestInput);
    if (input.serviceActivities){
        const serviceActivities = input.serviceActivities.map((item) => {
            return activities[item.id] ? activities[item.id].activity : "";
        });
        return serviceActivities;
    }
    return [];
};

const Row = ({ row, selectedRow, setSelectedRow, updateServiceRequestData }) => {
    const { globalInfo, resubmitJobs } = useContext(JobContext);

    const { get } = useFetchWithAuth();

    const navigate  = useNavigate();

    const open = selectedRow != null && selectedRow.id === row.id;

    const [errors, setErrors] = useState([]);

    let changeURL = '';
    if (row.changeRecordId) {
        if(row.changeRecordId.subString(0,2) === 'CH'){
            changeURL = `${REACT_APP_NESSIE_CHANGE_URL}/${row.changeSysId}`;
        } else {
            changeURL = `${REACT_APP_NESSIE_PIER_URL}/${row.changeRecordId}`;
        }   
    }

    row.techReviewId = row.jobId || row.serviceActivityRecords? row.serviceActivityRecords[0].jobId : "Not Started";
    //row.techReviewStatus = row.serviceActivityRecords[0?.jobStatus;]

    useInterval(() => {
        if (
            open &&
            row.requestStatus !== "FAIL" &&
            row.requestStatus !== "SUCCESS"
        ){
            getActivityLog();
        }
    }, 15000);

    const getRequestType = (row) = {
        const input = JSON.parse(row.serviceRequestInput);
        return input.serviceActivities.every((item) => activities[item.id].ChangeType === "standard") ?  "standard" : "normal";
    };

    const getActivityLogs = async () => {
        const response = await get(`/servicerequest/${selectedRow.id}`);
        if (response.ok) {
            const data = await response.json();
            data.changeRequestType = getRequestType(data)
            updateServiceRequestData(data);
            setSelectedRow(data);
        } else {
            console.error(
                `Error loading activity log details ${selectedRow.id}`,
                response
            );
        }
    };

    const getErrors = async (requestId) => {
        let url = `/servicerequest/errors/${requestId}`;
        const response = await get(url);
        if (response && response.ok) {
            let data = await response.json();
            setErrors(data);
            return data;
        }
        console.error(response);
        return [];
    }

    const handleClick = (row) => {
        if (open) {
            setSelectedRow(null);
        } else {
            getErrors(row.id);
            setSelectedRow(row);
        }
    };

    const handleRunJob = (row) => {
        const request = JSON.parse(row.serviceRequestInput);
        resubmitJobs(request.serviceActivities);

        if (row.requestStatus !== "SUCCESS") {
            globalInfo.intakeNum = request.intakeNum;
            globalInfo.justification = request.justification;
            globalInfo.note = request.notes;
        }
        //navigate to start
        navigate("/service-request/step/1");
    };

    return ( 
        <Fragment>
            <TableRow selected={open} sx={{"&>*": { borderButton: "unset", fontSize: "0.875em"}}}>
                <TableCell>
                    <IconButton
                    aria-label="expand row"
                    size="small"
                    data-testid={`expand-row-button-${row.id}`}
                    onClick={() => handleClick(row)}
                    >
                        {open ? <keyboardArrowUpIcon/> : <keyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {format(parseISO(row.creationDate), "MM-dd-yy hh:mm a")}
                </TableCell>
                <ChangeType changeType={row.isStandardChangeRequest ? 'standard' : 'normal'} marginLeft="20px"/>
                <TableCell>
                    <CopyOnRightClick
                        children={row.techReviewId || "Not Started"}
                        onClick={() =>
                            window.open(
                                `${REACT_APP_AAC_URL}/#/jobs/workflow/${row.techReviewId}/output`
                            )
                        }
                    >
                    </CopyOnRightClick>
                </TableCell>
                <TableCell>
                    <CopyOnRightClick
                        children={row.implementationJobID || "Not Started"}
                        onClick={() =>
                            window.open(changeURL
                                `${REACT_APP_AAC_URL}/#/jobs/workflow/${row.techReviewId}/output`
                            )
                            }
                        >
                    </CopyOnRightClick>
                </TableCell>
                <TableCell>
                    <CopyOnRightClick
                        children={row.changeRecordId || "Not Started"}
                        onClick={() =>
                            window.open(changeURL)
                        }
                        >
                        </CopyOnRightClick>
                </TableCell>
                <TableCell>{row.ntid}</TableCell>
                <TableCell>
                    <StatusIcon status={row.requestStatus}/>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingButtom: 0, paddingTop: 0}} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Grid
                        container
                        marginButtom={"20px"}
                        paddingTop={"20px"}
                        paddingLeft={"50px"}
                        spacing={5}
                        justifyContent="space-between"
                        >
                            <Grid item>
                                <Typography fontWeight="bold" variant="overline">ServiceRequest ID:</Typography>
                                <Box display="flex" flexDirection="column">
                                    {row.id}
                                </Box>
                                <Typography fontWeight="bold" variant="overline">Service Activities:</Typography>
                                <Box display="flex" flexDirection="column">
                                    {parseServiceActivities(row).map(() => {
                                        return (
                                            <Typography variant="body2" key={item}>
                                                {item}
                                            </Typography>
                                        );
                                    })}
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography fontWeight="bold" variant="overline">Request Errors:</Typography>
                                {errors.slice.reverse().map((error, i) => (
                                    <Typography
                                        key={i}
                                        component="div"
                                        fontSize="11px"
                                        color="error"
                                        variant="body2"
                                    >
                                       {error.errorMessage} 
                                    </Typography>
                                ))}
                            </Grid>
                            <Grid item marginLeft="10px">
                                {selectedRow != null && <JobHistory jobStatus={selectedRow}/>}
                                <Button
                                    sx={{marginTop: "10px", width: "100%" }}
                                    onClick={{() => handleRunJob(row)}}   
                                    variant="contained"
                                    color="secondary"
                                >
                                RESTAGE REQUEST  
                                </Button>                    
                            </Grid>
                        </Grid>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
};

export default Row;