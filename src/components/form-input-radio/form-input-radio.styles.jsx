import styled from "styled-components";

const subColor = "grey";
const mainColor = "black";

export const FormInputRadioContainer = styled.div`
  position: relative;
  margin: 45px 0;
`;

export const FormInputRadioStyled = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  margin: 25px 0;
`;

export const FormInputRadioLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
`;
