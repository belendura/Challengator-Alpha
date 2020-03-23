import styled, { css } from "styled-components";
import { ReactComponent as UnlikeIcon } from "../../assets/unlike.svg";

const unlikeUserFoundStyles = css`
  fill: pink;
`;

const getUnlikesStyles = props => {
  return props.unlikeUserFound ? unlikeUserFoundStyles : null;
};

export const UnlikeContainer = styled.div`
  margin: 10px;
`;

export const UnlikeIconStyled = styled(UnlikeIcon)`
  width: 50px;
  height: auto;
  cursor: pointer;

  ${getUnlikesStyles}
`;
