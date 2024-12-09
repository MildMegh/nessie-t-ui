import { fireEvent, render, screen } from "@testing-library/react";

import OSModify from "./OSModify";

import { JobProvider } from "../../../context/JobContext";
import { activities } from "../activities";
import ActivitySelector from "../ActivitySector";
import { MemoryRouter } from "react-router-dom";

const activeActivityIds = [
    "nessie_ns_operatingSystemModify",
];

test("<OSModify/>", () => {
    render(
        <JobProvider>
            <MemoryRouter>
                <ActivitySelector activeActivityIds={activeActivityIds}/>
                <OSModify activityId="nessie_ns_operatingSystemModify"/>
            </MemoryRouter>
        </JobProvider>
    );
    const inputE1 = screen.getByTestId("select-category");
    fireEvent.change(inputEl, { target: { value: "Operations"} });
    const input11 = screen.getByTestId("select-service");
    fireEvent.change(inputEl1, { target: { value: "Network OS"} });
    const input12 = screen.getByTestId("select-acitity");
    fireEvent.change(inputEl2, { target: { value: "nessie_ns_operatingSystemModify" } });
    const btnAdd = screen.getByTestId("button-add-job");
    fireEvent.click(btnAdd);

    const inputList = ["networkDevices"];
    let el = screen.getByTestId("button-next");
    expect(el).toBeInTheDocument();
    fireEvent.click(el);

    //Changing filetype to "osd"
    el = screen.getByTestId("1-input-fileType");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "osd"}});

    el = screen.getByTestId("1-input-osImage");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "nxos.9.3.11.bin"} });

    el = screen.getByTestId("1-input-targetOs");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "9.3.(11)"} });

    el = screen.getByTestId("1-input-currentImage");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "nxos.7.3.17.bin"} });

    el = screen.getByTestId("1-input-currentOs");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "nxos.7.0(3)17(6)"} });


    //Changing fileType to "epld"
    el = screen.getByTestId("1-input-fileType");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "epld" } });

    el = screen.getByTestId("1-input-epldImage");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "n9000-epld.9.3.11.img" } });

    //Change fileType to "smu"
    el = screen.getByTestId("1-input-fileType");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "smu" } });

    el = screen.getByTestId("1-input-smuRpm");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "nxos.CSCwf10710-n9k_ALL-1.0.0-9.3.11.lib32_n9000.rpm" } });

    el = screen.getByTestId("button-next");
    expect(el).toBeInTheDocument();
    fireEvent.click(el);
});

test("OSModify Validation Test", () => {
    render(
        <JobProvider>
            <MemoryRouter>
                <ActivitySelector activeActivityIds={activeActivityIds}/>
                <OSModify activityId="nessie_ns_operatingSystemModify"/>
            </MemoryRouter>
        </JobProvider>
    );
    const inputE1 = screen.getByTestId("select-category");
    fireEvent.change(inputEl, { target: { value: "Operations" } });
    const inputE11 = screen.getByTestId("select-service");
    fireEvent.change(inputEl1, { target: { value: "Network OS" } });
    const inputEl2 = screen.getByTestId("select-activity");
    fireEvent.change(inputEl2, { target: { value: "nesie_ns_operatingSystemModify" } });
    const btnAdd = screen.getByTestId("button-add-job");
    fireEvent.click(btnAdd);

    let el = screen.getByTestId("button-next");
    expect(el).toBeInTheDocument();
    fireEvent.click(el);
    
    el = screen.getByTestId("button-next");
    expect(el).toBeInTheDocument();
    fireEvent.click(el);

    let errorMsg = screen.getByTestId(`1-networkDevice-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    errorMsg = screen.getByTestId(`1-fileType-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    el = screen.getByTestId("1-imput-fileType");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "osd" } });

    el = screen.getByTestId("button-next");
    expect(el).toBeInTheDocument();
    fireEvent.click(el);

    errorMsg = screen.getByTestId(`1-Image-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    errorMsg = screen.getByTestId(`1-targetOs-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    errorMsg = screen.getByTestId(`1-currentImage-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    errorMsg = screen.getByTestId(`1-currentOs-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

});

test("Validate model contract", () => {
    const hasObjectWithKeynessie_ns_operatingModify = activities.hasOwnProperty("nessie_ns_operatingSystemModify")
    expect(hasObjectWithKeynessie_ns_operatingModify).toBe(true)
    const nessie_ns_operatingSystemModifyParams = [{
        rowId: 1,
        networkDevice: "",
        osImage: "",
        targetOs: "",
        currentImage: "",
        currentOs: "",
        epldImage: "",
        smuRpm: "",
    }]
    expect(activities["nessie_ns_operatingSystemModify"].toEqual(nessie_ns_operatingSystemModifyParams))
});