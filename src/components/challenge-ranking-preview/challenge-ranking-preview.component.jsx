import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import { openModal } from "../../redux/modal/modal.actions";

import {
  ChallengeRankingPreviewContainer,
  ChallengeRankingPreviewStyled,
  ChallengeRankingPreviewLink,
  LikeIconStyledPreview,
  UnlikeIconStyledPreview
} from "./challenge-ranking-preview.styles";

const ChallengeRankingPreview = ({
  item: { instanceId, contenderId, rating, name, url }
}) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser, shallowEqual);

  return (
    <ChallengeRankingPreviewContainer>
      <ChallengeRankingPreviewStyled>{name}</ChallengeRankingPreviewStyled>
      <ChallengeRankingPreviewStyled>
        {rating.likes.likesSum} <LikeIconStyledPreview />
      </ChallengeRankingPreviewStyled>
      <ChallengeRankingPreviewStyled>
        {rating.unlikes.unlikesSum}
        <UnlikeIconStyledPreview />
      </ChallengeRankingPreviewStyled>
      <ChallengeRankingPreviewLink
        onClick={() => {
          dispatch(
            openModal("CHALLENGE_RANKING", {
              instanceId,
              contenderId,
              name,
              url,
              currentUser
            })
          );
        }}
      >
        view
      </ChallengeRankingPreviewLink>
    </ChallengeRankingPreviewContainer>
  );
};

export default ChallengeRankingPreview;
