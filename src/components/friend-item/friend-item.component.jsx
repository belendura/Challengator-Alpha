import React from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";

import {
  acceptFriendStart,
  denyFriendStart
} from "../../redux/users/users.actions";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import CustomButton from "../custom-button/custom-button.component";

import "./friend-item.styles.scss";

const FriendItem = ({ item }) => {
  const { key, name } = item;
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser, shallowEqual);
  return (
    <div className="friend-item">
      <span>{name}</span>
      <CustomButton onClick={() => dispatch(acceptFriendStart(user.id, key))}>
        Accept Friend
      </CustomButton>
      <CustomButton onClick={() => dispatch(denyFriendStart(user.id, key))}>
        Deny Friend
      </CustomButton>
    </div>
  );
};

export default FriendItem;
