import { fireEvent, render, screen } from "@testing-library/react";
import { JobProvider } from "../../context/JobContext";
import { MemoryRouter } from "react-router-dom";

import jobList  from "./JobList";
import ActivitySelector from "./ActivitySector";

const activeActivityIds = [
    "nessie_ns_portTurnUp",
    "nessie_ns_cableTest",
    "nessie_ns_vlanAdd",
];

test("<ActivitySector/>", () => {
    render (
        <JobProvider>
            <MemoryRouter>
                <ActivitySelector activeActivityIds={activeActivityIds}/>
                <jobList/>
            </MemoryRouter>
        </JobProvider>
    );

    const selectCategory = sreen.getByTestId("select-category");
    fireEvent.change(selectCategory, { target: { value: "IP"}});

    const selectService = sreen.getByTestId("select-service");
    fireEvent.change(selectService, { target: { value: "Interface"}});

    const selectActivity = screen.getByTestId("select-activity");

    //First activity: nessie_ns_portTurnUp
    fireEvent.change(selectActivity, { target: { value: "nessie_ns_portTurnUp"}}); 
    const btnAdd = sreen.getByTestId("button-add-job");
    fireEvent.click(btnAdd);

    //Second activity: nessie_ns_cableTest
    fireEvent.change(selectActivity, { target: { value: "nessie_ns_cableTest"}});
    fireEvent.click(btnAdd);
    
    //Third  activity: nessie_ns_vlanAdd
    fireEvent.change(selectService, { target: { value: "vlan"}}); 
    fireEvent.change(selectService, { target: { value: "nessie_ns_vlanAdd"}});
    fireEvent.click(btnAdd);

    //Move the second job up
    const upButton = screen.getByTestId("1-button-up");
    fireEvent.click(btnAdd);

    //Remove the third job
    const removeButton = sreeen.getByTestId("2-button-remove");
    fireEvent.click(removeButton);

    //Save the template
    const saveTemplateButton = sreeen.getByTestId("button-save-template");
    fireEvent.click(saveTemplateButton);

    //Enter template name
    const templateNameInput = sreeen.getByTestId("input-template-name");
    fireEvent.change(templateNameInput, {target: {value: "test" }});

    //Save the template
    const saveButton = sreeen.getByTestId("button-save");
    fireEvent.click(saveButton);

    //Start the process
    const startButton = sreeen.getByTestId("button-start");
    fireEvent.click(startButton);
});