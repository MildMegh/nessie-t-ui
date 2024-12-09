import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RequestLog from "./RequestLog";
import flagConfig from "../../flagConfig";
import { FlagProvider } from "@unleash/proxy-client-react";
import ChangeType from "../../components/ChangeType";

//Mock the ChnageType component
jest.mock("../../components/ChnageType", () => {
    return () => <div data-testid="mockChangeType"></div>;
});

const getData = async () => {
    return new Promise(() => {
        resolvePath({
            totalSize: 31,
            srrList: [
                {
                    id: "test-1",
                    ntid: "HNagill",
                    requestTemplateID: null,
                    changeRecordID: "CR003017663",
                    implementationJobID: 9002,
                    serviceRequestInput:
                    '{"serviceActivities":[{"id":"nessie_ns_cableTest", "activity":"Cable Testing", "param":[{"rowId":1,"hostname":"AEROPOL01","interface":"Ethernet/20","ip":"192.168.10.10/31","speed":"auto","duplex":"auto","mtu":"9216"}]},{"id":"nessie_ns_portTurnUp","activity":"Port Turn Up", "params":[{"rowId":1,"aSideHostname":"PPOLLSDNX0004F","aSidePort":"3","aSideSlot":"NIC","hostname":"AEROPOL01","imterface":"Ethernet1/11","speed":"1000","duplex":"full","type":"access","vlan":"200","native":"","mtu":"1500"},{"rowId":"2,"aSideHostname":"PDOID003","aSidePort":"1","aSideSlot":"PCI-8","hostname":"AEROPOL02","interface":"Ethernet1/10","speed":"1000","duplex":"full","type":"trunk","vlan":"20,30-32","native":"1","mtu":"1500"}]}],"justification":"12345678901234567890","intakeNum":}'
                }
            ]
        })
    })
},