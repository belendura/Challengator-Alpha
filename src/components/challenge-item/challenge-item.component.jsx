import React from "react";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import CustomButton from "../custom-button/custom-button.component";

import { acceptChallenge } from "../../redux/challengesInstances/challengesInstances.actions";

import {
  ChallengeContainer,
  ChallengeDetails,
  Name,
  Description,
  Footer,
  Visualizations
} from "./challenge-item.styles.jsx";

const ChallengeItem = ({ item }) => {
  const { name, url, description, visualizations, difficulty } = item;
  const dispatch = useDispatch();
  let history = useHistory();
  const currentUser = useSelector(selectCurrentUser, shallowEqual);
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
          <Visualizations>{visualizations} visualitzations</Visualizations>
         {/* <span className="difficulty">Difficulty: {difficulty}</span>*/}
        </Footer>
        <CustomButton
          onClick={() => {
            currentUser ? history.push("/user") : history.push("/signIn");
            dispatch(acceptChallenge(item));
          }}
        >
          Accept Challenge
        </CustomButton>
      </ChallengeDetails>
    </ChallengeContainer>
  );
};

export default ChallengeItem;
