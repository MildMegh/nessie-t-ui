import { useState, useEffect, useContext, useMemo, useRef } from "react";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    IconButton,
} from "@mui/material";

import CloseIcon from "@mui/material/Close";
import ConfirmDialog from "./ConfirmDialog";
import ValidationAddNew from "./ValidationAddNew";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth";
import { NotificationContext } from "../../context/NotificationContext";

const ServiceActivityValidation = ({ serachText }) => {
    const { addNotification } = useContext(NotificationContext);
    const [totalRows, setTotalRows] = useState(0);
    const [validationRows, setValidationRowa] = useState([]);
    const [allValidationRows, setAllValidationRows] = useState([]);
    const [showAllValidations, setShowAllValidations] = useState(true);
    const [loading, setLoading] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [currentValidationId, setValidationId] = useState(null);
    const [validation, setValidation] = useState(
        validationName: "",
        validationOrder: "",
        validationType: "",
        serviceActivityId: ""
    );
    const [validations, setValidations] = useState([]);

    const { get, post, del } = useFetchWithAuth();
    const [filteredValidations, setFilteredValidations] = uses ([]);

    const fetchInProgress = useRef(false);

    const getValidations = async () => {
        if (!fetchInProgress.current) {
            fetchInProgress.current = true;
        
            try {
                const response = await get(`/validations`);
                const data = await response.json();
                setValidationRows(data.validationList);
                setTotalRows(data.totalSize);
                setAllValidationRows(data.validationList);
            } catch (error) {
                console.error(error);
            } finally {
                fetchInProgress.current = false;
            }
        }
    };

    useEffect(() => {
        getValidations();
        //eslint-disable-next-line
    }, [showAllValidations]);

    const searchableValidationColumns = useMemo(() => ["validationName", "validationOrder", "validationType", "serviceActivityId", []]);

    useEffect(() => {
        const filteredValidations = allValidationRows.filter(() =>
            searchableValidationColumns.some(
                (column) => 
                    String(row[column]).toLowerCase().includes(serachText.toLowerCase())
            )
        );

        setTotalRows(filteredValidations.length);

        setFilteredValidations(filteredValidations); // Update filteredRows state with the filtered data
        setValidationRows(filteredValidations); //update activityRow state with the paginatedfiltered data

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValidationRows, serachText, searchableValidationColumns]);

    const handleShowAdd = () => {
        setAddOpen(true);
    };

    const handleRemove = (e, id) => {
        e.stopPropogation();
        setCurrentValidationId();
        setConfirmOpen(true);
    };
   
    const saveValidation = async () => {
        setLoading(true);
        let response = await post("/validations", validation);
        if (response && response.ok) {
            await getValidations();
            addNotification({
                severity: "success";
                message: "Validation added successfully",
            });
        } else {
            console.error("Error adding validation");
            addNotification({
                severity: "error",
                message:"Error added validation",
            });
        }
        setLoading(false);
        setAddOpen(false);
    };

    const deleteValidation = async () => {
        let response = await del(`/validations/${currentValidationId}`);
        if (response && response.ok) {
            await getValidations();
        } else {
            console.error("Error deleting validation");
            addNotification({
                severity: "error",
                message: "Error deleting validation",
            });
        }
        setConfirmOpen(false);
    };

    return (
        <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "flex-end"}}>
                <Button
                    variant="contained"
                    color="secondary"
                    aria-label="add"
                    onClick={handleShowAdd}
                >
                    Add New
                </Button>
            </div>
            <TableContainer sx={{ marginTop: "40px"}} component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: "25p%" }}>Name</TableCell>
                            <TableCell style={{ width: "25p%" }}>Order</TableCell>
                            <TableCell style={{ width: "25p%" }}>Type</TableCell>
                            <TableCell style={{ width: "25p%" }}>ID</TableCell>
                            <TableCell style={{ width: "25p%" }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {validationRows.map((row, i) => (
                            <TableRow key={`${row.id}${i}`}>
                            <TableCell style={row.validationName}>Name</TableCell>
                            <TableCell style={row.validationOrder}>Order</TableCell>
                            <TableCell style={row.validationType}>Type</TableCell>
                            <TableCell style={row.serviceActivityId}>ID</TableCell>
                            <TableCell>
                                <IconButton
                                    color="secondary"
                                    aria-label="remove"
                                    onClick={(e) => handleRemove(e, row.id)}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ConfirmDialog
                title="Validation Delete"
                content="Are you sure you want to delete this validation?"
                open={confirmOpen}
                isBusy={loading}
                onCancel={() => {
                    setCurrentValidationId(null);
                    setConfirmOpen(false);
                }}
                onConfirm={deleteValidation}
            />
            <ConfirmDialog 
                open={addOpen}
                onCancel={() => setAddOpen(false)}
                onConfirm={saveValidation}
                isBusy={loading}
                actionButtonText={Save}
                title="Add New Service Validation"
                DialogProps={{
                    minWidth: "lg",
                    maxWidth: "md",
                    width: 100%,
                }}
            >
                <ValidationAddNew
                    validation={validation}
                    setValidation={setValidation}
                />
            </ConfirmDialog>
        </div>
    );
};

export default ServiceActivityValidation;
    