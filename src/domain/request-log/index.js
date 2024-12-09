import { useFetchWithAuth } from "../../hooks/useFetchWithAuth";
import RequestLog from "./RequestLog";
import { activities } from "../../service-request/activities";

const ServiceRequestLog = () => {
    const { get } = useFetchWithAuth();

    const getRequestType = (Row) => {
        const input = JSON.parse(row.serviceRequestInput);
        return input.serviceActivities.every((item) => activities[item.id].changeType === "standard") ? "standard" : "normal";
    };

    const getData = async (page, rowsPerPage, showAll) => {
        let url = `/servicerequest?getAllRequests=${showAll}`;
        const response = await get(url);
        if (response && response.ok) {
            let data = await response.json();
            data.serviceRequestRequestList.forEach((row) => {
                row.changeRequestType = getRequestType(row)
            });

            return data;
        }
        console.error(response);
        return [];
    };

    return <RequestLog fetchData={getData} />;
};

export default ServiceRequestLog;