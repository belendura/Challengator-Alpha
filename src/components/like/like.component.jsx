import React from "react";

import { LikeContainer, LikeIconStyled } from "./like.styles";

const Like = ({ handleIncreaseLikes }) => {
  return (
    <LikeContainer onClick={handleIncreaseLikes}>
      <LikeIconStyled />
    </LikeContainer>
  );
};

export default Like;
