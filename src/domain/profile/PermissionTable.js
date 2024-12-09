import * as React from "react";
import { PropTypes } from "prop-types";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { activities } from "../service-request/activities";

const columns = [
    { id: "group", label: "Group", minWidth:100 },
    { id: "category", label: "Category", minWidth: 100}
    { id: "service", label: "Service", minWidth:100 },
    { id: "activity", label: "Activity", minWidth: 100}
];

const PermissionsTable = ({groups}) => {
    const rows = groups.map((id) => {
        const activity = activities[id];
        return {
            group: id,
            activity: activity?.activity,
            service: activity?.service,
            category: activity?.category,
        };
    });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <div>Active Permissions</div>
            <div style={{ fontSize: "12px"}}>
                Your current access to network service activities is summarized below.
                Use the adjacent form to request new Permissions.
            </div>

            <Paper sx={{ width: "100%"}}>
                <TableContainer sx={{maxHeight: 440 }}>
                    <Table aria-label="table">
                        <TableHead>
                            <TableRow>
                                {columns.map((colunm) => (
                                   <TableCell 
                                    key={colunm.id}
                                    align={colunm.align}
                                    style={{ top: 30, minWidth: colunm.minWidth}}
                                    >
                                     {colunm.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                        {columns.map((colunm) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={colunm.id} align={column.align}>
                                                    {colunm.format && typeof value === "number"
                                                      ? colunm.format(value)
                                                      : value }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

PermissionsTable.PropTypes = {
    activities: PropTypes.arrayOf(PropTypes.object),
};
PermissionsTable.prototype = [{}];

export default PermissionsTable;