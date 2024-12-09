import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ContainerHeight = ({ children }) => {
  const [containerHeight, setContainerHeight] = useState("55vh");

  const handleResize = () => {
    let multiplier = (window.innerHeight > 1000 ? 75 : 65)
    const newContainerHeight = `${Math.floor((window.innerHeight * multiplier) / window.screen.availHeight)}vh`;
    setContainerHeight(newContainerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        //minHeight: containerHeight,
        maxHeight: containerHeight,
        overflowY: "auto",
        paddingLeft: "24px",
        paddingRight: "24px"
      }}
    >
      {children}
    </div>
  );
};

ContainerHeight.propTypes = {
  children: PropTypes.node,
};

export default ContainerHeight;