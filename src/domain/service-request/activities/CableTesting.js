import React, { useContext, useState } from "react";
import {
  Stack,
  TextField,
  MenuItem,
  FormControl, InputLabel, Select, OutlinedInput, Checkbox, ListItemText
} from "@mui/material";
import AddRemoveCopy from "./AddRemoveCopy";
import { JobContext } from "../../../context/JobContext";
import {
  isValidPhysicalInterface,
  isValidIPv4Address,
  isValidSpeed,
  isValidDuplex,
  isValidMtu,
  isValidCdp,
  isValidA10PhysicalInterface
} from "../../../hooks/useValidators";
import ContainerHeight from "../../../components/ContainerHeight";
import ServiceActivityButtons from "../../../components/ServiceActivityButtons";
import ServiceActivityButtons from "../../../components/ServiceActivityButtons";

const CableTesting = ({ activityId }) => {
  const { getJobParams, updateJobParam, updateJobParams } = useContext(JobContext);
  const [type, setType] = useState("")

  const params = getJobParams(activityId);

  const adhocAvailableoptions = [
    { key: "udld-disable", value: "udld disable", label: "udld disable" },
    { key: "udld-port-disable", value: "udld port disable", label: "udld port disable" },
    { key: "negotiation-auto", value: "no negotiation auto", label: "no negotiation auto" },
    { key: "speed-nonegotiate", value: "speed nonegotiate", label: "speed nonegotiate" },
    { key: "link-debounce-time-2000", value: "link debounce time 2000", label: "link debounce time 2000" }
  ];

  const handleInputChange = (rowId, event) => {
    const { name, value } = event.target;
    updateJobParam(activityId, rowId, name, value);
  };

  const handleAdhocInputChange = (rowId, event) => {
    const { name, value } = event.target;
    if (name === "adhocOptions") {
      updateJobParams(activityId, rowId, [
        { name: name, value: typeof value === 'string' ? value.split(',') : value },
      ]);
    }
  };

  const [errors, setErrors] = useState({});

  const isValid = () => {
    let errors = {};
    let networkDevices = {};
    params.forEach((row) => {
      let key = row.networkDevice.toLowerCase() + row.interfaceName.toLowerCase();
      if (networkDevices[key]) {
        networkDevices[key]++;
      } else {
        networkDevices[key] = 1;
      }
    });
    params.forEach((row) => {
      if (!row.networkDevice) {
        errors[`networkDevice${row.rowId}`] = "Required";
      } else if (
        networkDevices[row.networkDevice.toLowerCase() + row.interfaceName.toLowerCase()] > 1
      ) {
        errors[`networkDevice${row.rowId}`] = "Duplicate";
      }
      if (!row.interfaceName) {
        errors[`interfaceName${row.rowId}`] = "Required";
      } else if (!row.networkDevice.includes("FWG") && !isValidPhysicalInterface(row.interfaceName)) {
        errors[`interfaceName${row.rowId}`] = "Invalid Interface Name";
      } else if (row.networkDevice.includes("FWG") && !isValidA10PhysicalInterface(row.interfaceName)) {
        errors[`interfaceName${row.rowId}`] = "Invalid A10 Interface Name";
      } else if (
        networkDevices[row.networkDevice.toLowerCase() + row.interfaceName.toLowerCase()] > 1
      ) {
        errors[`interfaceName${row.rowId}`] = "Duplicate";
      }
      if (!row.ipv4Address) {
        errors[`ipv4Address${row.rowId}`] = "Required";
      } if (!isValidIPv4Address(row.ipv4Address, true)) {
        errors[`ipv4Address${row.rowId}`] = "Invalid IPv4 Address";
      } else if (!isValidIPv4Address(row.ipv4Address, true, [31])) {
        errors[`ipv4Address${row.rowId}`] = "Invalid Mask, /31 required";
      }
      if (row.speed && !isValidSpeed(row.speed)) {
        errors[`speed${row.rowId}`] = "Invalid Value";
      }
      if (row.duplex && !isValidDuplex(row.duplex)) {
        errors[`duplex${row.rowId}`] = "Invalid Value";
      }
      if (row.mtu && !isValidMtu(row.mtu)) {
        errors[`mtu${row.rowId}`] = "Invalid Value";
      }
      if (row.cdp && !isValidCdp(row.cdp)) {
        errors[`cdp${row.rowId}`] = "Invalid Value";
      }

      if (!row.type) {
        errors[`type${row.rowId}`] = "Required";
      }
    });

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div>
      <ContainerHeight>
        {params.map((activity) => {
          return (
            <>
              <Stack
                marginTop={"15px"}
                spacing={1}
                direction="row"
                key={activity.rowId}
              >
                <TextField
                  label="Network Device"
                  name="networkDevice"
                  error={!!errors[`networkDevice${activity.rowId}`]}
                  helperText={errors[`networkDevice${activity.rowId}`]}
                  placeholder="Ex. AREPOL01"
                  required
                  value={activity.networkDevice.toUpperCase()}
                  inputProps={{
                    "data-testid": `${activity.rowId}-input-networkDevice`,
                  }}
                  onChange={(e) => handleInputChange(activity.rowId, e)}
                  variant="outlined"
                />

                <TextField
                  label="Interface Name"
                  name="interfaceName"
                  error={!!errors[`interfaceName${activity.rowId}`]}
                  helperText={errors[`interfaceName${activity.rowId}`]}
                  placeholder={activity.networkDevice.includes("FWG") ? `Ex. Ethernet 12` : "Ex. Ethernet1/20"}
                  required
                  value={activity.interfaceName.toLowerCase()}
                  inputProps={{
                    "data-testid": `${activity.rowId}-input-interfaceName`,
                  }}
                  sx={{ width: "200px" }}
                  onChange={(e) => handleInputChange(activity.rowId, e)}
                  variant="outlined"
                ></TextField>
                <TextField
                  label="IP Address"
                  name="ipv4Address"
                  error={!!errors[`ipv4Address${activity.rowId}`]}
                  helperText={errors[`ipv4Address${activity.rowId}`]}
                  placeholder="Ex. 192.168.1.1/31"
                  required
                  value={activity.ipv4Address}
                  inputProps={{ "data-testid": `${activity.rowId}-input-ipv4Address` }}
                  onChange={(e) => handleInputChange(activity.rowId, e)}
                  variant="outlined"
                ></TextField>
                <TextField
                  label="Speed"
                  name="speed"
                  error={!!errors[`speed${activity.rowId}`]}
                  helperText={errors[`speed${activity.rowId}`]}
                  value={activity.speed}
                  select
                  sx={{ width: "150px" }}
                  inputProps={{ "data-testid": `${activity.rowId}-input-speed` }}
                  onChange={(e) => handleInputChange(activity.rowId, e)}
                  variant="outlined"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="auto">auto</MenuItem>
                  <MenuItem value="10">10 (10Mb/s)</MenuItem>
                  <MenuItem value="100">100 (100Mb/s)</MenuItem>
                  <MenuItem value="1000">1000 (1Gb/s)</MenuItem>
                  <MenuItem value="10000">10000 (10Gb/s)</MenuItem>
                  <MenuItem value="25000">25000 (25Gb/s)</MenuItem>
                  <MenuItem value="40000">40000 (40Gb/s)</MenuItem>
                  <MenuItem value="100000">100000 (100Gb/s)</MenuItem>
                </TextField>
                <TextField
                  label="Duplex"
                  name="duplex"
                  error={!!errors[`duplex${activity.rowId}`]}
                  helperText={errors[`duplex${activity.rowId}`]}
                  value={activity.duplex}
                  select
                  sx={{ width: "125px" }}
                  inputProps={{ "data-testid": `${activity.rowId}-input-duplex` }}
                  onChange={(e) => handleInputChange(activity.rowId, e)}
                  variant="outlined"
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="auto">auto</MenuItem>
                  <MenuItem value="full">full</MenuItem>
                </TextField>
                <TextField
                  label="MTU"
                  name="mtu"
                  error={!!errors[`mtu${activity.rowId}`]}
                  helperText={errors[`mtu${activity.rowId}`]}
                  value={activity.mtu}
                  select
                  sx={{ width: "100px" }}
                  inputProps={{ "data-testid": `${activity.rowId}-input-mtu` }}
                  onChange={(e) => handleInputChange(activity.rowId, e)}
                  variant="outlined"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="1500">1500</MenuItem>
                  <MenuItem value="9216">9216</MenuItem>
                </TextField>
                <TextField
                  label="CDP"
                  name="cdp"
                  error={!!errors[`cdp${activity.rowId}`]}
                  helperText={errors[`cdp${activity.rowId}`]}
                  value={activity.cdp}
                  select
                  sx={{ width: "125px" }}
                  inputProps={{ "data-testid": `${activity.rowId}-input-cdp` }}
                  onChange={(e) => handleInputChange(activity.rowId, e)}
                  variant="outlined"
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="enabled">enabled</MenuItem>
                </TextField>
                <TextField
                <TextField
                variant="outlined"
                label="Type"
                name="type"
                error={!!errors[`type${activity.rowId}`]}
                helperText={errors[`type${activity.rowId}`]}
                required
                value={type}
                inputProps={{
                  "data-testid": `${activity.rowId}-input-type`,
                }}
                sx={{ width: 100 }}
                onChange={(e) => setType(e.target.value)}
                select>
                <MenuItem value='edge'>Edge</MenuItem>
                <MenuItem value='transport'>Transport</MenuItem>
              </TextField>

              <AddRemoveCopy
                key={activity.rowId}
                rowId={activity.rowId}
                activityId={activityId}
                showPreview={false}
                />

              </Stack>
              <Stack marginTop={"15px"}
                spacing={1}
                direction="row"
                key={activity.rowId}>
                <TextField
                  label="VRF"
                  name="vrf"
                  error={!!errors[`vrf${activity.rowId}`]}
                  helperText={errors[`vrf${activity.rowId}`]}
                  placeholder="Ex. CABLE_TEST"
                  value={activity.vrf}
                  inputProps={{
                    "data-testid": `${activity.rowId}-input-vrf`,
                  }}
                  style={{ display: type === "transport" ? "block" : "none" }}
                  onChange={(e) => handleInputChange(activity.rowId, e)}
                  variant="outlined"
                />
                <FormControl sx={{ marginRight: '15px' }}></FormControl>
                <InputLabel id="adhoc-options" error={!!errors[`adhocOptions${activity.rowId}`]}>Additional Commands</InputLabel>
                  <Select
                    input={<OutlinedInput label="Additional Commands" />}
                    label="adhocOptions"
                    labelId="adhoc-options"
                    id="cable-multiple-checkbox"
                    name="adhocOptions"
                    sx={{ width: "250px", display: type === "transport" ? "block" : "none" }}
                    multiple
                    value={activity.adhocOptions}
                    onChange={(e) => handleAdhocInputChange(activity.rowId, e)}
                    inputProps={{
                      "data-testid": `${activity.rowId}-input-adhoc-options`,
                    }}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {adhocAvailableoptions.map((option) => (
                      <MenuItem key={option.key} value={option.value}></MenuItem>
                      <Checkbox checked={activity.adhocOptions.indexOf(option.value) > -1} />
                        <ListItemText primary={option.value} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </>

          );
        })}
      </ContainerHeight>
      <ServiceActivityButtons activityId={activityId} isValid={isValid} />
    </div>
  );
};

export default CableTesting;

