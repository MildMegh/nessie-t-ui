import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link as RouteLink } from "react-router-dom";
import {
    Stepper,
    Step,
    StepLebal,
    Container,
    Typography,
    Link,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeftIcon";
import Tooltip from "@mui/material/Tooltip";

import PageHeader from "../../components/PageHeader";
import { JobContext } from "../../context/JobContext";
import GlobalInfo from "./activities/GlobalInfo";
import { useFlag } from '@unleash/proxy-client-react';

const jonAidURL = (activityName) => {
    return 'https://confluencesw.t-mobile.com/display/SIPS/' + activityName.replace(/\s/g,'+')
}

const ServiceRequestPipeLine = () => {
    const { jobList } = useContext(JobContext);
    const { step } = useParams();
    const STEP = step ? parseInt(step) : 1;
    const changeEnabled = useFlag('toggle-change');

    const getSteps = () => {
        let steps = [];
        let step = 1;
        jobList.forEach((activity) => {
            steps.push({
                step: step++,
                label: activity.activity,
                key: activity.id,
                activity: activity,
            });
        });
        steps.push({
            step: step++,
            label: changeEnabled ? "Pier Details" : "Change Details",
            key: "global-information",
            activity: null,
        });

        return steps;
    };

    const steps = getSteps();

    let i = 1;
    return (
        <Container maxWidth={false}>
            <PageHeader
                title="Complete Your Service Request"
                subTitle="Please complete and ensure the accuracy of data requirements for your Service Request."
                linkText=""
                link=""
            >
                {" "}
                <Typography sx={{ padding: "10px" }} color="secondary">
                    {" "}
                    <Link
                        color="secondary.main"
                        sx={{ textDecoration : "none" }}
                        component={RouterLink}
                        to={"/service-request"}
                    >
                        <ArrowLeftIcon
                            sx={{
                                paddingTop: "5px",
                                marginBotton: "-5px",
                                marginLeft: "-5px",
                            }}
                        />{" "}
                        Change the order of service activities
                    </Link>
                </Typography>
            </PageHeader>
            <Stepper
                sx={{ marginTop: "20px", marginBottom: "50px" }}
                activeStep={STEP - 1}
            >
                {steps.map((item) => (
                    <Step key={item.key}>
                        {null != item.activity ? (
                            <Tooltip title="Click for Job Aid" arrow placement="right">
                                <a
                                    key={`ext-link-${item.key}`}
                                    href={jobAidURL(item.label)}
                                    color="secondary"
                                    underline="none"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <StepLebal>
                                        <div>{item.label}</div>
                                    </StepLebal>
                                </a>
                            </Tooltip>
                        ) : (
                            <StepLebal>
                                <div>{item.label}</div>
                            </StepLebal>
                        )}
                    </Step>
                ))}
            </Stepper>
            {jobList.map((job) => {
                return (
                    <div hidden={STEP !== i++} key={i}>
                        <job.component activityId={job.id}/>
                    </div>
                );
            })}
            <div hidden={STEP !== i}>
                <GlobalInfo/>
            </div>
        </Container>
    );
};

export default ServiceRequestPipeLine;