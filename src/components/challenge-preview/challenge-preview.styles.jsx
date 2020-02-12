import styled from "styled-components";

export const ChallengeContainer = styled.div`
  width: 340px;
  height: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*height: auto;
  width: auto;*/
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 5px 10px 18px #888888;
  border: 1px solid yellow;
  border-radius: 10px;
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

export const Description = styled.p`
  font-size: 16px;
`;

export const Footer = styled.div`
  width: fit-content;
  height: 5%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Visualizations = styled.span`
  padding-right: 10px;
`;

export const CustomButton = styled.button`
  width: 200px;
`;
