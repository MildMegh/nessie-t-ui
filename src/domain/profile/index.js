import { useState, useEffect, useCallback } from "react";

import { Container, Box, Grid } from "@mui/material";

import PageHolder from "../../components/PageHeader";
import PermissionsTable from "./PermissionTable";
import RequestPermissions from "./RequestPermissions";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth";

const useProfile = () => {
    const { get } = useFetchWithAuth();

    const [user,setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        teamName:"",
        ntid: "",
        managerNtid: "",
        groups: [],
    });

    const handleGetUserProfile = useCallback(async () = {
        const response = await get("/userprofile");

        if (response.ok) {
            const data = await response.json();
            setUser({
                ntid: data.ntid,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.lastName,
                teamName: data.teamName,
                groups: data.groups,
            });
        }
        // eslist-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=> {
        handleGetUserProfile();
    }, [handleGetUserProfile]);

    return (
        <Container maxWidth={false}>
            <PageHeader title="User Profile" divider/>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={7}>
                    <Box m={2}>
                        <PermissionsTable groups={user.groups}/>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Box m={2}>
                        <RequestPermissions/>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default useProfile;