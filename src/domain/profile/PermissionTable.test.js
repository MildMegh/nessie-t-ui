import { render, screen } from "@testing-library/react";

import PermissionsTable from "./PermissionTable";

test("PermissionTable", () => {
    render(<PermissionsTable groups={["nessie_ns_cableTest"]} />);
    const row = screen.getAllByRole("cell", {name: /Cable Testing/i })[0];
    expect(row).toBeInTheDocument();
});
