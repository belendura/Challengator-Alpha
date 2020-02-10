import React from "react";

import ChallengeItem from "../challenge-item/challenge-item.component";

import { UserChallengesContainer } from "./user-challenges.styles.jsx";

const UserChallenges = ({ selectedChallenges }) => {
  return (
    <div>
      <UserChallengesContainer>
        {selectedChallenges.map((item, itemIndex) => (
          <ChallengeItem key={itemIndex} item={item} />
        ))}
      </UserChallengesContainer>
    </div>
  );
};

export default UserChallenges;
