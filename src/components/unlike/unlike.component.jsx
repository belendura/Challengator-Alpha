import React from "react";

import { UnlikeContainer, UnlikeIconStyled } from "./unlike.styles";
const Unlike = ({ handleIncreaseUnlikes }) => {
  return (
    <UnlikeContainer onClick={handleIncreaseUnlikes}>
      <UnlikeIconStyled />
    </UnlikeContainer>
  );
};

export default Unlike;
