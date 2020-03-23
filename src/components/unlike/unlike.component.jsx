import React from "react";

import { UnlikeContainer, UnlikeIconStyled } from "./unlike.styles";
const Unlike = ({ handleIncreaseUnlikes, unlikeUserFound }) => {
  return (
    <UnlikeContainer onClick={handleIncreaseUnlikes}>
      <UnlikeIconStyled unlikeUserFound={unlikeUserFound} />
    </UnlikeContainer>
  );
};

export default Unlike;
