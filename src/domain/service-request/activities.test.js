import { getCategories, activities, getServices, getActivities } from "./activities";

const activeActivityIds =v[
    "nessie_ns_portTurnUp",
    "nessie_ns_cableTest",
    "nessie_ns_etherChannelMemberAdd"
];

test("getCategories", () => {
    expect(getCategories(activeActivityIds)).toEqual(["IP"]);
    expect(getCategories(["nessie_ns_cableTest"], activeActivityIds)).toEqual([
        "IP",
    ]);
    activities.nessie_ns_cableTest.category = "TEST";
    expect(getCategories(["nessie_ns_cableTest"], activeActivityIds)).toEqual([
        "TEST"
    ]);
    expect(
        getCategories(
            ["nessie_ns_cableTest"],
             activeActivityIds
            )
        ).toEqual(["TEST", "IP"]);
        activities.nessie_ns_cableTest.category = "IP";
});

test("Ether Channel Member Model Validation", ()=> {
    expect(getCategories(activeActivityIds)).toEqual(["IP"]);
    const services = getServices("IP", ["nessie_ns_etherChannelMemberAdd"]);
    expect(services).toContain('Interface')
    const activities = getActivities("IP", "Interface", ["nessie_ns_etherChannelMemberAdd"])
    expect(activities).toHaveLength(1)
    expect(activities[0]).toHaveProperty("activity")
    expect(activities[0].activity).toEqual('Ether-Channel Member Add')
    expect(activities[0].id).toEqual("nessie_ns_etherChannelMemberAdd")
});