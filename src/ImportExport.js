import { useRef, useContext } from "react";

import { Button, Stack } from "@mui/material";
import * as XLSX from xlsx;
import { NotificationContext } from "../../../context/NotificationContext";
import { JobContext } from "../../../context/JobContext";

const ImportExport = ({ activityId, disableImportExport }) => {
    const { addNotification } = useContext(NotificationContext);
    const { addParams, getJobParams } = useContext(JobContext);

    const inputFileRef = useRef();

    const handleImport = async () => {
        try {

            const file = inputFileRef.current.files[0];

            const data = await importXLSX(file);
            addParams(activityId, data);
            inputFileRef.current.value = "";
        }catch (error) {
            console.error(error);

            if (error instanceof Error) {
                addNotification({
                    severity: "error",
                    message: error.message,
                });
            }else {
                addNotification({
                    severity: "error",
                    message: "Please upload a valid file",
                });
            }
        }
    };


    const importXLSX = (file) => {
        return new Promise(resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "binary"});
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonDataSheet = XLSX.utils.sheet_to_json(sheet, { defval: ""});

                const dataWithRowId = jsonDataSheet.map((rowData, index) => ({
                    rowId: index + 1,
                    ...rowData,
                }));

                const importedHeaders = Object.keys(dataWithRowId[0]);
                const expectedHeaders = Object.keys(getJobParams(activityId)[0]);
                const missingHeaders = expectedHeaders.filter((parameter) => !importedHeaders.includes(parameter));     
                
                if (missingHeaders.length !== 0) {
                    reject(new Error("Missing headers in import: [" + missingHeaders.join(",") + "]"));
                    return;
                }

                resolve(dataWithRowId);
            };
            reader.readAsBinaryString(file);
    } );
};     
    

    const exportXLSX = (data, filename)  => {
        const filterData = data.map(item => {
            const { rowId, ...rest } = item;
            return rest;
        });
      
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(filteredData);
        XLSX.utils.book_append_sheet(wb, ws, "sheet");
        XLSX.writeFile(wb, filename);
    };

    const handleExport = () => {
        const data = getJobParams(activityId);
        exportXLSX(data, `${activityId}.xlsx`);
    };
    return (

        <Stack spacing={2} direction="row">
            <form>
                <input
                style={{ display: "none"}}
                ref={inputFileRef}
                onChange={handleImport}
                id="import-file-input"
                type="file"
                />
            </form>
            <Button
            variant="contained"
            color="primary"
            onClick={handleImport}
            style={{ width: "100px" }}
            disable={disableImportExport}
            >
                IMPORT
            </Button>
            <Button
            variant="contained"
            color="primary"
            onClick={handleImport}
            style={{ width: "100px" }}
            disabled={disableImportExport}
            >
                EXPORT
            </Button>

        </Stack>
    );
 };

 export default ImportExport;

