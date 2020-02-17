import styled from "styled-components";

export const CategoryContainer = styled.div`
  overflow: hidden;
  width: auto;
  margin: 10px;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 800px) {
    height: 100px;
  }
`;

export const CategoryTitle = styled.span`
  font-family: "Permanent Marker", cursive;
  color: rgb(230, 176, 15);
  font-size: 40px;
  font-weight: bold;
`;
