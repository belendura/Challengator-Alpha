import React, { useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";

import {
  selectChallengesTemplatesByCategory,
  selectCurrentCategory
} from "../../redux/challengesTemplates/challengesTemplates.selectors";

import ChallengePreview from "../../components/challenge-preview/challenge-preview.component";

import { OverviewContainer, ItemContainer } from "./overview.styles.jsx";

const Overview = () => {
  const category = useSelector(selectCurrentCategory, shallowEqual);
  const memoizedSelectChallengesTemplatesByCategory = useMemo(
    () => selectChallengesTemplatesByCategory,
    []
  );
  const selectedChallenges = useSelector(
    state => memoizedSelectChallengesTemplatesByCategory(category)(state),
    shallowEqual
  );
  return (
    <OverviewContainer>
      <ItemContainer>
        {selectedChallenges.map((item, itemIndex) => {
          return <ChallengePreview key={itemIndex} item={item} />;
        })}
      </ItemContainer>
    </OverviewContainer>
  );
};

export default Overview;
