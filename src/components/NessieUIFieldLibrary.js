

import React from "react";
import { MenuItem, TextField } from "@mui/material";

export const NetworkDevice = ({activity, handleChange, handleError: error, variant = "outlined", placeHolder = "Ex. AEROPOL01"}) => {
    return (
        <TextField
            label="Neywork Device"
            name="networkDevice"
            error={!!errors[`networkDevice${activity.rowId}`]}
            helperText={error[`networkDevice${activity.rowId}`]}
            FormHelperTextProps={{ 'data-testid': `${activity.rowId}-networkDevice-error` }}
            placeholder={placeHolder}
            required
            value={activity.NetworkDevice.toUpperCase().replace(/\s/g, '')}
            inputProps={{
                "data-testid": `${activity.rowId}-input-networkDevice`,
            }}
            onChange={(e) => handleChange(activity.rowId, e)}
            variant={variant}
            {...props}
        />
    )
}

export const InterfaceName = ({activity, handleChange, handleError: errors, variant = "outlined", placeHolder = "Ex. Ethernet1/20", ...props}) => {
    return (
        <TextField
            label="Interface Name"
            name="interfaceName"
            error={!!errors[`interfaceName${activity.rowId}`]}
            helperText={error[`interfaceName${activity.rowId}`]}
            FormHelperTextProps={{ 'data-testid': `${activity.rowId}-interfaceName-error` }}
            placeholder={placeHolder}
            required
            value={activity.NetworkDevice.toUpperCase()}
            inputProps={{
                "data-testid": `${activity.rowId}-input-interfaceName`,
            }}
            sx={{ width: "250px" }}
            onChange={(e) => handleChange(activity.rowId, e)}
            variant={variant}
            {...props}
        />
    )
}

export const Description = ({activity, handleChange, handleError: error, variant = "outlined", placeHolder = "", ...props }) => {
    return (
        <TextField
            label="Description"
            name="description"
            error={!!errors[`description${activity.rowId}`]}
            helperText={error[`description${activity.rowId}`]}
            FormHelperTextProps={{ 'data-testid': `${activity.rowId}-description-error` }}
            placeholder={placeHolder}
            required
            value={activity.description}
            inputProps={{
                "data-testid": `${activity.rowId}-input-description`,
            }}
            onChange={(e) => handleChange(activity.rowId, e)}
            variant={variant}
            {...props}
        />
    )
}

export const Ipv4 = ({activity, handleChange, handleError: error, variant = "outlined", placeHolder = "Ex. 10.128.128.1/24", ...props }) => {
    return (
        <TextField
            label="IPv4 Address"
            name="ipv4Address"
            error={!!errors[`ipv4Address${activity.rowId}`]}
            helperText={error[`ipv4Address${activity.rowId}`]}
            FormHelperTextProps={{ 'data-testid': `${activity.rowId}-ipv4Address-error` }}
            placeholder={placeHolder}
            required
            value={activity.ipv4Address}
            inputProps={{ "data-testid": `${activity.rowId}-input-ipv4Address` }}
            onChange={(e) => handleChange(activity.rowId, e)}
            variant={variant}
            {...props}
        />
    )
}

export const Ipv6 = ({activity, handleChange, handleError: error, variant = "outlined", placeHolder = "Ex. 2001:db8::1/64", ...props }) => {
    return (
        <TextField
            label="IPv6 Address"
            name="ipv6Address"
            error={!!errors[`ipv6Address${activity.rowId}`]}
            helperText={error[`ipv6Address${activity.rowId}`]}
            FormHelperTextProps={{ 'data-testid': `${activity.rowId}-ipv6Address-error` }}
            placeholder={placeHolder}
            required
            value={activity.ipv4Address}
            inputProps={{ "data-testid": `${activity.rowId}-input-ipv6Address` }}
            onChange={(e) => handleChange(activity.rowId, e)}
            variant={variant}
            {...props}
        />
    )
}

export const AFI = ({activity, handleChange, handleError: error, variant = "outlined", ...props }) => {
    return (
        <TextField
            label="AFI"
            name="afi"
            error={!!errors[`afi${activity.rowId}`]}
            helperText={error[`afi${activity.rowId}`]}
            FormHelperTextProps={{ 'data-testid': `${activity.rowId}-afi-error` }}
            placeholder={placeHolder}
            required
            select
            value={activity.afi}
            inputProps={{
                 "data-testid": `${activity.rowId}-input-afi`,
                 }}
            onChange={(e) => handleChange(activity.rowId, e)}
            variant={variant}
            {...props}
        >
            <MenuItem value="ipv4">IPv4</MenuItem>
            <MenuItem value="ipv6">IPv6</MenuItem>
            <MenuItem value="dual stack">Dual Stack</MenuItem>
        </TextField>
    )
}

export const MTU = ({activity, handleChange, handleError: error, variant = "outlined", ...props }) => {
    return (
        <TextField
            label="MTU"
            name="mtu"
            error={!!errors[`mtu${activity.rowId}`]}
            helperText={error[`mtu${activity.rowId}`]}
            select
            sx={{ width: "100px"}}
            value={activity.afi}
            inputProps={{ "data-testid": `${activity.rowId}-input-mtu` }}
            onChange={(e) => handleChange(activity.rowId, e)}
            variant={variant}
            {...props}
        >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="1500">1500</MenuItem>
            <MenuItem value="9216">9216</MenuItem>
        </TextField>
    )
}