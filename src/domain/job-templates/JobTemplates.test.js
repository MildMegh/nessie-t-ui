import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import JobTemplates from "./JobTemplates";

test("ActivityLog", () => {
    render(
        <Router>
            <JobTemplates/>
        </Router>
    );
    const element = screen.getByText(/service Request Templates/i);
    expect(element).toBeInTheDocument();
});
