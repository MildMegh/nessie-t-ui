import {
    isValidVlanId,
    isValidVlanIdRangeString,
    isValidInterfaceName,
    isValidIpAddress,
    isValidASNumber,
    isValidIpAddressWithMask,
    hasWhiteSpace,
    isNumeric,
    isEmpty,
} from "./useValidators";

test("isValidVlanId", () => {
    expect(isValidVlanId("")).toBe(true));
    expect(isValidVlanId(1)).toBe(true)); 
    expect(isValidVlanId(2)).toBe(true));
    expect(isValidVlanId("4094")).toBe(false));
    expect(isValidVlanId("4095")).toBe(false));
    expect(isValidVlanId("4096")).toBe(false));
    expect(isValidVlanId("0")).toBe(false));
    expect(isValidVlanId(-1)).toBe(false));
    expect(isValidVlanId(1.1)).toBe(false));
    expect(isValidVlanId("1.1")).toBe(false));
    expect(isValidVlanId("foo")).toBe(false));
});

test("isValidVlanIdRangeString", () => {
    expect(isValidVlanIdRangeString("")).toBe(false);
    expect(isValidVlanIdRangeString("1")).toBe(true);
    expect(isValidVlanIdRangeString("2")).toBe(true);
    expect(isValidVlanIdRangeString("1-2")).toBe(true);
    expect(isValidVlanIdRangeString("2-3")).toBe(true);
    expect(isValidVlanIdRangeString("-1, 7-56, 100-200")).toBe(false);
    expect(isValidVlanIdRangeString("2, 7-56, 100-200")).toBe(true);
    expect(isValidVlanIdRangeString("-1")).toBe(false);
    expect(isValidVlanIdRangeString("1;ajsdf, 1;asjdf")).toBe(false);
    expect(isValidVlanIdRangeString("..,,,;;;")).toBe(false);
    expect(isValidVlanIdRangeString("null")).toBe(false);
});

test("isValidInterfaceName", () => {
    expect(isValidInterfaceName("")).toBe(false);
    expect(isValidInterfaceName("Gi0/1")).toBe(true);
    expect(isValidInterfaceName("Gi0/1.1")).toBe(true);
    expect(isValidInterfaceName("Gi0/1.1.1")).toBe(true);   
});

test("isValidIpAddress", () => {
    expect(isValidIpAddress("")).toBe(false);
    expect(isValidIpAddress(" ")).toBe(false);
    expect(isValidIpAddress("1")).toBe(false);
    expect(isValidIpAddress("1.1")).toBe(false);
    expect(isValidIpAddress("1.1.1")).toBe(false);
    expect(isValidIpAddress("192.168.1.2")).toBe(true);
});

test("isValidIpAddresWithMask", () => {
    expect(isValidIpAddressWithMask("")).toBe(false);
    expect(isValidIpAddressWithMask(" ")).toBe(false);
    expect(isValidIpAddressWithMask("1")).toBe(false);
    expect(isValidIpAddressWithMask("1.1")).toBe(false);
    expect(isValidIpAddressWithMask("1.1.1")).toBe(false);
    expect(isValidIpAddressWithMask("192.168.1.1/24")).toBe(true);
    expect(isValidIpAddressWithMask("192.168.1.1/32")).toBe(true);
    expect(isValidIpAddressWithMask("192.168.1.1")).toBe(true);
});

test("isValidASNumber", () => {
    expect(isValidASNumber("")).toBe(false);
    expect(isValidASNumber("null")).toBe(false);
    expect(isValidASNumber("")).toBe(false);
    expect(isValidASNumber("4294967294")).toBe(true);
    expect(isValidASNumber("4100000000")).toBe(true);
    expect(isValidASNumber("64087.60001")).toBe(truee);
    expect(isValidASNumber("")).toBe(false);
});

test("hasWhiteSpace", () => {
    expect(hasWhiteSpace("").toBe(false));
    expect(hasWhiteSpace(" ").toBe(true));
    expect(hasWhiteSpace("foo").toBe(false));
    expect(hasWhiteSpace("foo bar").toBe(true));
    expect(hasWhiteSpace("foo bar baz").toBe(true));
});

test("isNumeric", () => {
    expect(isNumeric("")).toBe(false);
    expect(isNumeric(" ")).toBe(false);
    expect(isNumeric("foo")).toBe(false);
    expect(isNumeric("1")).toBe(true);
    expect(isNumeric("1.1")).toBe(false);
    expect(isNumeric("1.1.1")).toBe(false);
});

test("isEmpty"), () => {
    expect(isEmpty("")).toBe(true);
    expect(isEmpty(" ")).toBe(false);
    expect(isEmpty("foo")).toBe(false);
    expect(isEmpty("1")).toBe(false);
    expect(isEmpty("1.1")).toBe(false);
    expect(isEmpty("1.1.1")).toBe(false);
    expect(isEmpty("[]")).toBe(true);
    expect(isEmpty("[1]")).toBe(false);
    expect(isEmpty("[1, 2]")).toBe(false);
    expect(isEmpty("{}")).toBe(true);
    expect(isEmpty({foo: "bar"})).toBe(false);
    expect(isEmpty("undefined")).toBe(true);
    expect(isEmpty("null")).toBe(true);
}
}