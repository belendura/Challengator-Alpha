import React from "react";
import { useDispatch } from "react-redux";

import { UsersDropdownContainer } from "./users-friends.styles.jsx";

const UsersFriends = ({ filteredUsers }) => {
  const dispatch = useDispatch();

  return (
    <UsersDropdownContainer>
      <label>Friends</label>
      <select id="friends" name="friends">
        {filteredUsers.length
          ? filteredUsers.map((friendItem, friendItemIndex) => (
              <option
                key={friendItemIndex}
                value={friendItem.userData.displayName}
              >
                {friendItem.userData.displayName}
              </option>
            ))
          : null}
      </select>
    </UsersDropdownContainer>
  );
};

export default UsersFriends;
