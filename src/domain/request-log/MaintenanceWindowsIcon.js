import React from "react";
import { SvgIcon } from "@mui/material";
import { ReactComponent as MaintenanceWindowsSVG } from "./maintenance-windosws.svg";

const MaintenanceWindowsIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <MaintenanceWindowsSVG/>
        </SvgIcon>
    );
};

export default MaintenanceWindowsIcon;