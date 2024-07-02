import * as comps from "./activities";
import { isEmpty } from "../../hooks/useRevalidator";

const activities = {
    nessie_ns_cableTest: {
        category: "IP",
        service: "Interface",
        activity: "Cable Testing",
        changeType: "standard",
        id: "nessie_ns_cableTest",
        component: comps.CableTesting,
        params: [
            {
                rowId: 1,
                networkDevice: "",
                interfaceName: "",
                ip: "",
                speed: "",
                duplex: "",
                mtu: "",
                cdp: "",
            },
        ],
    },
    nessie_ns_portTurnUp: {
        category: "IP",
        service: "Interface",
        activity: "PortTurn Up",
        changeType: "standard",
        id: "nessie_ns_portTurnUp",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                interfaceName: "",
                serverHostname: "",
                serverSlot: "",
                serverPort: "",
                speed: "",
                duplex: "",
                mtu: "",
                switchportMode: "",
                vlan: "",
                allowedVlans: "",
                nativeVlan: "",
                accessPortType: "",
            },
        ],
        component: comps.PortTurnUp,
    },
    nessie_ns_vlanAdd: {
        category: "IP",
        service: "Vlan",
        activity: "Vlan Add",
        changeType: "standard",
        id: "nessie_ns_vlanAdd",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                vlan_id: "",
                vlan_name: "",
                operation: "add",
            };
        ],
        component: comps.VlanAdd,
    },
    nessie_ns_vlanModify: {
        category: "IP",
        service: "Vlan",
        activity: "Vlan Modify",
        changeType: "standard",
        id: "nessie_ns_vlanModify",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                vlan_id: "",
                vlan_name: "",
                operation: "modify",
            },
        ],
        component: comps.VlanModify,
    },
    nessie_ns_vlanDelete: {
        category: "IP",
        service: "Vlan",
        activity: "Vlan Delete",
        changeType: "standard",
        id: "nessie_ns_vlanDelete",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                vlan_id: "",
                vlan_name: "",
                operation: delete,
            },
        ],
        component: comps.VlanDelete,
    },
    nessie_ns_interfaceModify: {
        category: "IP",
        service: "Interface",
        activity: "Interface Modify",
        changeType: "standard",
        id: "nessie_ns_interfaceModify",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                interfaceName: "",
                description: "",
                speed: "",
                duplex: "",
                mtu: "",
                switchportMode: "",
                allowedVlans: "",
                removeVlans: "",
                nativeVlan: "",
                vlan: "",
                accessPortType: ""
            },
        ],
        component: comps.InterfaceModify,
    },
    nessie_ns_accessListModify: {
        category: "IP",
        service: "Access List",
        activity: "AccessList Modify",
        changeType: "normal",
        id: "nessie_ns_accessListModify",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                addressFamilyIndicator: "",
                accessListType: "",
                accessListName: "",
                aclAces: [{ action: "", sequence: "", grant: "", protocol: "", sourceType: "", source: "", sourcePortProtocol: "", sourcePort: "", destinationType: "", destination: "", destinationPortProtocol: "", destinationPort: "", remark: "", protocolOptions: "", fragments: false, log: false }],
            },
        ],
        component: comps.AccessListModify,
    },
    nessie_ns_bgpAddressFamilyAdd: {
        category: "IP",
        service: "BGP",
        activity: "Address Family Add",
        changeType: "normal",
        id: "nessie_ns_bgpAddressFamilyAdd",
        component: comps.BGPAddressFamily,
        params: [
            {
                rowId: "1",
                networkDevice: "",
                vrf: "",
                afi: "",
                safi: "",
                as_number: "",
                aggregate_address: [{ network: "", summary_only: false}],
                operation: "add",
            },
        ],
    },
    nessie_ns_loopbackAdd: {
        category: "IP",
        service: "Virtual Interface",
        activity: "Loopback Add",
        changeType: "standard",
        id: "nessie_ns_loopbackAdd",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                loopbackName: "",
                afi: "",
                description: "",
                ipv4Address: "",
                ipv6Address: "",
                vrf: "",
            },
        ],
        component: comps.LoopbackAdd,
    },
    nessie_ns_sviAdd: {
        category: "IP",
        service: "Virtual Interface",
        activity: "SVI Add",
        changeType: "standard",
        id: "nessie_ns_sviAdd",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                interfaceName: "",
                description: "",
                mtu: "",
                afi: "",
                ipv4Address: "",
                ipv4AddressSecondary: "",
                ipv6Address: "",
                accessListAfi: "",
                accessListName: "",
                accessListDirection: "",
                enabled: true,
                vrf: "",
                ipv4Redirects: false,
                ipv6Redirects: false
                ipUnreachables: true,
                adhocOptions: []
            },
        ],
        component:comps.SVIAdd,
    },
    nessie_ns_sviModify: {
        category: "IP",
        service: "Virtual Interface",
        activity: "SVI Modify",
        changeType: "standard",
        id:  "nessie_ns_sviModify",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                interfaceName: "",
                description: "",
                ipv4Redirects: false,
                ipv6Redirects: false
            },
        ],
        component: comps.SVIModify,
    },
    nessie_ns_prefixListModify: {
        category: "IP",
        service: "Prefix List",
        activity: "Prefix Li"
    }
    }
};

