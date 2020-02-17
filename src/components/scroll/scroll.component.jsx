import React from "react";

import { ScrollContainer } from "./scroll.styles.jsx";

const Scroll = React.forwardRef((props, ref) => {
  const { children, ...otherProps } = props;

  return (
    <ScrollContainer ref={ref} {...otherProps}>
      {children}
    </ScrollContainer>
  );
});

export default Scroll;
