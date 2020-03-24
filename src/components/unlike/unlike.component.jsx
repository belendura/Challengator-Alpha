import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { closeModal } from "../../redux/modal/modal.actions";

import { UnlikeContainer, UnlikeIconStyled } from "./unlike.styles";

const Unlike = ({ handleIncreaseUnlikes, unlikeUserFound, currentUser }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  return (
    <UnlikeContainer
      onClick={() => {
        if (!currentUser) {
          history.push("/signIn");
          dispatch(closeModal());
        } else {
          handleIncreaseUnlikes();
        }
      }}
    >
      <UnlikeIconStyled unlikeUserFound={unlikeUserFound} />
    </UnlikeContainer>
  );
};

export default Unlike;
