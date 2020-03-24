import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useParams } from "react-router";

import { selectChallengeInstanceId } from "../../redux/challengesInstances/challengesInstances.selectors";

import {
  IncreaseLikesChallengeInstanceStart,
  IncreaseUnlikesChallengeInstanceStart
} from "../../redux/challengesInstances/challengesInstances.actions";

import Like from "../like/like.component";
import Unlike from "../unlike/unlike.component";

import {
  ChallengeContainer,
  ChallengeDetails,
  Name,
  Footer,
  FooterData
} from "./challenge-ranking-details.styles.jsx";

const ChallengeRankingDetails = ({
  instanceId,
  contenderId,
  name,
  url,
  currentUser
}) => {
  const dispatch = useDispatch();

  const selectedChallengeInstanceId = useSelector(
    state => selectChallengeInstanceId(state, instanceId),
    shallowEqual
  );

  const rating = selectedChallengeInstanceId.contenders.reduce(
    (accumulator, item) => {
      if (item.contender === contenderId);
      return (accumulator = item.rating);
    },
    {}
  );

  console.log("rating", rating);

  const handleIncreaseLikes = () => {
    dispatch(
      IncreaseLikesChallengeInstanceStart(instanceId, contenderId, currentUser)
    );
  };

  const handleIncreaseUnlikes = () => {
    dispatch(
      IncreaseUnlikesChallengeInstanceStart(
        instanceId,
        contenderId,
        currentUser
      )
    );
  };

  let likeUserFound = null;
  let unlikeUserFound = null;

  if (currentUser) {
    likeUserFound = rating.likes.likesUsers.some(
      item => item === currentUser.id
    );
    unlikeUserFound = rating.unlikes.unlikesUsers.some(
      item => item === currentUser.id
    );
  }

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
        <Footer>
          <Like
            handleIncreaseLikes={handleIncreaseLikes}
            likeUserFound={currentUser ? { likeUserFound } : null}
            currentUser={currentUser}
          />
          <FooterData>{rating.likes.likesSum}</FooterData>
          <Unlike
            handleIncreaseUnlikes={handleIncreaseUnlikes}
            unlikeUserFound={currentUser ? { unlikeUserFound } : null}
            currentUser={currentUser}
          />
          <FooterData>{rating.unlikes.unlikesSum} </FooterData>
        </Footer>
      </ChallengeDetails>
    </ChallengeContainer>
  );
};

export default ChallengeRankingDetails;
