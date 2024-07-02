
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
  
    el = screen.queryByTestId("1_1-input-fragments");
    expect(el).toBeInTheDocument();

    el = screen.queryByTestId("1_1-input-log");
    expect(el).toBeInTheDocument();

    el = screen.queryByTestId("1_1-input-sourceType");
    expect(el).toBeInTheDocument();

    el = screen.queryByTestId("1_1-input-source");
    expect(el).toBeInTheDocument();

    el = screen.queryByTestId("1_1-input-destinationType");
    expect(el).toBeInTheDocument();

    el = screen.queryByTestId("1_1-input-destination");
    expect(el).toBeInTheDocument();

    el = screen.getByTestId("button-next");
    expect(el).toBeInTheDocument();
});

test("Validate when grant is permit in AccessListModify", () => { 
    renderAccessListModify();

    let el = screen.getByTestId("1_1-input-action");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: { value: "add"}});

    el = screen.getByTestId("1_1-input-sequence");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "1"}});

    el = screen.getByTestId("1_1-input-grant");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "permit"}});  

    el = screen.getByTestId("buttom-next");
    expect(el).toBeInTheDocument();
    fireEvent.click(el);

    let errorMsg = screen.getByTestId(`aclAces-protocal1_1-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    let errorMsg = screen.getByTestId(`aclAces-sourceType1_1-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    let errorMsg = screen.getByTestId(`aclAces-source1_1-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    let errorMsg = screen.getByTestId(`aclAces-destinationType1_1-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    let errorMsg = screen.getByTestId(`aclAces-destination1_1-error`).innerHTML;
    expect(errorMsg).toEqual('Required');
});

