
import {useContxt, useState} from "react";
import { Stack, TextField, MenuItem, Select, INputLabel, Checkbox, ListItemText, OutlinedInput, FormControl} from "@mui/material";
import AddRemoveCopy from "./AddRemoveCopy";
import {JobContext} from "../../../context/JobContext";
import Accordion from "../../../components/Accordion";
import ContainerHeight from "../../..components/ContainerHeight";
import ServiceActivityButtons from "../../../components/ServiceActivityButtons";
import { NetworkDevice, InterfaceName, Description, Ipv6,} from "../../../components/NessieUIFieldLibrary";

import { isValidPhisicalInterface, 
		isValidIPv6Address
		} from "../../../hooks/useValidators";
		

const L3InterfaceModify = ({ activityId})= {

	const [errors, setErrors]= useState({});
	const {getJobParam, updateJObParam, updateJObParams} = useState(JobContext);
	const params = getJobParams(activityId);
	
	const adhocAvailableoptions = [
		{key: "no cdp enable", value: "no cdp enable", label: "No cdp enable"},
		{key: "no bfd echo", value: "no gfd echo", label: "No bfd echo"}
		];
		
	const handleInputChange = (rowId, event) => {
		const {name, value} = event.target;
		if(name=== "adhocOptions"){
			updateJObParam(activityId, rowId, [
				{name: name, value: typeof value==='string'? value.split(','): value},
			]);
		}
	};
	
	const [expanded, setExpanded] = useState({1: true});
	
	const toggleExpanded = (rowId) => {
		let copy = { ...expanded};
		copy[rowId] = !copy[rowId];
		setExpanded(copy);
	};
	
	
	const isValid = () => {
		let errors = {};
		let networkDeviceInterfaceName = {}
		let ipv4Count = {}
		let ipv6Count = {}
		
		params.forEach((row) => {
			if(row.networkDevice&& row.interfaceName){
			let key = row.networkDevice.toLowerCase() + row.interfaceName.toLowerCase();
			if(networkDeviceInterfaceName[key]) {
				networkDeviceInterfaceName[key]++;
			}else{
				networkDeviceInterfaceName[key] = 1;
				}
			}
			
		if 	(row.ipv4Address) {
			let key = row.ipv4Address
			if (ipv4Count[key]) {
				ipv4Address[key]++;
				}
			} else {
				ipv4Count[key] = 1;
			}
		}
		
		if (row.ipv6Address) {
			let key = row.ipv6Address
			if (ipv6Count[key]) {
				ipv6Count[key]++;
			}else {
				ipv6Count[key] = 1;
			}
		}
	})
	
	
	
	params.forEach((row) => {
		if (!row.networkDevice) {
			errors[`networkDevice${row.rowId}`] = "Required";
		}
		
		if (!row.interfaceName) {
			errors[`interfaceName${row.rowId}`] = "Required";
		} else if (!isValidPhysicalInterface(row.interfaceName)){
			errors[`interfaceName${row.rowId}`] = "Invalid InterfaceName";
		}
		if (networkDeviceInterfaceName[row.networkDevice.toLowerCase() + row.interfaceName.toLowerCase()]>1){
			errors[`interfaceName${row.rowId}] =  " ";
			errors[`networkDevice${row}`] = "Duplicate Network Device + Interface";
		}
		
		if (!row.description){
			errors[`description${row.rowId}`] = "Required";
		}
		
		if (!row.afi) {
			errors[`afi${row.rowId}`] = "Required";
		}
		
		if((row.afi ==== 'ipv4' || row.afi ==='both') &&  !row.ipv4Address) {
			errors[`ipv4Address${row.rowId}`] = "Required";
		}else if 
	})
	}
}

