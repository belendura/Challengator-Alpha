import React from "react";

import ChallengePreview from "../challenge-preview/challenge-preview.component";

import { UserChallengesContainer } from "./user-challenges.styles.jsx";

const UserChallenges = ({ selectedChallenges }) => {
  return (
    <div>
      <UserChallengesContainer>
        {selectedChallenges.map((item, itemIndex) => (
          <ChallengePreview key={itemIndex} item={item} />
        ))}
      </UserChallengesContainer>
    </div>
  );
};

export default UserChallenges;
