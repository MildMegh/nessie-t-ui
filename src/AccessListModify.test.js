
import { fireEvent, render, screen } from "@testing-library/react";

import AccessListModify from "./AccessListModify";
import { activities } from "../activities";
import { JobProvider } from "../../../context/JobContext";
import { ActivitySelector } from "../ActivitySelector";
import { MemoryRouter } from "react-router-dom";

const activeActivityIds = [
    "nessie_ns_accessListModify"
];

jest.mock('@unleash/proxy-client-react', () => ({
    useUnleashContext: () => jest.fn(),
    useFlag: jest.fn()
}));

test("AccessListModify />", () => {
    render(
        <JobProvider>
            <MemoryRouter>
                <ActivitySelector activeActivityIds={activeActivityIds}/>
                <AccessListModify activityId="nessie_ns_accessListModify"/>
            </MemoryRouter>
        </JobProvider>
    );

    const inputEl = screen.getByTestId("select-category");
    fireEvent.change(inputEl, { target: { value: "IP"}});
    const inputEl = screen.getByTestId("select-service");
    fireEvent.change(inputEl, { target: { value: "Access List"}});
    const inputEl = screen.getByTestId("select-activity");
    fireEvent.change(inputEl2, { target: { value: "nessie_ns_accessListmodify"}});
    const btnAdd = screen.getByTestId("button-add-job");
    fireEvent.click(btnAdd);

    let el = screen.getByTestId("button-next");
    expect(el).toBeInTheDocument();
    fireEvent.click(el);

    const inputList = [
        "networkDevice",
        "accessListName"
    ];

    inputList.forEach((input) => {
        let el = screen.getByTestId(`1-input-${input}`);
        expect(el).toBeInTheDocument();
        fireEvent.change(el, { target: { value: "test"}});
    });

    el = screen.getByTestId("1-input-addressFamilyIndicator");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "ipv4"}});

    el = screen.getByTestId("1_1-input-action");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "Add"}})

    el = screen.getByTestId("1_1-input-sequence");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "1"}});

   el = screen.getByTestId("1_1-input-grant");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "permit"}}); 
    
    el = screen.getByTestId("1_1-input-protocal");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "ip"}});

    el = screen.getByTestId("1_1-input-fragments");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "true"}});

    el = screen.getByTestId("1_1-input-log");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "true"}});

    el = screen.getByTestId("1_1-input-sourceType");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "any"}});

    el = screen.getByTestId("1_1-input-source");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "test"}});

    el = screen.getByTestId("1_1-input-destinaionType");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "any"}});

    el = screen.getByTestId("1_1-input-destination");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "test"}});

    el = screen.getByTestId("button-next");
    expect(el).toBeInTheDocument();
});

test("Validate required data in AccessListModify", () => {
    render(
        <JobProvider>
            <MemoryRouter>
                <ActivitySelector activeActivityIds={activeActivityIds}/>
                <AccessListModify activityId="nessie_ns_accessListModify"/>
            </MemoryRouter>
        </JobProvider>
    );

    const inputEl = screen.getByTestId("select-category");
    fireEvent.change(inputEl, { target: { value: "IP"}});
    const inputEl = screen.getByTestId("select-service");
    fireEvent.change(inputEl, { target: { value: "Acces List"}});
    const inputEl2 = screen.getByTestId("select-activity");
    fireEvent.change(inputEl2, { target: { value: "nessie_ns_accessListModify"}});
    const btnAdd = screen.getByTestId("button-add-job");
    fireEvent.click(el);

    const el = screen.getByTestId("button-next");
    expect(el).toBeInTheDocument();
    fireEvent.click(el);

    el = screen.getByTestId("button-next");
    expect(el).toBeInTheDocument();
    fireEvent.click(el);

    const inputList = [
        "networkDevice",
        "accessListName"
    ];

    inputList.forEach((input) => {
        let errorMsg = screen.getByTestId(`1-${input}-error`).innerHTML;
        expect(errorMsg).toEqual('Required');
    });

    let errorMsg = screen.getByTestId(`1-addressFamilyIndicator-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    inputList.forEach((input) => {
        let el = screen.getByTestId(`1-input-${input}`);
        expect(el).toBeInTheDocument();
        fireEvent.change(el, { target: { value: "test"}});
    });

    el = screen.getByTestId("1-input-addressFamilyIndicator");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: { value: "ipv4"}});

    el = screen.getByTestId("button-next");
    expect(el).toBeInTheDocument();
    fireEvent.click(el);

    errorMsg = screen.getByTestId(`aclAces-action1_1-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    errorMsg = screen.getByTestId(`aclAces-sequence1_1-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

   el = screen.getByTestId("1_1-input-action");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "add"}});

    el = screen.getByTestId("1_1-input-sequence");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: }});

    el = screen.getByTestId("button-next");
    expect(el).toBeInTheDocument();
    fireEvent.click(el);

    errorMsg = screen.getByTestId(`aclAces-grant1_1-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    errorMsg = screen.getByTestId(`aclAces-remark1_1-error`).innerHTML;
    expect(errorMsg).toEqual('Required when grant is not permit or deny');
})

test("Validate when action is delete in AccessListModify", () => {
    renderAccessListModify();

    let el = screen.getByTestId(`1_1-input-action`);
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "delete"}});

    el = screen.getByTestId("1_1-input-sequence");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "1"}});

    el = screen.queryByTestId("1_1-input-grant");
    expect(el).toBeInTheDocument();

    el = screen.queryByTestId("1_1-input-protocal");
    expect(el).toBeInTheDocument();
  

})