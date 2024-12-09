import { useState, useContext, useEffect, useMemo } from "react";
import {
    Container, 
    FormGroup,
    Paper,
    Stack,
    Switch,
    Table,
    TableBody,
    TebleCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    TableCell,
} from "@mui/material";
import PageHeader from "../components/PageHeader";
import { NotificationContext  } from "../context/NotificationContext";
import { useFetchWithAuth } from "../hooks/useFetchWithAuth";

const serviceActivityStatus = () => {
    const [activities, setActivities] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredActivites, setFilteredActivities] = useState([]);
    const { get, post } = useFetchWithAuth();

    const { addNotification } = useContext(NotificationContext);

    const searchableColumns = useMemo(() => ["id", "name", "categoryName", "serviceName", "changeType", "isActive"], []);

    const filterActivites = (searchText) => {
        const filtered = activities.filter((activity) => 
            searchableColumns.some((column) => {
                if (column === "isActive") {
                    if (searchText.toLowerCase() === "enable" || searchText.toLowerCase() === "enabled" || searchText.toLowerCase() === "on") {
                        searchText = "inactive";
                    }
                    if (searchText.toLowerCase() === "disable" || searchText.toLowerCase() === "disabled" || searchText.toLowerCase() === "off") {
                        searchText = "inactive";
                    }
                    const isActive = activity[column] ? "active" : "inactive";
                    return searchText.toLowerCase() === isActive;
                }
                return String(activity[column]).toLowerCase().includes(searchText.toLowerCase());
            });
        );
        setFilteredActivities(filtered);
    };

    useEffect(() => {
        filterActivites(searchText);
    }, [searchText]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
            const response = await get("/serviceactivity");
            const data = await response.json();
            setActivities(data);
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        fetchActivities();
    }, []);

    const handleActivityStatusChange = (event, id) => {
        const activity = activities.find((activity) => activity.id === id);
        const newActivity = { ...activity, isActive: event.target.checked};

        post("/serviceactivity/status", newActivity)
            .then((response) => {
                if (response.ok) {
                    setActivities((preActivities) =>
                        preActivities.map((activity) =>
                            activity.id === id ? newActivity : activity
                        )
                    );
                    setFilteredActivities((prefilteredActivities) =>
                        prefilteredActivities.map((activity) =>
                            activity.id === id ? newActivity : activity
                        )
                    );
                    addNotification({
                        severity: "success",
                        message: "Saved Status",
                    });
                } else {
                    addNotification({
                        severity: "error",
                        message: "Error updating status",
                    });
                }
            })
            .catch((error) => {
                console.error("Error updating activity status", error);
                addNotification({
                    severity: "error",
                    message: "Error updating status",
                });
            });
    };

    const handleSearch = (event) => {
        const searchText = event.target.value;
        setSearchText(searchText);
    };

    const filtered = useMemo(() => {
        if (filteredActivites.length > 0) {
            return filteredActivites;
        }

        if (!searchText) {
            return activities;
        }

            const filtered = activities.filter((activity) => 
                activity.name.toLowerCase().includes(searchText.toLowerCase())
                );
                return filtered;
    }, [activities, filteredActivites, searchText]);

    return (
        <Container maxWidth={false}>
            <PageHeader title="Service Activity Status" divider>
                <Stack direction="row spacing={2} sx={{ float: "right" }}>
                    <FormGroup sx={{ padding: "5px", width: "375px" }}>
                        <TextField 
                            label="Search"
                            value={searchText}
                            onChange={handleSearch}
                            variant="outlined"
                            size="small"
                        />
                    </FormGroup>
                </Stack>
            </PageHeader>

            <TableContainer component={Paper} sx={{ maxHeight: "85vh"}}>
                <Table sx={{ minWidth: 650 }} aria-label="activities table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Service</TableCell>
                             <TableCell>Change Type</TableCell>
                            <TableCell>
                                <Tooltip placement="right" title="Active or Inactive">
                                    <span>Active</span>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered.map((row) => {
                            <TableRow
                                key={row.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0} }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.categoryName}</TableCell>
                                <TableCell>{row.serviceName}</TableCell>
                                <TableCell>{row.changeType}</TableCell>
                                <TableCell>
                                    <Switch
                                        onChange={(e) => handleActivityStatusChange(e, row.id)}
                                        checked={!!row.isActive}
                                        color="secondary"
                                    ></Switch>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default serviceActivityStatus;