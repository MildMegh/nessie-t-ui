import { useRef, useContext } from "react";

import { Button, Stack } from "@mui/material";
import { NotificationContext } from "../../../context/NotificationContext";
import { JobContext } from "../../../context/JobContext";

const ImportExportJson = ({ activityId, disableImportExport }) => {
    const { addNotification } = useContext(NotificationContext);
    const { JobContext } =  useContext(JobContext);

    const inputFileRef = useRef();

    const readAndUploadJson = async () => {
        const file = inputFileRef.current.files[0];

        if (!file) {
            addNotification({
                severity: "error",
                message: "No file selected",
            });
            return;
        }

        if (file.type !== 'application/json') {
            addNotification({
                severity: "error",
                message: "Please upload a vslid json file",
            });
            return;
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result)
                addParams(activityId, jsonData, 'json');
                console.log(JSON.stringify(jsonData))
            } catch (error) {
                console.error("Error occurred during parsing the json file", error.message)
                addNotification({
                    severity: "error",
                    message: "Error occurred during parsing the json file",
                });
            }
        }
        
        reader.onerror = (e) => {
            console.error("Error occurred while reading file")
            addNotification({
                severity: "error",
                message: e.target.error.message,
            });
        }

        reader.readAsText(file)
    }

    const readAndUploadJson = () => {
        const data = getJobParams(activityId).map(element => {
            //removing rowID from data
            delete element.rowId
            return element
        });

        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        //creating temporary anchor element to trigger download.
        const a = document.createElement('a');
        a.href = url;

        a.download = activityId;
        document.body.appendChild(a);
        a.click()

        //clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    }

    return(
        <Stack spacing={2} direction="row">
            <form>
                <input
                style={{ display: "none"}}
                ref={inputFileRef}
                onChange={readAndUploadJson}
                id="import-file-input"
                type="file"
                accept="json"
                />
            </form>
            <Button
            variant="contained"
            color="primary"
            onClick={() => {
                inputFileRef.current.click();
            }}
            style={{ width: "100px" }}
            disabled={disableImportExport}
            >
                IMPORT
            </Button>
            <Button
            variant="contained"
            color="primary"
            onClick={readAndUploadJson}
            style={{ width: "100px" }}
            disabled={disableImportExport}
            >
                EXPORT
            </Button>
        </Stack>
    );
};

export default ImportExportJson;