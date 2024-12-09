import React from "react";

//Msal imports
import { MsalAuthenticationTemplates } from "@azure/msal-react";

import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

import Loading from "./Loading";
import Error from "./Error";

const ProtectPage = (props) => {
    const authRequest = {
        ...lodinRequest,
    };

    return (
        <MsalAuthenticationTemplates
            InteractionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
            errorComponent={Loading}
            loadingComponent={Loading}
        >
            {props.children}
        </MsalAuthenticationTemplates>
    );
};

export default ProtectPage;