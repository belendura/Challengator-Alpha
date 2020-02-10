import styled from "styled-components";

export const UsersDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
`;

export const EmptyMessageContainer = styled.div`
  font-size: 18px;
  margin: 50px auto;
`;

export const UserItemsContainer = styled.span`
  .user-items {
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`;
