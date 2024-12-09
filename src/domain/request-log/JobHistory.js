import { Fragment } from "react";

import { Grid, Typography } from "@mui/material";
import StatusIcon from "./StatusIcon";
import { useFlag} from '@unleash/proxy-client-react';

const JobHistory = ({ JobStatus }) => {
    const changeEnabled = useFlag('toggle-change');
    return (
        <Fragment>
            <Grid container justifyContent="left">
                <Grid item>
                    <StatusIcon status={jobStatus.validationStatus} />
                </Grid>
                <Grid marginLeft="10px" item align={"left"}>
                    <Typography marginBotton={"-7px"} variant="subtitle1">
                        Request Validation
                    </Typography>
                </Grid>
            </Grid>
            <Grid marginTop="20px" container justifyContent="left">
                <Grid item>
                    <StatusIcon status={jobStatus?.techReviewStatus} />
                </Grid>
                <Grid marginLeft="10px" item align={"left"}>
                    <Typography marginBotton={"-7px"} variant="subtitle1">
                        Ansible Validation
                    </Typography>
                </Grid>
            </Grid>
            <Grid marginTop="20px" container justifyContent="left">
                <Grid item>
                    <StatusIcon status={jobStatus?.createChangeRecordStatus} />
                </Grid>
                <Grid marginLeft="10px" item align={"left"}>
                    <Typography marginBotton={"-7px"} variant="subtitle1">
                        {changeEnabled ? 'Pier Change Record' : 'Change Record'}
                    </Typography>
                </Grid>
            </Grid>
            <Grid marginTop="20px" container justifyContent="left">
                <Grid item>
                    <StatusIcon status={jobStatus?.createInventoryStatus} />
                </Grid>
                <Grid marginLeft="10px" item align={"left"}>
                    <Typography marginBotton={"-7px"} variant="subtitle1">
                        Ansible Inventory
                    </Typography>
                </Grid>
            </Grid>
            <Grid marginTop="20px" container justifyContent="left">
                <Grid item>
                    <StatusIcon status={jobStatus?.implementationStatus} />
                </Grid>
                <Grid marginLeft="10px" item align={"left"}>
                    <Typography marginBotton={"-7px"} variant="subtitle1">
                        Implement Change
                    </Typography>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default JobHistory;