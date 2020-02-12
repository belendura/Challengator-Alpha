import styled, { css } from "styled-components";

const subColor = "grey";
const mainColor = "black";

const ShrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

const getFormInputLabelStyles = props => {
  return props.value ? ShrinkLabelStyles : "";
};

export const FormInputContainer = styled.div`
  position: relative;
  margin: 45px 0;
`;

export const FormInputStyled = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  input[type="password"] {
    letter-spacing: 0.3em;
  }

  &:focus {
    outline: none;
  }

  &:focus ~ .form-input-label {
    ${ShrinkLabelStyles};
  }
`;

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  /*${getFormInputLabelStyles}*/

  ${({ value }) => (value ? ShrinkLabelStyles : "")}
`;
