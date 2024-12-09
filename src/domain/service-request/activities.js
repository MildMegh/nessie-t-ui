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
                type: "edge",
                vrf: "",
                adhocOptions: [],
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
        lowerCaseField: ['action', 'addressFamilyIndicator', 'grant', 'protocol', 'fragments', 'log', 'destinationType', 'sourceType'],
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
                accessLists: [accessListAfi: "",accessListName: "", accessListDirection: "" ],
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
        activity: "Prefix Li",
        changeType: "normal",
        id: "nessie_ns_prefixListModify",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                prefixListName: "",
                afi: "ipv4",
                description: "",
                prefixListEntries: [{ action: "", ipv4Prefix: "", ipv6Prefix: "", grant: "", sequence: "", prefixLengthProtocol: "", prefixLength: ""}],
            },
        ],
        lowerCaseField: ['afi', 'action', 'grant', 'prefixlengthProtocol'],
        component: comps.PrefixListModify,
    },
    nessie_ns_hsrpAdd: {
        category: "IP",
        service: "Virtual Interface",
        activity: "HSRPbAdd",
        changeType: "normal",
        id: "nessie_ns_hsrpAdd",
        params:  [
            {
                rowId: 1,
                networkDevice: "",
                interfaceName: "",
                priority: "",
                groupNumber: "",
                afi: "",
                ipv4Address: "",
                ipv6Address: "",
                tracks: [{ objectNumber: "", decrement: ""}],
            },
        ],
        lowerCaseField: ['afi', 'priority'],
        component: comps.HSRPAdd, 
    },
    nessie_ns_prefisSetModify: {
        category: "IP",
        service: "Prefix Set",
        activity: "Prefix Set Modify",
        changeType: "normal",
        id: "nessie_ns_prefixSetModify",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                afi: "ipv4",
                prefixSetName: "",
                prefixSetEntries: [{ action: "", ipv4Prefix: "", ipv6Prefix: "", prefixLengthProtocol: "", prefixLength: "", remark: ""}],
            },
        ],
        lowerCaseField: ['afi', 'action', 'entryType', 'prefixLegthProtocol'],
        component: comps.PrefixListModify,
    },
    nessie_ns_etherChannelMemberAdd: {
        category: "IP",
        service:  "Interface",
        activity: "Ether-Channel Member Add",
        changeType: "normal",
        id: "nessie_ns_etherChennelMemberAdd",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                interfaceName: ""
                etherChannelMembers: [{memberInterfaceName: "", mode: ""}],
            },
        ],
        lowerCaseField: ['mode'],
        component: comps.EtherChannelMemberAdd,
    },
    nessie_ns_globalConfigAdd: {
        category: "IP",
        service:  "Global Config",
        activity: "Global Config Add",
        changeType: "normal",
        id: "nessie_ns_globalConfigAdd",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                globalConfig: [],
            },
        ],
        lowerCaseField: ['globalConfig'],
        component: comps.globalConfigAdd,
    },
    nessie_ns_hsrpModify: {
        category: "IP",
        service:  "Virtual Interface",
        activity: "HSRP Modify",
        changeType: "normal",
        id: "nessie_ns_hsrpModify",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                interfaceName: ""
                priority: "",
                groupNumber: "",
                afi: "",
                ipv4Address: "",
                ipv6Address: "",
                tracks: [{ objectNumber: "", decrement: ""}],
            },
        ],
        lowerCaseField: ['afi', 'priority'],
        component: comps.HSRPModify,
    }
    nessie_ns_l3InterfaceAdd: {
        category: "IP",
        service:  "Interface",
        activity: "L3 Interface Add",
        changeType: "normal",
        id: "nessie_ns_l3InterfaceAdd",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                interfaceName: ""
                description: "",
                mtu: "",
                speed: "",
                duplex: "",
                afi: "",
                ipv4Address: "",
                ipv6Address: "",
                ipv4Redirects: false,
                ipv6Redirects: false,
                ipUnreachables: true,
                dot1qEncapsulation: "",
                vrf: "",
                accessList: [{accessListAfi: "", accessListName: "", accessListDirection: ""}],
                enabled: true,
                adhocOptions: []
            },
        ],
        lowerCaseField: ['afi', 'ipv4Redirects', 'ipv6Redirects', 'mtu', 'speed', 'duplex', 'ipUnreachable', 'enabled', 'accesssListAfi', 'accessListDirection', 'adhocOptions'],
        component: comps.l3InterfaceAdd,
    },
    nessie_ns_l3InterfaceModify: {
        category: "IP",
        service:  "Interface",
        activity: "L3 Interface Modify",
        changeType: "normal",
        id: "nessie_ns_l3InterfaceModify",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                interfaceName: ""
                description: "",
                ipv6Address: "",
                ipv4Redirects: false,
                ipv6Redirects: false,
                accessList: [{accessListAfi: "", accessListName: "", accessListDirection: ""}],
                adhocOptions: []
            },
        ],
        component: comps.l3InterfaceModify,
    },
    nessie_staticRouteAdd: {
        category: "IP",
        service:  "Static Routes",
        activity: "L3 Interface Add",
        changeType: "normal",
        id: "nessie_ns_staticRouteAdd",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                description: "",
                afi: "",
                vrf: "",
                safi: "",
                nextHops: [
                    {nextHop: "", name: "", interfaceName: "", adminDistance: "", tag: "", track: ""}
                ],
            },
        ],
        lowerCaseField: ['afi', 'safi'],
        component: comps.StaticRouteAdd,
    },
    nessie_ns_staticRouteDelete: {
        category: "IP",
        service: "Static Routes",
        activity: "Static Route Delete",
        changeType: "normal",
        id: "nessie_ns_staticRouteDelete",
        params: [
            {
            rowId: 1,
            afi: "ipv4",
            safi: "unicast",
            destination: "",
            vrf: "",
            nextHop: [
                { nextHop: "", interfaceName: ""}
            ],
            },  
        ],
        lowerCaseField: ['afi', 'safi'],
        component: comps.StaticRouteDelete,
    },
    nessie_ns_vrfAdd: {
        category: "IP",
        service:  "Vrf",
        activity: "Vrf Add",
        changeType: "normal",
        id: "nessie_ns_VrfAdd",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                afi: "ipv4",
                vrf: "",
                description: "",
                routeDistinguisher: "",
                routeTargets: [{ routeTarget: '', direction: "import"}]
            },
        ],
        lowerCaseField: ['afi', 'directon'],
        component: comps.VrfAdd,
    },
    nessie_ns_l2InterfaceAdd: {
        category: "IP",
        service:  "Interface",
        activity: "L2 Interface Add",
        changeType: "normal",
        id: "nessie_ns_l2InterfaceAdd",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                interfaceName: ""
                description: "",
                mtu: "",
                speed: "",
                duplex: "",
                switchportMode: "access",
                vlan: "",
                allowedVlans: "",
                nativeVlan: "",
                accessPortType: "",
                enabled: true,
                adhocOptions: []
            },
        ],
        lowerCaseField: ['mtu', 'speed', 'duplex', 'valn', 'switchPortMode', 'allowedVlans', 'enabled', 'nativeVlan', 'accessPortType', 'adhocOptions'],
        component: comps.l2InterfaceAdd,
    },
    nessie_ns_l2EtherChannelAdd: {
        category: "IP",
        service:  " Virtual Interface",
        activity: "L2 Ether-channel Add",
        changeType: "normal",
        id: "nessie_ns_l2EtherChannelAdd",
        params: [ {
                rowId: 1,
                networkDevice: "",
                interfaceName: ""
                description: "",
                mtu: "",
                switchportMode: "access",
                vlan: "",
                allowedVlans: "",
                nativeVlan: "",
                accessPortType: "",
                enabled: true,
                adhocOptions: []
            }, ],
        lowerCaseField: ['mtu','valn', 'switchPortMode', 'allowedVlans', 'enabled', 'nativeVlan', 'accessPortType', 'adhocOptions'],
        component: comps.l2EtherChannelAdd
    },
    
    
    nst_inactive_activities = {
    nessie_ns_portDefault: {
        category: "IP",
        service: "Interface",
        activity: "Port Default",
        changeType: "standard",
        id: "nessie_ns_portDefault",
        params: [
            {
                rowId: 1,
                hostName: "",
                interfaceName: "",
                },
        ],
        component: comps.PortDefault,
        },
    nessie_ns_bgAddressFamilyAdd: {
        category: "IP",
        service:  "BGP",
        activity: "AddressFamily Add",
        changeType: "normal",
        id: "nessie_ns_bgAddressFamilyAdd",
        component: comps.BGPAddressFamily,
        params: [
            {
                rowId: 1,
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
    nessie_ns_bgAddressFamilyModify: {
        category: "IP",
        service:  "BGP",
        activity: "AddressFamily Modify",
        changeType: "normal",
        id: "nessie_ns_bgAddressFamilyModify",
        component: comps.BGPAddressFamily,
        params: [
            {
                rowId: 1,
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
    nessie_ns_bgAddressFamilyDelete: {
        category: "IP",
        service:  "BGP",
        activity: "AddressFamily Delete",
        changeType: "normal",
        id: "nessie_ns_bgAddressFamilyDelete",
        component: comps.BGPAddressFamily,
        params: [
            {
                rowId: 1,
                networkDevice: "",
                vrf: "",
                afi: "",
                safi: "",
                as_number: "",
                aggregate_address: [{ network: "", summary_only: false}],
                operation: "delete",
            },
        ],
    },
    nessie_ns_routeMapAdd: {
        category: "IP",
        service:  "Route Map",
        activity: "RouteMap Add",
        changeType: "normal",
        id: "nessie_ns_routeMapAdd",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                route_map: "",
                sequence: "",
                action: "",
                description: "",
                match_as_path: [],
                match_community_list: [],
                match_community_exact_match: "",
                match_interfaces: [],
                match_ip_next_hop_prefix_lists: [],
                match_ip_route_source_prefix_lists: [],
                match_ipv6_addrress_access_list: "",
                match_ipv6_addrress_prefix_list: "",
                match_ipv6_next_hop_prefix_lists: [],
                match_ipv6_route_source_prefix_lists: [],
                set_ip_precedence: "",
                set_ipv6_address_prefix_list: "",
                set_metric_bandwidth: "",
                set_metric_igrp_delay_metric: "",
                set_metric_igrp_effective_bandwidth_metric: "",
                set_metric_igrp_mtu: "",
                set_metric_igrp_reliability_metric: "",
            },
        ],
        component: comps.RouteMapAdd,
    },
    nessie_ns_routeMapDelete: {
        category: "IP",
        service:  "Route Map",
        activity: "RouteMap Delete",
        changeType: "normal",
        id: "nessie_ns_routeMapDelete",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                route_map: "",
            },
        ],
        component: comps.RouteMapDelete,
    },
    nessie_ns_l3SubInterfaceAdd: {
        category: "IP",
        service:  "Interface",
        activity: "L3 Sub Interface Add",
        changeType: "normal",
        id: "nessie_ns_l3SubInterfaceAdd",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                interfaceName: ""
                description: "",
                mtu: "",
                ipv4Address: "",
                ipv6Address: "",
                acl_inbound,
                acl_outbound,
                acl_afi: "",
                vrf: "",
                enabled: true,
                brf: false
            },
        ],
        component: comps.l3SubInterfaceAdd,
    };
    nessie_ns_asPathSetAdd: {
        category: "IP",
        service:  "Route Map",
        activity: "AS Path Set",
        changeType: "normal",
        id: "nessie_ns_asPathSetAdd",
        params: [
            {
                rowId: 1,
                networkDevice: "",
                interfaceName: "",
                entries: [],
            },
        ],
        component: comps.ASPathSet,
    },

    const getAllActivityIds = () => {
        return Object.keys(activities);
    };
    const getCategories = (activityIds) => {
        let hash = {};
        if (isEmpty(activeIds)) {
            return [];
        }
        if (isEmpty(activeIds)) {
            Object.keys(activities).forEach((key) => {
                hash[activities[key].category] = true;
            });
        } else {
            activeIds.forEach((id) => {
                if (activities[id]) {
                    hash[activities[id].category] = true;
                }
            });
        }
        return Object.keys(hash);
    };

    const getServices = (category, activeIds) => {
        let hash = {};
        
        if (isEmpty(activeIds)) {
            return [];
        }
        // filter by activeIds
        activeIds.forEach((id) => {
            if (activities[id] && activities[id].category === category) {
                hash[activities[id].service] = true;
            }
        });

        return Object.keys(hash).sort((a, b) => a.localCompare());
    };
    const getActivities = (category, service, activeIds) => {
        //if its a local test and activeIds is not probived, return all activities
        if (isEmpty(activeIds)) {
            return [];
        }
        
        let query = Object,keys(activities)
            .filter(
                (id) => 
                    activities[id].category === category &&
                activities[id].service === service &&
                (isEmpty(activeIds) || activeIds.includes(id))
            )
            .sort((a,b) => a.localCompare(b));

        return query.map((id) => activities[id]);
    };

export {
    getCategories,
    getServices,
    getActivities,
    getActivities,
    activities,
};


