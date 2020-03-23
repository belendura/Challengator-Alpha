import styled from "styled-components";
import { ReactComponent as LikeIcon } from "../../assets/like.svg";
import { ReactComponent as UnlikeIcon } from "../../assets/unlike.svg";

export const ChallengeRankingPreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ChallengeRankingPreviewStyled = styled.span`
  padding: 5px;
`;

export const ChallengeRankingPreviewLink = styled.div`
  cursor: pointer;
`;

export const LikeIconStyledPreview = styled(LikeIcon)`
  width: 25px;
  height: auto;
`;

export const UnlikeIconStyledPreview = styled(UnlikeIcon)`
  width: 25px;
  height: auto;
`;
