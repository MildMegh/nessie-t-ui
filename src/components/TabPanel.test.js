import { render, screen } from "@testing-library/react";
import TabPanel from "./TabPanel";

test("TabPanel", () => {
    render(<TabPanel value={1} index={1}/>);
    const element = screen.getAllByRole("tabpanel");
    expect(element).toBeInTheDocument();
});