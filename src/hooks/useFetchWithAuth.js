import { loginRequest } from "../authConfig";
import { msalInstance } from "../index";

const { REACT_APP_BASE } = process.env;

const getAccessToken = async (scopes) = {
    //MSAL.js v2 exposes several account APIs,
    //logic to determine which account to use 
}