import React from "react";

import { LikeContainer, LikeIconStyled } from "./like.styles";

const Like = ({ handleIncreaseLikes, likeUserFound }) => {
  return (
    <LikeContainer onClick={handleIncreaseLikes}>
      <LikeIconStyled likeUserFound={likeUserFound} />
    </LikeContainer>
  );
};

export default Like;
