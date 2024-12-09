const { REACT_APP_CLIENT_ID } = process.env;
const { REACT_APP_AD_SCOPE } = process.env;

export const msalConfig = {
    auth: {
        clientId: `${REACT_APP_CLIENT_ID}`,
        authority:
            "https://login.microsoftonline.com/be0f980b-4b19-bd7b-bc71a09b026c",
        redirectURL: window.location.origin,
    },
    cache: {
        cacheLocation: "sessionStorage",// This configures where your cache will be stored
        storeAuthStateInCookie: false, //Set this to "true" if you are having issues on IE11 or edge
    },
};

//Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scoprs: [`${REACT_APP_AD_SCOPE}`],
};

//Add the endpoints here for Microsift Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphManagerEndpoint: 
        "https://graph.microsoft.com/v1.0/me/manager?$select=onPremisesSamAccountName",
    scopes: ["user.read"],
};
