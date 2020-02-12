import React from "react";
import {
  FormInputContainer,
  FormInputStyled,
  FormInputLabel
} from "./form-input.styles.jsx";

const FormInput = ({ handleChange, label, value, ...otherProps }) => (
  <FormInputContainer>
    <FormInputStyled onChange={handleChange} {...otherProps} />
    {label ? <FormInputLabel value={value}>{label}</FormInputLabel> : null}
  </FormInputContainer>
);

export default FormInput;
