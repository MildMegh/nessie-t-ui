import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

test("Footer", () => {
    render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );
    const element = screen.getByTestId("footer-extlink-0");
    expect(element).toBeInTheDocument();
});

test("Footer Text", () => {
    render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );
    const element = screen.getByText("Job Aid");
    expect(element).toBeInTheDocument();
});