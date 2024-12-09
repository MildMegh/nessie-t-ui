import React from "react";
import PropTypes from "prop-types";
import {
  Tooltip,
  TableCell,
  Typography
} from "@mui/material";

function ChangeType({ changeType = "", children }) {
  const tooltipTitle = changeType === 'standard' 
    ? 'Standard Change requests are deployed during business hours outside the maintenance window'
    : 'Normal Change requests are deployed during the next available maintenence window';

  return (
    <Tooltip title={tooltipTitle} arrow>
      {children ? (
        <Typography sx={{ borderBottom: "inherited", fontSize: "1rem", minWidth: "100px"}}>
          {children}
        </Typography>
      ) : (
        <TableCell sx={{ borderBottom: "inherited", fontSize: "1rem", minWidth: "100px"}}>
          {null != changeType ? changeType.charAt(0).toUpperCase() + changeType.slice(1): changeType}
        </TableCell>
      )}
      </Tooltip>
  );
}

ChangeType.propTypes = {
  changeType: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ChangeType;

