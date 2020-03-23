import React from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectChallengeTemplatePreview } from "../../redux/challengesTemplates/challengesTemplates.selectors";

import {
  IncreaseLikesChallengeTemplateStart,
  IncreaseUnlikesChallengeTemplateStart
} from "../../redux/challengesTemplates/challengesTemplates.actions";

import { openModal } from "../../redux/modal/modal.actions";

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

  const { likesSum, likesUsers } = likes;
  const { unlikesSum, unlikesUsers } = unlikes;

  const likeUserFound = likesUsers.some(item => item === currentUser.id);
  const unlikeUserFound = unlikesUsers.some(item => item === currentUser.id);

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
          <Like
            handleIncreaseLikes={handleIncreaseLikes}
            likeUserFound={likeUserFound}
          />
          <FooterData>{likesSum}</FooterData>
          <Unlike
            handleIncreaseUnlikes={handleIncreaseUnlikes}
            unlikeUserFound={unlikeUserFound}
          />
          <FooterData>{unlikesSum} </FooterData>
        </Footer>
        <CustomButton
          onClick={() => {
            if (!currentUser) history.push("/signIn"); //!currentUser && history.push("/signIn")
            dispatch(openModal("CHALLENGE_CONTENDERS", { challenge }));
          }}
        >
          ACCEPT CHALLENGE
        </CustomButton>
      </ChallengeDetails>
    </ChallengeContainer>
  );
};

export default ChallengeItem;
