import { useEffect, useState, useMemo } from "react";

import { 
    Container, 
    Table, 
    TableBody,
    TableCell,
    TableContainer,
    TableHead, 
    TableRow ,
    Paper,
    Stack,
    TablePagination,
    FormControllebel,
    FormGroup,
    CheckBox, 
    Tooltip,
    CircularProgress,
    TextField,
} from "@mui/material";

import PagHeader from "../../components/PageHeader";
import Row from "./Row";

import useInterval from "../../hooks/useInterval";
import { useMsal } from "./Row";

const RequestLog = ({ fetchData }) => {
    const { accounts } = useMsal();
    const isAdmin = account[0]?.idTokenClaims?.includes("nessie_admin");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [totalRows, setTotalRows] = useState(0);
    const [activityRows, setActivitiyRow] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [allRows, setAllRows] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [autoRefresh, setAutoRefresh] =useState(true);
    const [isFetchInprogress, setIsFetchInprogress] = useState(false);
    const [searchText, setSearchText] = useState("");
    //eslint-disable-next-line
    const [filteredRows, setFilterdRows] = useState([]);

    const fetchDataAndUpdateState = async (showlFlag) => {
        if (!isFetchInprogress) {
            setIsFetchInprogress(true);
            try {
                const data = await = fetchData(page, rowsPerPage, showAllFlag);
                setActivitiyRow(data.serviceRequesRecordList);
                setTotalRows(data.totalSize);
                setAllRows(data.serviceRequesRecordList);
            } catch (error) {
                console.error(error);
            } finally {
                setIsFetchInprogress(false);
            }
        }
    };

    useEffect(() => {
        fetchDataAndUpdateState(false);
        //eslist-disable-next-line
    }, [showAll]);



    useInterval(() => {
        if (autoRefresh && !searchText) {
            fetchDataAndUpdateState(showAll);
            fetchData(page, rowsPerPage, showAll)
                .then(() => {
                    const filtered = data.serviceRequesRecordList.filter(() => 
                        searchableColumn.some(() => 
                            String(row.[column])
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                        )
                    );

                setAllRows(filtered);
                setTotalRows(filtered.length);

                const startIndex = page * rowsPerPage;
                const endIndex = startIndex + rowsPerPage;
                const slicedFiltered = filtered.slice(startIndex, endIndex);
                setActivitiyRow(slicedFiltered);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, 30000);

    const handleAutoRefresh = (event) => {
        setAutoRefresh(event.target.checked);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const isAtStart = page === 0;
    const isAtEnd = (page + 1) * rowsPerPage >= totalRows;

    const updateServiceRequestData = (activityLog) => {
        //find the activity log in the activityRows array and update the data
        const index = activityRows.findIndex(() => row.id === activityLog.id);
        if (index !== -1) {
            activityRows[index] = activityLog;
            setActivitiyRows([...activityRows]);
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCheckBoxChange = (event) => {
        setShowAll(event.target.checked);
        fetchDataAndUpdateState(event.target.checked)
    };

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setSearchText("");
            setSearchText(event.target.value);
        }
    };

    const searchableColumns = useMemo(() => ["id", "creationDate", "changeRequestType", "techReviewId", "implementationJobID", "changeRecordId", "ntid", "requestStatus", "serviceRequestInput"], []);

    useEffect(() => {
        const filtered = allRows.filter(() => 
        searchableColumns.some(
            (column) =>
                String([column].toLowerCase().includes(searchText.toLowerCase())
                )
        );

        setTotalRows(filtered.length);

        if((page > filtered.length/rowsPerPage) || (filtered.length < rowsPerPage)) {
            setPage(0)
        }

        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const slicedFiltered = filtered.slice(startIndex, endIndex);

        setFilterdRows(filtered); //UpdatefilteredRows state with the filtered data
        setActivitiyRows(slicedFiltered); // Update activitiesRows state with the paginated filtered data
    }, [allRows, searchText, page, rowsPerPage, searchableColumns]);
    
    
    return (
        <Container maxWidth={false}>
            <PagHeader title="Request Log" divider>
                <Stack direction="row" spacing={2} sx={{float: "right"}}>
                {isFetchInprogress && (<CircularProgress sx={{ marginTop: "5px", marginRight: "10px" }} color={"secondary"}/>)}
                    <FormGroup sx={{ paddingLeft: "5px"}}>
                        <FormControllebel
                        label="All Request"
                        control={
                            <CheckBox
                            name="myRequests"
                            inputProps={{
                                "data-testid": 'input-check-my-request',
                            }}
                            onChange={(e) => handleCheckBoxChange(e)}
                            checked={showAll}
                            />
                        }
                        />
                    </FormGroup>
                    <FormGroup sx={{ paddingLeft: "5px"}}>
                        <Tooltip title="Auto refresh occurs once every 30 second. Expanding a request will update every 15 seconds">
                            <FormControllebel
                            label="Auto Refresh"
                            control={
                                <CheckBox
                                name="autoRefresh"
                                inputProps={{
                                    "data-tested": 'input-check-auto-refresh',
                                }}
                                onChange={(e) => handleAutoRefresh(e)}
                                checked={autoRefresh}
                                />
                            }
                            />
                        </Tooltip>
                    </FormGroup>
                    <FormGroup sx={{paddingLeft: "5px", width: "375px"}}>
                        <TextField
                        label="Search"
                        value={searchText}
                        onChange={handleSearch}
                        onKeyPress={handleKeyPress}
                        variant="outlined"
                        size="small"
                        />
                    </FormGroup>
                </Stack>
                <Stack>
                </Stack>
            </PagHeader>
            <div style={{paddingTop: "5px", maxHeight: 80vh, overflowY: "auto" }}>
                <TableContainer sx={{ marginTop: "40px" }} component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Submitted on</TableCell>
                                <TableCell>Change Type</TableCell>
                                <TableCell>Tech Review Job ID</TableCell>
                                <TableCell>implementation Job ID</TableCell>
                                <TableCell>Change Record</TableCell>
                                <TableCell>User ID</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activityRows.map((row, i) => (
                                <Row
                                selectedRow={selectedRow}
                                setSelectedRow={setSelectedRow}
                                updateServiceRequestData={updateServiceRequestData}
                                key={`${row.id}${i}`}
                                row={row}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                nextIconButtonProps={{ disabled: isFetchInprogress || isAtEnd }}
                backIconButtonProps={{ disabled: isFetchInprogress || isAtStart}}
                SelectProps={{disabled: isFetchInprogress}}
                component="div"
                count={totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </Container>
    );
 };
 export default RequestLog;

   