test("Validate when grant is deny in AccessListModify", () => { 
    renderAccessListModify();

    let el = screen.getByTestId("1_1-input-action");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: { value: "add"}});

    el = screen.getByTestId("1_1-input-sequence");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "1"}});

    el = screen.getByTestId("1_1-input-grant");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, { target: { value: "deny"}});  

    el = screen.getByTestId("buttom-next");
    expect(el).toBeInTheDocument();
    fireEvent.click(el);

    let errorMsg = screen.getByTestId(`aclAces-protocal1_1-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    errorMsg = screen.getByTestId(`aclAces-sourceType1_1-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    errorMsg = screen.getByTestId(`aclAces-source1_1-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    errorMsg = screen.getByTestId(`aclAces-desitinationTypr1_1-error`).innerHTML;
    expect(errorMsg).toEqual('Required');

    errorMsg = screen.getByTestId(`aclAces-destination1_1-error`).innerHTML;
    expect(errorMsg).toEqual('Required');
});

test("Validate when grant is permit and protocal is not icmp  in AccessListModify", () => { 
    renderAccessListModify();

    let el = screen.getByTestId("1_1-input-action");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "add"}});

    el = screen.getByTestId("1_1-input-sequence");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "1"}});

    el = screen.getByTestId("1_1-input-grant");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "permit"}});

    el = screen.getByTestId("1_1-input-protocal");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "ip"}});

    el = screen.getByTestId('1_1-input-protocalOptions');
    expect(el).toBeDisabled();
});

test("Validate when grant is permit and protocal is not icmp  in AccessListModify", () => { 

    renderAccessListModify();

    let el = screen.getByTestId("1_1-input-action");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "add"}});

    el = screen.getByTestId("1_1-input-sequence");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "1"}});

    el = screen.getByTestId("1_1-input-grant");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "permit"}});

    el = screen.getByTestId("1_1-input-protocal");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "ip"}});

    el = screen.getByTestId('1_1-input-protocalOptions');
    expect(el).toBeDisabled();
});

test("Validate when grant is permit and protocal is not icmp  in AccessListModify", () => { 

    renderAccessListModify();

    let el = screen.getByTestId("1_1-input-action");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "add"}});

    el = screen.getByTestId("1_1-input-sequence");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "1"}});

    el = screen.getByTestId("1_1-input-grant");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "permit"}});

    el = screen.getByTestId("1_1-input-protocal");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "ip"}});

    el = screen.getByTestId('1_1-input-protocalOptions');
    expect(el).toBeDisabled();

    el = screen.queryByTestId("1_1-input-sourceType");
    expect(el).toBeInTheDocument();
    
    el = screen.queryByTestId("1_1-input-source");
    expect(el).toBeInTheDocument();

    el = screen.queryByTestId("1_1-input-sourcePOrtProtocol");
    expect(el).toBeInTheDocument();

    el = screen.queryByTestId("1_1-input-sourcePort");
    expect(el).toBeInTheDocument();

    el = screen.queryByTestId("1_1-input-destinationType");
    expect(el).toBeInTheDocument();

    el = screen.queryByTestId("1_1-input-input-destination");
    expect(el).toBeInTheDocument();

    el = screen.queryByTestId("1_1-input-destinationPortProtocol");
    expect(el).toBeInTheDocument();

    el = screen.queryByTestId("1_1-input-destinationPort");
    expect(el).toBeInTheDocument();
});

test("Validate when source type is any in AccessListModify", () => { 

    renderAccessListModify();

    let el = screen.getByTestId("1_1-input-action");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "add"}});

    el = screen.getByTestId("1_1-input-sequence");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "1"}});

    el = screen.getByTestId("1_1-input-grant");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "permit"}});

    el = screen.getByTestId("1_1-input-protocal");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "tcp"}});

    el = screen.getByTestId("1_1-input-protocalOptions");
    expect(el).toBeDisabled();

    el = screen.getByTestId("1_1-input-sourceType");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "any"}});

    el = screen.getByTestId("1_1-input-source");
    expect(el).toBeDisabled();

    el = screen.getByTestId("1_1-input-desinatiionType");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "any"}});
    
    el = screen.getByTestId("1_1-input-source");
    expect(el).toBeDisabled();
});

test("Validate when source type is host in AccessListModify", () => { 

    renderAccessListModify();

    let el = screen.getByTestId("1_1-input-action");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "add"}});

    el = screen.getByTestId("1_1-input-sequence");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "1"}});

    el = screen.getByTestId("1_1-input-grant");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "permit"}});

    el = screen.getByTestId("1_1-input-protocal");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "tcp"}});

    el = screen.getByTestId("1_1-input-protocalOptions");
    expect(el).toBeDisabled();

    el = screen.getByTestId("1_1-input-sourceType");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "host"}});

    el = screen.queryByTestId("1_1-input-source");
    expect(el).toBeDisabled();
    fireEvent.change(el, {target: {value: "test"}});

    el = screen.queryByTestId("1_1-input-desinatiionType");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "host"}});
    
    el = screen.getByTestId("1_1-input-source");
    expect(el).toBeDisabled();
    fireEvent.change(el, {target: {value: "test"}});
    
   el = screen.getByTestId(`aclAces-source1_1-error`).innerHTML;
   expect(el).toBeInTheDocument();
   fireEvent.click(el);

   let errorMsg = screen.getByTestId(`aclAces-source1_1-error`).innerHTML;
   expect(errorMsg).toEqual('Invalid IPv4 Host Address');

   let errorMsg = screen.getByTestId(`aclAces-destination1_1-error`).innerHTML;
   expect(errorMsg).toEqual('Invalid IPv4 Host Address');
});

test("Validate when source type is prefix in AccessListModify", () => { 

    renderAccessListModify();

    let el = screen.getByTestId("1_1-input-action");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "add"}});

    el = screen.getByTestId("1_1-input-sequence");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "1"}});

    el = screen.getByTestId("1_1-input-grant");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "permit"}});

    el = screen.getByTestId("1_1-input-protocal");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "tcp"}});

    el = screen.getByTestId("1_1-input-protocalOptions");
    expect(el).toBeDisabled();

    el = screen.getByTestId("1_1-input-sourceType");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "prefix"}});

    el = screen.queryByTestId("1_1-input-source");
    expect(el).toBeDisabled();
    fireEvent.change(el, {target: {value: "test"}});

    el = screen.queryByTestId("1_1-input-desinatiionType");
    expect(el).toBeInTheDocument();
    fireEvent.change(el, {target: {value: "prefix"}});
    
    el = screen.getByTestId("1_1-input-destination");
    expect(el).toBeDisabled();
    fireEvent.change(el, {target: {value: "test"}});
    
   el = screen.getByTestId("button-next").innerHTML;
   expect(el).toBeInTheDocument();
   fireEvent.click(el);

   let errorMsg = screen.getByTestId(`aclAces-source1_1-error`).innerHTML;
   expect(errorMsg).toEqual('Invalid IPv4 Host Address');

   let errorMsg = screen.getByTestId(`aclAces-destination1_1-error`).innerHTML;
   expect(errorMsg).toEqual('Invalid IPv4 Network');
});

const renderAccessListModify = () => {
    render(
        <JobProvider>
            <MemoryRouter>
                <ActivitySelector activeActivityIds={activeActivityIds}/>
                <AccessListModify activityId="nessie_ns_accessLIstModify"/>
            </MemoryRouter>
        </JobProvider>
    );

    const inputEl = screen.getByTestId("select-category");
    fireEvent.change(inputEl, { target: { value: "IP"}});
    const inputEl = screen.getByTestId("select-service");
    fireEvent.change(inputEl, { target: { value: "Access List"}})
    const inputEl = screen.getByTestId("select-activity");
    fireEvent.change(inputEl, { target: { value: "nessie_ns_accessListModify" }});
    const btnAdd = screen.getByTestId("button-add-job");
    fireEvent.click(btnAdd);

    let el = screen.getByTestId("button-next");
    expect(el).toBeInTheDocument();
    fireEvent.click(el);

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
    fireEvent.change(el, { target: { value: "ipv4" }});
};
test("Validate-model-contract", () => {
    const hasObjectWithKeynessie_ns_accessListModify = activities.hasOwnProperty("nessie_ns_accessListModify")
    expect(hasObjectWithKeynessie_ns_accessListModify).toBe(true)
    const nessie_ns_accessLIstModifyParams = [{
        rowId: 1,
        networkDevice: "",
        addressFamilyIndicator: "",
        accessListType: "",
        accessListName: "",
        aclAces: [{ action: "", sequence: "", grant: "", protocal:"", sourceType: "", source: "", sourcePortProtocol: "", sourcePort: "", destinationType: "", destination:"", destinationPortProtocol: "", destinationPort: "", remark: "", protocolOptions: "", fragments: false, log: false, }],
    }]
    expect(activities["nessie_ns_accessListModify"].params).toEqual(nessie_ns_accessLIstModifyParams)
});











  
  
  
  
  
