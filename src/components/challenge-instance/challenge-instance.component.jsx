import React, { useState } from "react";

import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectUserAcceptedFriends } from "../../redux/user/user.selectors";
import { selectUsersOwnFriends } from "../../redux/users/users.selectors";
import { selectChallengeInProgress } from "../../redux/challengesInstances/challengesInstances.selectors";

import { storeChallengeInstanceStart } from "../../redux/challengesInstances/challengesInstances.actions";

import SelectFriends from "../select-friends/select-friends.component";
import CustomButton from "../custom-button/custom-button.component";

import {
  ChallengeContainer,
  ChallengeDetails,
  Title,
  Description,
  Footer,
  Visualizations
} from "./challenge-instance.styles.jsx";

const selectChallengeInstance = createStructuredSelector({
  challengeInProgress: selectChallengeInProgress,
  acceptedFriends: selectUserAcceptedFriends
});

const ChallengeInstance = ({ challengeInstance }) => {
  const [data, setData] = useState({
    contenders: [],
    validators: []
  });
  const { contenders, validators } = data;

  const dispatch = useDispatch();

  const {
    name,
    url,
    description,
    visualizations,
    difficulty
  } = challengeInstance;

  const { challengeInProgress, acceptedFriends } = useSelector(
    selectChallengeInstance,
    shallowEqual
  );

  const selectedUsersAcceptedFriends = useSelector(
    state => selectUsersOwnFriends(state, acceptedFriends),
    shallowEqual
  );

  const handleChange = event => {
    const { value, name } = event.target;
    setData({ ...data, [name]: [value] });
  };

  return (
    <div>
      {challengeInProgress ? (
        <ChallengeContainer>
          <iframe
            title="challenge-instance-proof"
            width="322"
            height="181"
            src={url}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <ChallengeDetails>
            <Title>{name}</Title>
            <Description>{description}</Description>
            <Footer>
              <Visualizations>{visualizations} visualitzations</Visualizations>
              <span>Difficulty: {difficulty}</span>
            </Footer>
            <span>contenders</span>
            <SelectFriends
              players="contenders"
              friends={selectedUsersAcceptedFriends}
              handleChange={handleChange}
            />
            <span>validators</span>
            <SelectFriends
              players="validators"
              friends={selectedUsersAcceptedFriends}
              handleChange={handleChange}
            />
            <CustomButton
              onClick={() =>
                dispatch(
                  storeChallengeInstanceStart(
                    challengeInstance,
                    contenders,
                    validators
                  )
                )
              }
            >
              Create Challenge
            </CustomButton>
          </ChallengeDetails>
        </ChallengeContainer>
      ) : null}
    </div>
  );
};

export default ChallengeInstance;
