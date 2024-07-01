import React from "react";
import { Grid, Box } from "@mui/material";
import PrevNextStep from "../domain/service-request/activities/PrevNextStep";
import ImportExport from "../domain/service-request/activities/ImportExport";
import ImportExportJson from "./ImportExportJson";

const ServiceActivityButtons = ({ activityId, isValid, disableImportExport, importExportFileType = 'xls'}) => {
    return (
        <Box
        sx={{
            position: "fixed",
            bottom: 80,
            left: 0,
            right: 0,
            height: "50px",
            padding: "10px",
        }}
        elevation={3}
        >
            <Grid container justifyContent="space-between" alignItems="center" sx={{ paddingTop: 2,  paddingLeft: 1.25, paddingRight: 1.25}}>
                {activityId && (
                  <Grid item xs={6}>
                    <Grid container justifyContent="flex-start">
                        <Grid item>
                            {importExportFileType === 'json' ?
                            <ImportExportJson activityId={activityId} disableImportExport={disableImportExport}/>:
                            <ImportExport activityId={activityId} disableImportExport={disableImportExport}/>
                            }
                        </Grid>
                   </Grid>
                </Grid>      
                )}
                <Grid item xs={activityId ? 6: 12}>
                    <Grid container justifyContent={activityId ? "flex-end" : "center"}>
                        <Grid item>
                            <PrevNextStep isValid={isValid}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ServiceActivityButtons;