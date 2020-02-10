import React from "react";

import {
  UserInfoContainer,
  UserPicturesContainer,
  UserDataContainer
} from "./user-info.styles.jsx";

const UserInfo = ({ currentUser }) => (
  <UserInfoContainer>
    <UserDataContainer>{currentUser.userData.displayName}</UserDataContainer>
    <UserDataContainer>{currentUser.statistics.ranking}</UserDataContainer>
  </UserInfoContainer>
);

export default UserInfo;
