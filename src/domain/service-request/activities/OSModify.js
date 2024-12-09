import { useContext , useState } from "react";

import { Stack, TextField, MenuItem } from "@mui/material";
import AddRemoveCopy from "./AddRemoveCopy";
import { JobContext } from "../../../context/JobContext";
import ContainerHeight from "../../../components/ContainerHeight";
import ServiceActivityButton from "../../../components/ServiceActivityButtoms";
import { NetworkDevice } from "../../../components/NessieUIFieldLibrary";
import { is } from "express/lib/request";

const OSModify = ({ activityId }) => {

    const [errors, setErrors] = useState({});
    const { getJobParams, updateJobParam, updateJobParams } = useContext(JobContext);
    const params = getJobParams(activityId);

    const handleInputChange = (rowId, event) => {
        const { name, value } = event.target;
        if (name === "fileType") {
            if (value === "osd") {
                updateJobParams(activityId, rowId, [
                    { name: "epldImage", value: ""},
                    { name: "smuRpm", value: ""},
                    { name: name, value: value},
                ]);
            } else if (value === "epld") {
                updateJobParams(activityId, rowId, [
                    { name: "osImage", value: ""},
                    { name: "targetOs", value: ""},
                    { name: "currentImage", value: ""},
                    { name: "currentOs", value: ""},
                    { name: "smuRpm", value: ""},
                    { name: name, value: value},
                ]);
            } else if (value === "smu") {
                updateJobParams(activityId, rowId, [
                    { name: "osImage", value: ""},
                    { name: "targetOs", value: ""},
                    { name: "currentImage", value: ""},
                    { name: "currentOs", value: ""},
                    { name: "epldImage", value: ""},
                    { name: name, value: value},
                ]);
            }  
        } else {
            updateJobParam(activityId, rowId, name, value);
        }


    };



    const isValid = () => {
        const errors = {};
        let NetworkDeviceFileType = {}

        params.forEach((row) => {
            if (row.NetworkDevice && row.fileType) {
                let key = row.NetworkDevice.toLowerCase() + row.fileType.toLowerCase();
                if (NetworkDeviceFileType[key]) {
                    NetworkDeviceFileType[key]++;
                } else {
                    NetworkDeviceFileType[key] = 1;
                }
            }
        })

        params.forEach((row) => {
            let key = row.NetworkDevice.toLowerCase() + row.fileType.toLowerCase();
            if (!row.NetworkDevice) {
                errors[`networkDevice${row.rowId}`] = "Required";
            }

            if(NetworkDeviceFileType[key] > 1) {
                errors[`networkDevice${row.rowId}`] = "Duplicate Network Device + File Type";
                errors[`fileType${row.rowId}`] = " ";
            }

            if (!row.fileType) {
                errors[`fileType${row.rowId}`] = "Required";
            }

            if (row.fileType === "osd") {
                if (!row.osImage) {
                    errors[`osImage${row.rowId}`] = "Required";
                }
                if (!row.targetOs) {
                    errors[`targetOs${roe.rowId}`] = "Required";
                }
                if (!row.currentImage) {
                    errors[`currentImage${roe.rowId}`] = "Required";
                }
                if (!row.currentOs) {
                    errors[`currentOs${roe.rowId}`] = "Required";
                }
            } else if (row.fileType === "epld") {
                if (!row.epldImage) {
                    errors[`epldImage${row.rowId}`] = "Required";
                }
            } else if (row.fileType === "smu") {
                if (!row.smuRpm) {
                    errors[`smuRpm${row.rowId}`] = "Required";
                }
            }
        });

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div>
            <ContainerHeight>
                {params.map((activity, i) => {
                    return (
                        <Stack key={i} direction="row" marginTop="10px" spacing={1}>
                            <NetworkDevice
                                activity={activity}
                                handleError={errors}
                                handleChange={handleInputChange}
                            />

                            <TextField
                                label="File Type"
                                name="fileType"
                                error={!!error[`fileType${activity.rowId}`]}
                                helperText={errors[`fileType${activity.rowId}`]}
                                placeholder=""
                                FormHelperTextProps={{ 'data-testid': `${activity.rowId}-fileType-error` }}
                                required
                                value={activity.fileType}
                                inputProps={{
                                    "data-testid": `${activity.rowId}-input-fileType`,
                                }}
                                select
                                sx={{ width: "150px" }}
                                onChange={(e) => handleInputChange(activity.rowId, e)}
                                variant="outlined"
                            >
                                <MenuItem value={"osd"}>OSD</MenuItem>
                                <MenuItem value={"epld"}>EPLD</MenuItem>
                                <MenuItem value={"smu"}>SMU</MenuItem>
                            </TextField>

                            {activity.fileType === "osd" && (
                                <>
                                    <TextField
                                        label="OS Image"
                                        name="osImage"
                                        error={!!errors[`osImage${activity.rowId}`]}
                                        helperText={errors[`osImage${activity.rowId}`]}
                                        FormHelperTextProps={{ 'data-testid': `${activity.rowId}-osImage-error` }}
                                        placeholder="Ex. nxos.9.3.11.bin"
                                        value={activity.osImage.replace(/\s/g,'')}
                                        required
                                        sx={{ width: "150px"}}
                                        inputProps={{ "data-testid": `${activity.rowId}-input-osImage` }}
                                        onChange={(e) => handleInputChange(activity.rowId, e)}
                                        variant="outlined"
                                    />
                                     <TextField
                                        label="Target OS"
                                        name="targetOs"
                                        error={!!errors[`targetOs${activity.rowId}`]}
                                        helperText={errors[`targetOs${activity.rowId}`]}
                                        FormHelperTextProps={{ 'data-testid': `${activity.rowId}-targetOs-error` }}
                                        placeholder="Ex. nxos.9.3.11.bin"
                                        value={activity.targetOs.replace(/\s/g,'')}
                                        required
                                        sx={{ width: "150px"}}
                                        inputProps={{ "data-testid": `${activity.rowId}-input-targetOs` }}
                                        onChange={(e) => handleInputChange(activity.rowId, e)}
                                        variant="outlined"
                                    />
                                     <TextField
                                        label="Current Image"
                                        name="currentImage"
                                        error={!!errors[`currentImage${activity.rowId}`]}
                                        helperText={errors[`currentImage${activity.rowId}`]}
                                        FormHelperTextProps={{ 'data-testid': `${activity.rowId}-currentImage-error` }}
                                        placeholder="Ex. nxos.9.3.11.bin"
                                        value={activity.currentImage.replace(/\s/g,'')}
                                        required
                                        sx={{ width: "150px"}}
                                        inputProps={{ "data-testid": `${activity.rowId}-input-currentImage` }}
                                        onChange={(e) => handleInputChange(activity.rowId, e)}
                                        variant="outlined"
                                    />
                                     <TextField
                                        label="Current OS"
                                        name="currentOs"
                                        error={!!errors[`currentOs${activity.rowId}`]}
                                        helperText={errors[`currentOs${activity.rowId}`]}
                                        FormHelperTextProps={{ 'data-testid': `${activity.rowId}-currentOs-error` }}
                                        placeholder="Ex. nxos.9.3.11.bin"
                                        value={activity.currentOs.replace(/\s/g,'')}
                                        required
                                        sx={{ width: "150px"}}
                                        inputProps={{ "data-testid": `${activity.rowId}-input-currentOs` }}
                                        onChange={(e) => handleInputChange(activity.rowId, e)}
                                        variant="outlined"
                                    />
                                </>
                            )}

                            {activity.fileType === "epld" && (
                                 <TextField
                                 label="EPLD Image"
                                 name="epldImage"
                                 error={!!errors[`${activity.rowId}`]}
                                 helperText={errors[`epldImage${activity.rowId}`]}
                                 FormHelperTextProps={{ 'data-testid': `${activity.rowId}-epldImage-error` }}
                                 placeholder="Ex. nxos.9.3.11.bin"
                                 value={activity.currentOs.replace(/\s/g,'')}
                                 required
                                 sx={{ width: "150px"}}
                                 inputProps={{ "data-testid": `${activity.rowId}-input-epldImage` }}
                                 onChange={(e) => handleInputChange(activity.rowId, e)}
                                 variant="outlined"
                             />
                            )}

                            {activity.fileType === "smu" && (
                                <TextField
                                label="SMU RPM"
                                name="smuRpm"
                                error={!!errors[`${activity.rowId}`]}
                                helperText={errors[`smuRpm${activity.rowId}`]}
                                FormHelperTextProps={{ 'data-testid': `${activity.rowId}-smuRpm-error` }}
                                placeholder="Ex. nxos.9.3.11.bin"
                                value={activity.smuRpm.replace(/\s/g,'')}
                                required
                                sx={{ width: "150px"}}
                                inputProps={{ "data-testid": `${activity.rowId}-input-smuRpm` }}
                                onChange={(e) => handleInputChange(activity.rowId, e)}
                                variant="outlined"
                            />
                        )}

                        <AddRemoveCopy
                            key={activity.rowId}
                            rowId={activity.rowId}
                            activityId={activityId}
                            showPreview={false}
                        />
                    </Stack>
                    );
                })}
            </ContainerHeight>
            <ServiceActivityButton activityId={activityId} isValid={is} disableImportExport={false} importExportFileType="json"/>
        </div>
    );
};

export default OSModify;