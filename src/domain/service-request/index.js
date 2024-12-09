import { Link as RouteLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { BOx, Grod, Container, Typography, Link, Grid } from "@mui/material";

import PageHeader from "../../components/PageHeader";
import ActivitySelector from "./ActivitySector";
import jobList from "./JobList";
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth";

const ServiceRequests = () => {
    const { get } = useFetchWithAuth();
    const [serviceActivityData, setServiceActivityData] = useState([]);
    const [activeActivityIds, setActiveActivityIds] = useState(null);
    const [activitiesFetched, setActivitiesFetched] = useState(false);

    useEffect(() => {
        const fetchActiveActivities = async () => {
            try{
                const response = await get("/serviceactivity");
                const data = await response.json();

                const activeIds = data
                    .filter((activity) => activity.isActive === true)
                    .map((o) => o.id);

                setServiceActivityData(data)
                setActiveActivityIds(activeIds)
                setActivitiesFetched(true);
            } catch (error) {
                setActiveActivityIds(null);
                setActivitiesFetched(true);
            }
        };

        fetchActiveActivities();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container maxWidth={false} style={{ minHeight: "85vh", maxHeight: "85vh" }}>
            <PageHeader title="Build a Service Request" divider/>
            <Typography component="div" style={{ marginBotton: '8px'}}>
                {" "}
                Addone or more service activities to your request.
            </Typography>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={12} md={3}>
                    <ActivitySelector activeActivityIds={activeActivityIds} isDisabled={activitiesFetched && activeActivityIds && activeActivityIds.length === 0}/>
                </Grid>
            </Grid>
        </Container>
    )


}