import { useEffect, useState, useMemo } from "react";

import {
    Container,
    Tabs,
    Tab,
    Stack,
    FormGroup,
    TextField
} from "@mui/material";

import TabPanel from "../../components/TabPanel";
import Validations from "./ServiceActivityValidation";
import ServiceActivities from "./ServiceActivityManagement";
import { useNavigate, useLocation } from "react-router-dom";

import PageHeader from "../../components/PageHeader";

const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const tabName = location.pathname.split("/").pop();
    const initialTabValue = tabName === "service-activity-validation" ? 1 : 0;
    const [tabValue, setTabValue] = useState(initialTabValue);
    const [searchText, setSearchText] =useState("");

    const navigateToTab = (tabName) => {
        navigate(`/admin/${tabName}`);
        setTabValue(tabName === "service-activity-validation" ? : 1 : 0 );
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setSearchText(" ");
            setSearchText(event.target.value);
        }
    };

    return (
        <Container maxWidth={false}>
            <PageHeader title="Admin Dashboard" divider>
                <Stack direction="row" spacing={2} sx={{ float: "right"}}>
                    <FormGroup sx={{ paddingLeft: "5px" , width: "375px" }}>
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
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="tabs"
                indicatorColor="secondary"
                textColor="inherit"
            >
                <Tab
                    label="Service Activtiy Management"
                    onClick={() => navigateToTab("service-activity-management")}
                    aria-controls="tabpanel-1"
                />
                <Tab    
                    label="Service Activtiy Validation"
                    onClick={() => navigateToTab("swervice-activity-validation")}
                    aria-controls="tabpanel-0"
                />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <ServiceActivities searchText={searchText}/>
            </TabPanel>
            <TabPanel value={tabValue} index={0}>
                <Validations setSearchText={searchText}/>
            </TabPanel>
        </Container>
    );
};

export default Admin;


