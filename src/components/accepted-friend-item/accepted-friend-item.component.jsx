import React from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { deleteFriendStart } from "../../redux/users/users.actions";

import CustomButton from "../custom-button/custom-button.component";

import "./accepted-friend-item.styles.jsx";

const AcceptedFriendItem = ({ item }) => {
  const { key, name } = item;
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser, shallowEqual);
  return (
    <div className="Friend-Item">
      <span>{name}</span>
      <CustomButton onClick={() => dispatch(deleteFriendStart(user.id, key))}>
        Delete Friend
      </CustomButton>
    </div>
  );
};

export default AcceptedFriendItem;
