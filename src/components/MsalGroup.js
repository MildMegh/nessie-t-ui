import { useMsal } from "@azure/msal-react";
import React, { useState, useEffect } from "react";
import { loginRequest } from "../../authConfig";

const MsalGroup = (props) => {
  const { instance } = useMsal();
  const { children, validAzureAdGroupId } = props;
  const [authorized, setAuthorized] = useState(false);

  useEffect(async () => {
    const response = await instance.acquireTokenSilent({
      ...loginRequest(),
      account: instance.getActiveAccount(),
    });

    if (
      !response ||
      !response.idTokenClaims ||
      !response.idTokenClaims.groups
    ) {
      setAuthorized(false);
    } else {
      setAuthorized(
        response.idTokenClaims.groups.includes(validAzureAdGroupId)
      );
    }
}, [instance]);
return (
  <>
    (authorized && <>{children}</>) || (<>Unauthorized</>)
  </>
);
};
export default MsalGroup;