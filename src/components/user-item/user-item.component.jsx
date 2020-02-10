import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import CustomButton from "../custom-button/custom-button.component";
import { addFriendStart } from "../../redux/users/users.actions";

import {
  UserItemContainer,
  UserDetailsContainer,
  NameContainer
} from "./user-item.styles.jsx";

const UserItem = ({ filteredUser }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser, shallowEqual);
  return (
    <UserItemContainer>
      <UserDetailsContainer>
        <NameContainer>{filteredUser.data.userData.displayName}</NameContainer>
        <CustomButton
          onClick={() => {
            if (currentUser.id !== filteredUser.id) {
              dispatch(addFriendStart(currentUser.id, filteredUser.id));
            }
            return;
          }}
        >
          ADD FRIEND
        </CustomButton>
      </UserDetailsContainer>
    </UserItemContainer>
  );
};

export default UserItem;
