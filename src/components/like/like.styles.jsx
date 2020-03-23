import styled, { css } from "styled-components";
import { ReactComponent as LikeIcon } from "../../assets/like.svg";

const likeUserFoundStyles = css`
  fill: pink;
`;

const getLikesStyles = props => {
  return props.likeUserFound ? likeUserFoundStyles : null;
};

export const LikeContainer = styled.div`
  margin: 10px;
`;

export const LikeIconStyled = styled(LikeIcon)`
  width: 50px;
  height: auto;
  cursor: pointer;

  ${getLikesStyles}
`;
