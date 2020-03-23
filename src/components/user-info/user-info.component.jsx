import React from "react";

import {
  UserInfoContainer,
  UserPicturesContainer,
  UserDataContainer
} from "./user-info.styles.jsx";

const UserInfo = ({ currentUser }) => (
  <UserInfoContainer>
    {currentUser.photoUrl ? (
      <UserPicturesContainer
        src={currentUser.photoUrl}
        alt="User Picture"
        height="40"
        width="30"
      />
    ) : null}
    <UserDataContainer>{currentUser.displayName}</UserDataContainer>
    <UserDataContainer>
      {currentUser.statistics.globalRanking}
    </UserDataContainer>
  </UserInfoContainer>
);

export default UserInfo;
