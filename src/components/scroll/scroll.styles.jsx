import styled, { css } from "styled-components";

const HorizontalStyles = css`
  overflow-x: scroll;
  width: 70vw;
`;

const VerticalStyles = css`
  overflow-y: scroll;
  height: 90vh;
`;

const getScrollStyles = props => {
  if (props.vertical) return VerticalStyles;

  return props.horizontal ? HorizontalStyles : null;
};

export const ScrollContainer = styled.div`
  margin: 10px;

  ${getScrollStyles}

  .scroll::-webkit-scrollbar {
    width: 10px;
  }

  .scroll::-webkit-scrollbar-track {
    background: #6c706c;
  }

  .scroll::-webkit-scrollbar-thumb {
    background: rgb(161, 159, 159);
  }
`;
