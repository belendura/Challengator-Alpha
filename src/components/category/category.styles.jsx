import styled from "styled-components";

export const CategoryContainer = styled.div`
  background-color: rgb(161, 108, 139);
  opacity: 0.7;
  border: 1px solid rgb(173, 19, 148);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 800px) {
    heigth: 100px;
  }
`;

export const CategoryTitle = styled.span`
  font-family: "Permanent Marker", cursive;
  color: rgb(230, 176, 15);
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
`;
