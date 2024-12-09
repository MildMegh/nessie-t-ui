import React from "react";
import PropTypes from "prop-types";
import { Tooltip, Button } from "@mui/material";

function CopyOnRightClick({ onClick, children }) {
  return (
    <Tooltip title="Right click to copy" arrow>
      <Button color="secondary" variant="text" onClick={onClick} onContextMenu={copyContent}>
        {children}
      </Button>
    </Tooltip>
  );
}

CopyOnRightClick.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function copyContent(event) {
  event.preventDefault();
  if (event.button === 2) {
    navigator.clipboard.writeText(event.target.innerText);
  }
}

export default CopyOnRightClick;