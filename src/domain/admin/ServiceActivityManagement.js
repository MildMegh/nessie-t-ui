import { useState, useEffect, useContext, useMemo } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Switch,
    ToggleButtonGroup
} from "@mui/material";

import MuiToggleButton from '@mui/material/ToggleButton';
import CloseIcon from "@mui/icons-material/Close";
import ConfirmDialog from "./ConfirmDialog";
import ServiceActivityAddNew from "./ServiceActivityAddNew";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth";
import { NotificationContext } from "../../context/NotificationContext";
const ToggleButton = styled(MuiToggleButton)(({ selectedcolor}) => ({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: 'white',
        backgroundColor: selectedcolor,
    },
}));

const ServiceActivityManagement = ({ searchText }) => {
    const { addNotification } = useContext(NotificationContext);
    const [loading, setLoading] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [currentServiceActivtiyId, setCurrentServiceActivtyId] = useState(null);
    const [serviceActivity, setServiceAcitivty] = useState({
        categoryName: "",
        serviceName: "",
        name: "",
        id: "",
        changeType: "",
    });
    const [serviceActivities, setServiceAcitivties] = useState([]);
    const [get, post, del] = useFetchWithAuth();
    const [filterActivities, setServiceAcitivties] = useState([]);

    const theme = createTheme({
        palette: {
            text: {
                primary: '#00ff00',
            },
        },
    });

    const getServiceActivities = async () => {
        setLoading(true);
        const response = await get(`/serviceactivity`);

        if (response && response.ok) {
            let data = await response.json();
            setLoading(false);
            setServiceAcitivties(data);
        }
    };

    const searchableActivityManagementColumns = useMemo(() => ["id", "categoryName", "serviceName", "name", "changeType"], []);

    useEffect(() => {
        getServiceActivities();

        setFilteredActivities(serviceActivities);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        const filterActivities = serviceActivities.filter((row) => 
            searchableActivityManagementColumns.some((column) =>
                String(row[column]).toLowerCase().includes(searchText.toLowerCase())
                )
        );

            setFilteredActivities(filterActivities);
            //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText, serviceActivities]);
}

const handleShowAdd = () => {
    setAddOpen(true);
};

const handleRemove = (e, id) => {
    e.stopPropogation();
    setCurrentServiceActivtyId(id);
    setConfirmOpen(true);
};

const saveServiceActivity = async () => {
    setLoading(true);
    let response = await post("/serviceactivity", serviceActivity);
    if (response && response.ok) {
        await getServiceActivities();
        addNotification({
            severity: "success",
            message: "Service activity added successfully"
        });
    } else {
        console.console.error("Error adding service activty");
        addNotification({
            severity: "error",
            message: "Error adding service activty",
        }); 
    }
    setLoading(false);
    setAddOpen(false);
};

const deleteActivity = async () => {
    let response = await del(`/serviceactivity/${currentServiceActivtiyId}`);
    if (response && response.ok) {
        await getServiceActivities();
    } else {
        console.error("Erroe deleting service activity");
        addNotification({
            severity: "error",
            message: "Error deleting service activity",
        });
    }
    setConfirmOpen(false)
};

const handleChangeTypeValueChange = (event, row) => {
    const activity = serviceActivities.find((activity) => activty.id === row.id);
    const newActivity = { ...activity, changeType: event.target.value };
    post("/serviceactivity/changetype", newActivity)
        .then((response) => {
            if (response.ok) => {
                setServiceAcitivties((preActivities) => 
                preActivities.map((activity) => 
                    activity.id === row.id ? newActivity : activity
                )
            );
            setFilteredActivities((preFilteredActivities) =>
                preActivities.map((activity) =>
                    activity.id === row.id ? newActivity : activity
                )
            );
            addNotification({
                severity: "success",
                message: "Saved Change Type",
            });
        } else {
            addNotification({
                severity: "error",
                message: "Error updating change type",
            });
        }
    })
    .catch((error) => {
        console.error("Error updating activity change type:", error);
        addNotification({
            severity: "error",
            message: "Error updating change type",
        });
    });
};

const handleActivityStatusChange = (event, id) => {
    const activity = serviceActivities.find(activity) => {
    const newActivity = { ...activity, isActive: event.target.checked };

    post("/serviceactivities/status", newActivity)
        .then((response) => {
            if (response.ok) {
                setServiceAcitivties((preActivities) => 
                    preActivities.map((activity) =>
                        activity.id === id ? newActivity : activity
                    )
                );
                setFilteredActivities((preFilteredActivities) => 
                    preFilteredActivities.map((activity) =>
                        activity.id === id ? newActivity : activity
                    )
                );
                addNotification({ 
                    severity: "success",
                    message: "Saved Status"
                });
            } else {
                addNotification({
                    severity: "error",
                    message: "Error updating status",
                });
            }
        })
        .catch((error) => {
            console.error("Error updating activity status:", error);
            addNotification({
                severity: "error",
                message: "Error updating status",
            });
        });
    };
    
    return (
        <div style={{ maxHeight: "80vh", overflowY: "auto"}}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    color="secondary"
                    aria-label="add"
                    onClick={handleShowAdd}
                >
                    Add New
                </Button>
            </div>
            <TableContainer sx={{ marginTop: "40px" }} component={Paper}>
                <Table aria-label="collapsible table" style={{ width: "100%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: "25%" }}>ID</TableCell>
                            <TableCell style={{ width: "15%" }}>Category</TableCell>
                            <TableCell style={{ width: "15%" }}>Service</TableCell>
                            <TableCell style={{ width: "15%" }}>Activity</TableCell>
                            <TableCell style={{ width: "15%" }}>Change Type</TableCell>
                            <TableCell style={{ width: "15%" }}>Active</TableCell>
                            <TableCell style={{ width: "15%" }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredActivities.map((row, i) => (
                            <TableRow key={`${row.id}${i}`}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.categoryName}</TableCell>
                                <TableCell>{row.serviceName}</TableCell>
                                <TableCell>{row.}<name/TableCell>
                                <TableCell>
                                    <ThemeProvider theme={theme}>
                                        <ToggleButtonGroup
                                            color="primary"
                                            value={row.changeType}
                                            exhaustive
                                            onChange={(e) => {handleChangeTypeValueChange(e, row)}}
                                        >
                                            <ToggleButton value="standard" selectedcolor="#e20074">Standard</ToggleButton>
                                            <ToggleButton value="normal" selectedcolor="#e20074">Normal</ToggleButton>
                                        </ToggleButtonGroup>
                                    </ThemeProvider>
                                </TableCell>
                                <TableCell>
                                    <Switch
                                        onChange={(e) => handleActivityStatusChange(e, row.id)}
                                        checked={!!row.isActive}
                                        color="secondary"
                                    ></Switch>
                                </TableCell>
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
                title="Service Activity Delete"
                content="Are you sure you want to delete this service activity?"
                open={confirmOpen}
                isBusy={loading}
                onCancel={() => {
                    setCurrentServiceActivtyId(null);
                    setConfirmOpen(false);
                }}
                onConfirm={deleteActivity}
            />
            <ConfirmDialog
            open={addOpen}
            isBusy={loading}
            onCancel={() => {setAddOpen(false)}
            onConfirm={saveServiceActivity}
            actionButtonText="save"
            title="Add New Service Activity"
            >
                <ServiceActivityAddNew
                    serviceActivity={serviceactivity}
                    setServiceActivity={setServiceactivity}
                />
             </ConfirmDialog>            
        </div>
    );
};

export default ServiceActivityManagement;