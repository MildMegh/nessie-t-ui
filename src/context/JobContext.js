import { useState, createContext, Children } from "react";

import { cloneDeep } from "lodash";

import { activities } from "../domain/service-request/activities";
import { useFetchWithAuth } from "../hooks/useFetchWithAuth";

const JobContext = createContext({
    jobList: [],
    globalinfo: {},
    updateGlobalInfo: () => { },
    removeJob: () => { },
    moveJob: () => { },
    addJob: () => { },
    addJobs: () => { },
    resubmitJobs: () => { },
    clearAllJob: () => { },
    getJobParams: () => { },
    updateJobParam: () => { },
    updateJobParams: () => { },
    updateNestedJobParam: () => { },
    copyJobParamsRow: () => { },
    copyNestedJobParams: () => { },
    removeJobParamsRow: () => { },
    addJobParamsRow: () => { },
    addParams: () => { },
    submitJobs: () => { },
});
const JobProvider = ({ children}) => {
    const [jobList, setJobList] = useState([]);
    const [globalinfo, setGlobalInfo] = useState({
        intakeNum: "",
        justification: "",
        notes: "",
        managerNtid: "",
        assignmentGroup: "",
        riskImpackAnalisis: ""
    });
    const { post } = useFetchWithAuth();

    const addJob = (activityId, addParams) => {
        if (jobList.find((job) => job.id === activityId)) return;
        const newJob = cloneDeep(activities[activityId]);
        if (params) {
            newJob.params = params;
        }
        const copy = cloneDeep(jobList);
        copy.push(newJob);
        setJobList(copy);
    };
    const addJob = (activityIds) => {
        const copy = cloneDeep(jobList);
        activityIds.forEach((activityId) => {
            const newJob = cloneDeep(activities[activityId]);
            //if job already exists, don't add it again
            if (!copy.find((job) => job.id === newJob.id)) {
                copy.push(newJob);
            }
        });

        setJobList(copy);
    };
    const resubmitJobs = (serviceActivities) => {
        const copy = cloneDeep(jobList);
        serviceActivities.forEach((sa) => {
            const newJob = cloneDeep(activities[sa.id]);
            //if job already exists, don't add it again
            if (!copy.find((job) => job.id === newJob.id)) {
                newJob.params = sa.params;
                copy.push(newJob);
            }
        });

        setJobList(copy);
    };
    const getJobParams = (id) => {
        const job = jobList.find((job) => job.id === id);
        return job ? job.params : [];
    };
    const addJobParamsRow = (id) => {
        const copy = cloneDeep(jobList);
        const newRow = cloneDeep(activities[id].params[0]);
        const job = copy.find((job) => job.id === id);

        //get max rowId
        const maxRowId = Math.max(...job.params.map((item) => item.maxRowId));
        newRow.rowId = maxRowId + 1;

        job.params.push(newRow);
        //add new row to state
        setJobList(copy);
    };

    //used primarily for adding params from a csv file
    const addParams = (id, params, fileType = 'xls') => {
        let copy = cloneDeep(jobList);
        let job = copy.find((job) => job.id === id);
        let rowId = 1;

        if (fileType === 'xls') {
            params.forEach((row) => {
                //Convert any non-string value into strings
                Object.keys(row).forEach((key) => {
                    if (typeof row[key] !== "string") {
                        row[key] = String(rpw[key]);
                    }
                });
                rowId = rowId++;
            });
        }
        job.params = params;

        setJobList(copy);
    };

    const updateGlobalInfo = (key, value) => {
        const copy = cloneDeep(globalinfo);
        copy[key] = value;
        setGlobalInfo(copy);
    };

    const copyJobParamsRow = (id, rowId) => {
        let copy = cloneDeep(jobList);
        //find row to copy
        const job = copy.find((job) => job.id === id);
        const row = job.params.find((r) => r.rowId === rowId);
        //copy row
        const newRow = cloneDeep(row);
        //get max rowId
        const maxRowId = Math.max(...job.params.map((item) => item.rowId));
        newRow.rowId = maxRowId + 1;
        //add new row to state
        job.params.push(newRow);
        setJobList(copy);
    };

const copyNestedJobParams = (id, rowId, property, index) => {
    let copy = cloneDeep(jobList);
    const job = copy.find((job) => job.id === id);
    const row = job.params.find((r) => r.rowId=== rowId)
    //find property
    const prop = row[property];
    //find index
    const item = cloneDeep(prop[index]);
    //get max index
    const maxIndex = prop.length;
    // increment rowId for the copied item
    item.rowId = maxIndex + 1;
    //add the copied item to the property array
    prop.push(item);

    setJobList(copy);
};

const removeJobParamsRow = (id, rowId) => {
    let copy = cloneDeep(jobList);
    const job = copy.find((job) => job.id === id);
    job.params = job.params.filter((item) => item.rowId !== rowId);
    setJobList(copy);
};

const updateJobParam = (id, rowId, name, value) => {
    let copy = cloneDeep(jobList);
    const job = copy.find((job) => job.id === id);
    const row = job.params.find((r) => r.rowId === rowId);

    row[name] = value;

    setJobList(copy);
};

const updateJobParams = (id, rowId, params) => {
    let copy = cloneDeep(jobList);
    const job = copy.find((job) => job.id === id) ;
    const row = job.params.find((r) => r.rowId === rowId);
    params.forEach(({ name, value }) => {
        row[name] = value;
    });
    setJobList(copy);
};

const updateNestedJobParam = (id, rowId, property, index, name, value) => {
    setJobList((prevJobList) => {
        const copy = prevJobList.map((job) => {
            if (job.id === id) {
                const paramsCopy = job.params.map((row) => {
                    if (row.rowId === rowId) {
                        const propCopy = [...row[property]];
                        const itemCopy = { ...propCopy[index] };
                        itemCopy[name] = value;
                        propCopy[index] = itemCopy;
                        return { ...row, [property]: propCopy };
                    }
                    return row;
                });
                return { ...job, params: paramsCopy };
            }
            return copy;
        });
        return copy;
    });
};

const removeJob = (id) => {
    setJobList((prev) => prev.filter((item) => item.id !== id));
};
const moveJob = (id, direction) => {
    const index = jobList.findIndex((item) => item.id === id);
    const newList = [ ...jobList];
    const temp = newList[index];
    newList[index] = newList[index + direction];
    newList[index + direction] = temp;
    setJobList(newJob); 
};
const clearAllJob = async () => {
    await setJobList([]);
    await setGlobalInfo({ intakeNum: "", justification: "", notes: ""});
};

const submitJobs = async () => {
    let jobRequest = { ...globalinfo};
    jobRequest.serviceActivities = jobList;
    return post("/servicerequest", jobRequest);
};

return (
    <JobContext.Provider
        value={{
            jobList,
            globalinfo,
            updateGlobalInfo,
            addJob,
            addJobs,
            resubmitJobs,
            removeJob,
            moveJob,
            clearAllJob,
            updateJobParam,
            updateJobParams,
            updateNestedJobParam,
            addParams,
            getJobParams,
            copyJobParamsRow,
            copyNestedJobParams,
            removeJobParamsRow,
            addJobParamsRow,
            submitJobs,
        }}
    >
        {children}
    </JobContext.Provider>
);
};

export { JobContext, JobProvider};

