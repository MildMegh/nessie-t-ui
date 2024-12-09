import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedPage from "./ProtectedPage";
import ServiceActivityManagement from "../domain/admin/ServiceActivityManagement";
import ServiceActivityValidation from "../domain/admin/ServiceActivityValidation";
import RegenerateInventory from "../domain/RegenerateInventory";
import ServiceRequests from "../domain/service-request";
import JobTemplates from "../domain/job-templates/JobTemplates";
import ActivityLog from "../domain/request-log";
import UserProfile from "../domain/profile";
import ServiceRequestPipeLine from "../domain/service-request/ServiceRequestPipeline";
import Terms from "../domain/Terms";
import Admin from "../domain/admin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedPage>
            <ServiceRequests />
          </ProtectedPage>
        }
        />
      <Route
        path="request-log"
        element={
          <ProtectedPage>
            <ActivityLog />
          </ProtectedPage>
        }
      />
      <Route
        path="service-request"
        element={
          <ProtectedPage>
            <ServiceRequests />
          </ProtectedPage>
        }
      />
      <Route
        path="service-request/step/:step"
        element={
          <ProtectedPage>
            <ServiceRequestPipeLine />
          </ProtectedPage>
        }
      />

<Route
        path="templates"
        element={
          <ProtectedPage>
            <JobTemplates />
          </ProtectedPage>
        }
      />
      <Route
        path="userprofile"
        element={
          <ProtectedPage>
            <UserProfile />
          </ProtectedPage>
        }
      />
      <Route
        path="admin/*"
        element={
          <ProtectedPage>
            <Admin />
          </ProtectedPage>
        }
      >
        <Route path="service-activity-management" element={<ServiceActivityManagement />} />
        <Route path="service-activity-validation" element={<ServiceActivityValidation />} />
      </Route>
      <Route
        path="permissions"
        element={
          <ProtectedPage>
            <UserProfile />
          </ProtectedPage>
        }
      />
      <Route
        path="regenerate-inventory"
        element={
          <ProtectedPage>
            <RegenerateInventory />
          </ProtectedPage>
        }
      />
      <Route path="terms-of-use" element={<Terms />} />
    </Routes>
  );
};
export default AppRoutes;