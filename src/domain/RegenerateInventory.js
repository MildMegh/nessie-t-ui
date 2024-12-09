import { useState, useContext } from "react";

import {
    Container,
    Stack,
    Grid,
    Button,
    Tooltip,
    TextField,
} from "@mui/material";

import PageHeader from "../components/PageHeader";
import { NotificationContext } from "../hooks/NotificationContext";
import { useFetchWithAuth } from "../hooks/useFetchWithAuth";

import {
    isNumeric,
} from "../hooks/useValidators";

const RegenerateInventory = () => {
    const { addNotification } = useContext(NotificationContext);
    const { post } = useFetchWithAuth();
    const [ crId, setCrId ] = useState("");
    const handleInputChange = (event) => {
        const { value } = event.target;
        setCrId(value);
    };
    const handleClick = async () => {
        const response = await post (`/recreateinventory/${isNumeric(crId) ? 'CR' + crId : crId}`);
        if (response.ok) {
            addNotification({
                severity: "success",
                message: "Inventory regenerated successfully",
            });
        } else if (response.status === 404) {
            addNotification({
                severity: "error",
                message:"CR Number not found",
            });
        } else {
            addNotification({
                severity: "error",
                message: "Error regerating inventory.",
            });
        }
    };

    return (
        <Container maxWidth={false}>
            <PageHeader title="Regenerate Inventory" divider />
            <Grid marginTop="10px" container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Stack spacing={2} alignItems="flex-start">
                        <Tooltip title="Input a change record ID" placement="right" arrow>
                            <TextField
                                placeholder="CR123456789"
                                name="crId"
                                label="CR Number"
                                required
                                value={crId}
                                inputProps={{ "data-testid": `input-crId`}}
                                onChange={handleInputChange}
                                sx={{ width: "fit-content" }}
                            />
                        </Tooltip>
                        <Button
                            disabled={!crId}
                            onClick={handleClick}
                            variant="contained"
                            color="primary"
                            data-testid="button-regerate"
                            sx={{ width: "fit-content" }}
                        >
                            Regenerate Inventory
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={0} md={1}></Grid>
            </Grid>
        </Container>
    );
};

export default RegenerateInventory;