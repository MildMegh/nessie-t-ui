import { render, screen } from "@testing-library/react";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import ServiceRequest from '.';



test('ActivityLog', () => {
    render(<Router><ServiceRequest/></Router>);
    const element = screen.getByText(/Service Request/i);
    expect(element).toBeInTheDocument();
});


