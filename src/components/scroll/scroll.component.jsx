import React from "react";

import { ScrollContainer } from "./scroll.styles.jsx";

const Scroll = ({ children, ...props }) => (
  <ScrollContainer {...props}>{children}</ScrollContainer>
);

export default Scroll;
