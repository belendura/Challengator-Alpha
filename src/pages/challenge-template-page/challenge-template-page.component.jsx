import React from "react";
import { useParams } from "react-router-dom";

import ChallengeItem from "../../components/challenge/challenge.component";
import ChallengeRanking from "../../components/challenge-ranking/challenge-ranking.component";

import {
  ChallengeTemplatePageContainer,
  ChallengeTemplateContainer
} from "./challenge-template-page.styles.jsx";

const ChallengeTemplatePage = () => {
  const params = useParams();
  return (
    <ChallengeTemplatePageContainer>
      <ChallengeTemplateContainer>
        <ChallengeItem />
      </ChallengeTemplateContainer>
      <ChallengeRanking />
    </ChallengeTemplatePageContainer>
  );
};

export default ChallengeTemplatePage;
