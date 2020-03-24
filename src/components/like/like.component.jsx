import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { closeModal } from "../../redux/modal/modal.actions";

import { LikeContainer, LikeIconStyled } from "./like.styles";

const Like = ({ handleIncreaseLikes, likeUserFound, currentUser }) => {
  let history = useHistory();
  const dispatch = useDispatch();

  return (
    <LikeContainer
      onClick={() => {
        if (!currentUser) {
          history.push("/signIn");
          dispatch(closeModal());
        } else {
          handleIncreaseLikes();
        }
      }}
    >
      <LikeIconStyled likeUserFound={likeUserFound} />
    </LikeContainer>
  );
};

export default Like;
