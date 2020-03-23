import React from "react";
import { shallowEqual, useSelector } from "react-redux";

import { selectChallengesInstanceByTemplateId } from "../../redux/challengesInstances/challengesInstances.selectors";
import { selectUsersByTemplateId } from "../../redux/users/users.selectors";

import ChallengeRankingPreview from "../challenge-ranking-preview/challenge-ranking-preview.component";

import { ChallengeRankingContainer } from "./challenge-ranking.styles.jsx";

const ChallengeRanking = ({ params }) => {
  const { templateId } = params;

  const selectedChallengesInstanceByTemplateId = useSelector(
    state => selectChallengesInstanceByTemplateId(state, templateId),
    shallowEqual
  );

  const selectedUsersByTemplateId = useSelector(
    state =>
      selectUsersByTemplateId(state, selectedChallengesInstanceByTemplateId),
    shallowEqual
  );

  console.log("selectedUsersByTemplateId", selectedUsersByTemplateId);

  const orderArray = array => {
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[j].rating.likes.likesSum > array[i].rating.likes.likesSum) {
          const number = array.slice(j);
          array.splice(j, 1);
          array.splice(i, 0, number[0]);
        }
        console.log("array i j", array);
      }
    }
    return array;
  };

  const selectedUsersByTemplateIdSorted = orderArray(selectedUsersByTemplateId);

  return (
    <ChallengeRankingContainer>
      {selectedUsersByTemplateIdSorted.map((item, index) => {
        return <ChallengeRankingPreview key={index} item={item} />;
      })}
    </ChallengeRankingContainer>
  );
};

export default ChallengeRanking;
