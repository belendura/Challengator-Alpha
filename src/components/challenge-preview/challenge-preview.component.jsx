import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";

import {
  ChallengeContainer,
  ChallengeDetails,
  Name,
  Description,
  Footer,
  FooterData
} from "./challenge-preview.styles.jsx";

const ChallengePreview = ({ item }) => {
  const {
    name,
    url,
    description,
    visualizations,
    difficulty,
    templateId,
    ...itemData
  } = item;

  const dispatch = useDispatch();
  let history = useHistory();

  return (
    <ChallengeContainer>
      <iframe
        title="challenge-item"
        width="322"
        height="181"
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <ChallengeDetails>
        <Name>{name}</Name>
        <Description>{description}</Description>
        <Footer>
          <FooterData>{visualizations} visualitzations</FooterData>
          <FooterData>Difficulty: {difficulty} </FooterData>
        </Footer>
        <CustomButton
          onClick={() => {
            history.push(`/challenge/${templateId}`);
          }}
        >
          VIEW CHALLENGE
        </CustomButton>
      </ChallengeDetails>
    </ChallengeContainer>
  );
};

export default ChallengePreview;
