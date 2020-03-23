import React from "react";
import {
  FormInputRadioContainer,
  FormInputRadioStyled,
  FormInputRadioLabel
} from "./form-input-radio.styles.jsx";

const FormInputRadio = ({
  handleChange,
  label,
  value,
  type,
  name,
  ...otherProps
}) => (
  <FormInputRadioContainer>
    <FormInputRadioStyled
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      {...otherProps}
    />
    {label ? (
      <FormInputRadioLabel value={value}>{label}</FormInputRadioLabel>
    ) : null}
  </FormInputRadioContainer>
);

export default FormInputRadio;
