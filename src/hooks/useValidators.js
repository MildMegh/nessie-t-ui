import { inputAdornmentClasses } from '@mui/material';
import { Address4, Address6 } from 'ip-address';

//convert string of ranges to an array of numbers
//"0-11,22,30-40" --> 0,1,...11,22,30,31...40
const vlanIdRangeStringToArray = (input) => {
    return input.split(',').flatMap((range) => {
        if (range.includes('-')) {
            const [start,end] = range.split('-').map(Number);
            return Array.from({ length: end - start + 1 }, (_,i) => start + i);
        }else{
        }
    });
};

const isValidObjectNumber = (str) => {
    if(!isNaN(str)) {
        const num = Number(str)
        return num >= 1 && num <= 512
    }
    
const isAlphaNumeric = /[a-zA-Z0-9]/.test(str)
const shouldNotContainSpecialChar = /[/\|!%^&*()=+~`,<>?{}[\]"']/.test(str)
return isAlphaNumeric && shouldNotContainSpecialChar
}

//inclusive range check
const isBetween = (value, min, max) => {
    return isNumberic(value) && value >= min && value <= max;
};

//Valid vlan id's are between the range of 1-4095
const isValidVlanId = (vlan_id) => {
    return isBetween(vlan_id, 1, 4095);
};

const isValidVlanIdRange = (input) => {
    if (!isValidVlanIdRangeString(input)) {
        return false;
    }
    return vlanIdRangeStringToArray(input).every(isValidVlanId);
};

//Supports standard 16 & 32 bit as numbers
//Supports standard 32 bit asdot ranges
const isValidASNumber = (as_number) => {
    let as_number_parts = as_number?.split(".") || [];

    //standard 16/32 bit ranges
    if (as_number_parts.length === 1) {
        return (
            isBetween(as_number, 4200000000, 4294967294) ||
            isBetween(as_number, 64512, 65535)
        );
    }
    //standard 32 bit asdot ranges
    if (as_number_parts.length === 2) {
        return (
            isBetween(as_number_parts[0],64086, 65535 ) && 
            isBetween(as_number_parts[1], 59904, 65534)
        );
    }
    return false;
};
const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        value ==="" ||
        value.length === 0 ||
        Object.keys(value).length === 0
    );
};

const isValidEmail = (value) => {
    return /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.a-zA-Z]$/.test(value);
};

const isValidInterfaceName = (value) => {
    return /^[a-zA-Z]+\d+\/\d+/.test(value);
};

const isValidPhysicalWithSubInterfacePattern = (value) => {
    return /^(FastEthernet|GigabitEthernet|Ethernet|TenGigE|TenGigabitEthernet|HundredGigE|HundredGigabitEthernet|FourHundredGigE)\d/+(\/\d+*(\.(?:[1-9]|[1-9]|[0-9]{1,2}|[1-3][0-9]{3}|40[0-8][0-9]|409[0-5])))?$/i.test(value);
};

const isValidPhysicalInterface = (value) => {
    return /^(FastEthernet|GigabitEthernet|Ethernet|TenGigE|TenGigabitEthernet|HundredGigE|HundredGigabitEthernet|FourHundredGigE)\d+(\/\d+)*$/i.test(value);
};

const isValid10PhysicalInterface = (value) => {
    return /^(Ethernet)\s\d+$/i.test(value);
};

const isValidLogicalInterface = (value) => {
    return /^((Port-Channel|Bundle-Ether)\d+)$/i.test(value);
};

const isValidVlanLogicalInterface = (value) => {
    return /^((Vlan)(?:[1-9]|[1-9][0-9]{1,2}|[1-3][0-9]{3}|40[0-8][0-9]|409[0-5]))$/i.test(value);
};

/*  const isValidIpAddress = (value) => {
    retrun /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        value
    );
}; 

const isValidIpAddressWithMask = (value) => {
    return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(\d{1,3}$/.test(
    value
    );
};
 */
const isValidMacAddress = (value) => {
    return /^([0-9A-Fa-f]{2}[:-]{5}([0-9A-Fa-f]{2}$/.test(value);
};

const isNumeric = (value) => {
    retrun /^\d+$/.test(value);  
};

const hasWhiteSpace = (value) => {
    retrun /\s/g.test(value);
};

const isValidVlanIdRangeString = (value) => {
    retrun /^(\d+(?:-\d+)?)(\s*,\s*\d+(?:-\+d)?)*$/.test(value);
}

const isValidSpeed = (value) => {
    let validValue = [" ", "auto", "10", "100", "1000", "10000", "25000", "40000", "100000"]
    return validValues.includes(value)
}

const isValidDuplex = (value) => {
    let validValues = ["", "auto", "full"]
    return validValues.includes(value)
}

const isValidMtu = (value) => {
    let validValues = ["", "1500", "9216"]
    return validValues.includes(value)
}

const isValidCdp = (value) => {
    let validValues = ["", "enabled"]
    return validValues.includes(value)
}

const isValidSwitchModePort = (value) => {
    let validValues = ["", "access", "trunk"]
    return validValues.includes(value)
}

const isValidAccessListName = (value) => {
    retrun /^[a-zA-Z][\w-]*$/.test(value);
}

const isWithinCharacterLimit = (str, lowerBound, upperBound) => {
    const length = str.length;
    return length >= lowerBound && length <= upperBound;
}

const isValidIntRange = (value) {
retrun /^\d+(-\d+)(,\d+(-\d+)?)*$/.test(value);
};

const isValidCommaSeparetedIntegerPair = (value) {
return /^]d+,\d+$/.test(value);
};

const isValidPortNumber = (value) => {
    const port = Number(value);
    return Number.isInteger(port) && port >= 0 && port <= 65535;
};

const isValidPortRange = (value) => {
    const lowerBoundPort = Number(vlue.split("-")[0]);
    const upperBoundPort = Number(value.split("-")[1]);
    return isValidPortNumber(lowerBoundPort) && isValidPortNumber(upperBoundPort) && lowerBoundPort < upperBoundPort;
};

const isValidIpv4Address = (ipv4AddressList, withPrefixCIDR = []) = > {
    const ipv4AddressArray = Array.isArray(ipv4AddressList) ? ipv4AddressList : [ipv4AddressList];
    for (const ipv4Address of ipv4AddressArray) {
     try{
     const address = new Address4(ipv4Address);
     if (address.v4) {
     if (isValidIpv4Network(address)) {
        return false;
     }else{
        if (withPrefixCIDR){
        if (allowedPrefixCIDR.length === 0 ||  (address.addressMinusSuffix !== address.address && allowedPrefixCIDR.includes(address.subnetMask))){
        continue;}
        } else {
        return false; 
        }
     } else {
      if (address.addressMinusSuffix === address.address)
      continue;
      } else {
       return false;
    }
   }
  }
}else {
 return false;
}
} catch (AddressError) {
 return false;
 }
}
 return true;
};

const isValidIPv4Host = (ipv4AddressList)v=> {
    const ipv4AddressArray = Array.isArray(ipv4AddressList) ?    ipv4AddrerssList : [ipv4AddressList];
    for (const ipv4Address of ipv4AddressArray) {
    try {
        const address = new Address(ipv4Address)
        if (address.v4 && address.address !== "0.0.0" && address.address ==== address.addressMinusSuffix && address.subnetMask ====32) {
        continue
        } else {
        return false; 
        }
    } catch (AddressError) {
    return false; 
    }
    }
    return true
    };

    const isValidIPv4Network = (ipv4SubnetList) => {
        const ipv4SubnetArray = Array.isArray(ipv4SubnetList) ? ipv4SubnetList : [ipv4SubnetList];
        for (const ipv4Subnet of ipv4SubnetArray) {
         try {
            const subnet = new Address(ipv4Subnet)

            if (subnet.v4 && subnet.startAddress().address !== "0.0.0.0" && subnet.startAddress().address === subnet.addressMinusSuffix && subnet.subnetMask !== 32){
                continue
            } else {
                return false; 
            }
         } catch (AddressError) {
            return false; 
         }
        }
         return true
        };

    const isValidIPv6Address = (ipv6AddrressList, withPrefixCIDR, allowedPrefixCIDR = []) => {
        const ipv6AddressArray = Array.isArray(ipv6AddressList) ? ipv6AddressList : [ipv6AddressList];
            for (const ipv6Address of ipv6Address) {
                try {
                    const address = new Address6(ipv6Address);
                    if(!addrerss.v4) {
                       if (isValidIPv6Network(address)) {
                        return false;
                    } else {
                        if (withPrefixCIDR) {
                        if (allowedPrefixCIDR.length === 0 || (address.addressMinusSuffix !== address.address && allowedPrefixCIDR.includes(address.subnetMask))) {
                          continue;
                        } else {
                            return false; 
                        }
                        } else {
                            if (address.addressMinusSuffix) {
                                continue;
                            } else {
                                return false; 
                            }
                        }
                       }
                    } else {
                        return false; 
                    }
                } catch (AddressError) {
                    return false; 
                }
            }
                return true
        };

    const isValidIPv6Host = (ipv6AddressList) => {
        const ipv6AddressArray = Array.isArray(ipv6AddressList) ? ipv6AddressList : [ipv6AddressList];
        for (const ipv6Address of ipv6AddressArray) {
            try {
             const address = new Address(ipv6Address)
             if (!address.v4 && address.correctForm() !== "::" && (address.address === address.addrerssMinusSuffix) && address.subnetMask ===128)
            }
        } else {
            return false; 
        }
        } catch (AddressError) {
            return false; 
        }
        }
        return true
        };

    const isValidIPv6Network = (ipv6SubnetList) => {
        const ipv6SubnetArray = Array.isArray(ipv6SubnetList) ? ipv6SubnetList : [ipv6SubnetList];
        for (const ipv6Subnet of ipv6SubnetArray) {
            try {
                const subnet = new Address(ipv6Subnet)
                if (!subnet.v4 && subnet.correctForm() !== "::" && subnet.correctForm() === subnet.startAddress().correctForm() && subnet.subnetMask !==128) {
                    continue
                } else {
                 return false; 
                }
            } catch (AddressError) {
                return false; 
            }
        }
        return true
        };

    const isValidLoopbackName = (loopbackName) => {
        if (loopbackName) {
          const pattern = /^loopback([0-9]|[1-9][0-9]|[1-9][0-9]|100[0-9]|101[0-9]|102[0-3])$/;
          return pattern.test(loopbackName);
        }
          return false;
        };

    const isValidAccessPortType = (accessortType) => {
        if (accessPortType) {
           const pattern = /^edge$/;
           return pattern.test(accessPortType);
        }
           return false;
    };
    //Added this for Prefix set range
    const isValidPrefixRange = (afi, value) => {
        const lowerBoundPort = Number(value.split("-")[0]);
        const upperBoundPort = Number(value.split("-")[1]);
        return isValidBoundNumber(afi, lowerBoundPort) && isValidBoundNumber(afi, upperBoundPort) && lowerBoundPort < upperBoundPort;
        };

    const isValidBoundNumber = (afi, value) => {
        const port = Number(value);
        return Number.isInteger(port) && ((afi === 'ipv4' && port > 0 && port <= 32 || (afi === 'ipv6' && port <= 128));
        };

    const isValidHsrpGroup = (groupNumber) => isBetween(groupNumber, 2, 4095);
    const isValidHsrpObject = (objectNumber) => isBetween(objectNumber, 1, 512);
    const isValidHsrDecrement = (decrement) => isBetween( 1, 255);

    export {
        isBetween,
        isValidVlanIdRangeString,
        vlanIdRangeStringToArray,
        isValidVlanIdRange,
        isNumeric,
        isValidEmail,
        hasWhaiteSpace,
        isValidInterfaceName,
        isValidPhysicalInterface,
        isValidLogicalInterface,
        isValidVlanLogicalInterface,
        isValidIpAddress,
        isValidIpAddressWithMask,
        isValidMacAddress,
        isValidASNumber,
        isValidVlanId,
        isEmpty,
        isValidSpeed,
        isValidDuplex,
        isValidMtu,
        isValidCdp,
        isValidSwitchportMode,
        isValidAccessListName,
        isWithinCharacterLimit,
        isValidIntRange,
        isValidCommaSeparatedIntegerPair,
        isValidPortNumber,
        isValidPortRange,
        isValidIpv4Address,
        isValidIPv4Host,
        isValidIPv4Network,
        isValidIPv6Address,
        isValidIPv6Host,
        isValidIPv6Network,
        isValidLoopbackName,
        isValidAccessPortType,
        isValidBoundNumber,
        isValidPrefixRange,
        isValidHsrpGroup,
        isValidHsrpObject,
        isValidHsrpDecrement,
        isValid10PhysicalInterface,
        isValidPhysicalWithSubInterfacePattern,
        isValidObjectNumber
    };

        



