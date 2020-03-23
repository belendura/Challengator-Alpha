import styled from "styled-components";

export const ChallengeContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 10px 10px;
`;

export const ChallengeDetails = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Name = styled.div`
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
`;

export const Footer = styled.div`
  width: fit-content;
  height: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const FooterData = styled.span`
  padding-right: 10px;
`;
