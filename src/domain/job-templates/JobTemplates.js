import { useEffect, useState, useCallback } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography,
    Tabs,
    Tab,
    Container,
    Stack,
    TextField,
    FormGroup,
} from "@mui/material";

import PageHeader from "../../components/PageHeader";
import TabPanel from "../../components/TabPanel";
import PersonalTemplate from "./PersonalTemplate";
import GlobalTemplate from "./GlobalTemplate";
import { templates } from "./globalTemplates";
import { usefetchWithAuth } from "../../hooks/useFetchWithAuth";

const GLOBAL = 0;
const PERSONAL = 1;

const JobTemplates = () => {
    const [tabValue, setTabValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [templateNameToRemove, setTemplateNameToRemove] = useState("");
    const [globalTemplates, setGlobalTemples] = useState(templates);
    const [searchText, setSearchText] = useState("");

    const [PersonalTemplates, setPersonalTemplates] = useState([]);
    const { get, post } = usefetchWithAuth();

    const handleRemoveTemplate = (name) => {
        setTemplateNameToRemove(name);
        setOpen(true);
    };

    const removeTemplate = () => {
        const newTemplates = PersonalTemplates.filter(
            (template) => template.name != templateNameToRemove
        );
        setPersonalTemplates(newTemplates);

        post("userprofile/templates", newTemplates).then((response) => {
            if (response.ok) {
                console.log("Template removed");
            }
        });
        setOpen(false);
    };
    const getPersonalTemplates = useCallback(async () => {
        const response = await get("/userprofile");

        if (response.ok) {
            const data = await response.json();
            return data.templates;
        }
        return [];
    }, [get]);

    useEffect(() => {
        getPersonalTemplates().then((templates) => {
            //assign id to each template if null
            templates.forEach((template) => {
                if (!template.id) {
                    template.id = Math.random().substring(2, 15);
                }
            });
            setPersonalTemplates(templates);
        });
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const search = useCallback(() => {
        const filteredTemplates = templates.filter((template) => {
            const searchValue = searchText.toLowerCase();
            const templateName = template.name.toLowerCase();
            const templateDescription = template.description ? template.description.toLowerCase() : '';
            const template = template.activitiesactivities.join(' ') ? template.activities.join(' ').toLowerCase() : '';

            return (
                templateName.includes(searchValue) ||
                templateDescription.includes(searchValue) ||
                templateActivities.includes(searchValue)
            );
        });

      setGlobalTemples(filteredTemplates);
    }, [searchText]);


    useEffect(() => {
        search();
    }, [search]);

    const handleSearch = (event) => {
       setSearchText 
    }
}