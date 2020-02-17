import React from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectChallengeTemplatePreview } from "../../redux/challengesTemplates/challengesTemplates.selectors";

import { acceptChallenge } from "../../redux/challengesInstances/challengesInstances.actions";
import {
  IncreaseLikesChallengeTemplateStart,
  IncreaseUnlikesChallengeTemplateStart
} from "../../redux/challengesTemplates/challengesTemplates.actions";

import CustomButton from "../custom-button/custom-button.component";
import Like from "../like/like.component";
import Unlike from "../unlike/unlike.component";

import {
  ChallengeContainer,
  ChallengeDetails,
  Name,
  Description,
  Footer,
  FooterData
} from "./challenge.styles.jsx";

const ChallengeItem = () => {
  const params = useParams();
  const { templateId } = params;
  const dispatch = useDispatch();
  let history = useHistory();

  const currentUser = useSelector(selectCurrentUser, shallowEqual);

  const challenge = useSelector(
    state => selectChallengeTemplatePreview(state, templateId),
    shallowEqual
  );

  const {
    name,
    url,
    description,
    visualizations,
    difficulty,
    likes,
    unlikes,
    category
  } = challenge;
  console.log("challenge", challenge);
  console.log("likes", likes);
  console.log("unlikes", unlikes);

  const handleIncreaseLikes = () => {
    if (!currentUser) {
      history.push("/signIn");
    }
    dispatch(
      IncreaseLikesChallengeTemplateStart(templateId, category, currentUser)
    );
  };

  const handleIncreaseUnlikes = () => {
    if (!currentUser) {
      history.push("/signIn");
    }
    dispatch(
      IncreaseUnlikesChallengeTemplateStart(templateId, category, currentUser)
    );
  };

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
          <Like handleIncreaseLikes={handleIncreaseLikes} />
          {/*} <FooterData>{likes} </FooterData>*/}
          <Unlike handleIncreaseUnlikes={handleIncreaseUnlikes} />
          {/* <FooterData>{unlikes} </FooterData>*/}
        </Footer>
        <CustomButton
          onClick={() => {
            if (!currentUser) history.push("/signIn"); //!currentUser && history.push("/signIn")
            dispatch(acceptChallenge(challenge));
          }}
        >
          ACCEPT CHALLENGE
        </CustomButton>
      </ChallengeDetails>
    </ChallengeContainer>
  );
};

export default ChallengeItem;
