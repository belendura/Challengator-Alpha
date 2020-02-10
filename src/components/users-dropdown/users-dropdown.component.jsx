import React from "react";

import UserItem from "../user-item/user-item.component";

import {
  UsersDropdownContainer,
  EmptyMessageContainer,
  UserItemsContainer
} from "./users-dropdown.styles.jsx";

const UsersDropDown = ({ filteredUsers }) => {
  return (
    <UsersDropdownContainer>
      <EmptyMessageContainer>
        {filteredUsers.length ? (
          filteredUsers.map((userItem, userIndex) => (
            <UserItem key={userIndex} filteredUser={userItem} />
          ))
        ) : (
          <UserItemsContainer>No Friends found</UserItemsContainer>
        )}
      </EmptyMessageContainer>
    </UsersDropdownContainer>
  );
};

export default UsersDropDown;
