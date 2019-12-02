import React from "react";

import "./scroll.styles.scss";

const Scroll = ({children, horizontal, vertical, ...otherProps})=>(
            <div className={ `${vertical ? "vertical" : ""} ${horizontal ? "horizontal" : ""} scroll`}{...otherProps}>
                {children}
            </div>            
)

export default Scroll;