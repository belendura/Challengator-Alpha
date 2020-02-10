import React, { useEffect, useRef } from "react";

const ClickOutside = ({ children, action }) => {
  const wrapperRef = useRef(null);

  const handleClickOutSide = event => {
    if (!wrapperRef.current.contains(event.target) && action !== undefined)
      action();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    document.addEventListener("touchstart", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
      document.removeEventListener("touchstart", handleClickOutSide);
    };
  }, [handleClickOutSide]);
  return <div ref={wrapperRef}>{children}</div>;
};

export default ClickOutside;
