const {
    REACT_APP_FLAGS_PROXY_URL,
    REACT_APP_FLAGS_CLIENT_KEY,
    REACT_APP_FLAGS_APP_NAME,
} = process.env;

const flagConfig = {
    url: `${REACT_APP_FLAGS_PROXY_URL}`, //Your fronte-end API URL or the Unleash proxy's URL (https://<proxy-url>/proxy)
    clientKey: `${REACT_APP_FLAGS_CLIENT_KEY}`, //Aclient-side API token OR one of your proxy's designated client keys (previously known as proxy secrets)
    refreshInterval: 60, //How often (in seconds) the client should poll the proxy for updates
    appName: `${REACT_APP_FLAGS_APP_NAME}`, // Th name of the environment you want use
};

export defualt flagConfig;