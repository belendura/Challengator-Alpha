import React, { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import FormInputRadio from "../form-input-radio/form-input-radio.component";
import CustomButton from "../custom-button/custom-button.component";

import { signUpStart, storePictureStart } from "../../redux/user/user.actions";

import { defaultCountries } from "../../assets/countries";

import {
  SignUpContainer,
  TitleContainer,
  GenderContainer,
  GenderContainerData,
  Text,
  CountryContainer
} from "./sign-up.styles.jsx";

const SignUp = () => {
  const dispatch = useDispatch();

  const [userCredentials, setCredentials] = useState({
    displayName: "",
    age: 0,
    gender: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: "",
    fileObj: null
  });

  const {
    displayName,
    age,
    gender,
    country,
    email,
    password,
    confirmPassword,
    file,
    fileObj
  } = userCredentials;

  const dispatchedStorePictureStart = (user, userCredentials, downloadURL) => {
    dispatch(storePictureStart(user, userCredentials, downloadURL));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    dispatch(signUpStart(userCredentials, dispatchedStorePictureStart));
  };

  const handleChange = event => {
    event.persist();
    const { value, name, files } = event.target;

    name === "file"
      ? setCredentials({
          ...userCredentials,
          file: value,
          fileObj: files[0]
        })
      : setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignUpContainer>
      {console.log("userCredentials", userCredentials)}
      <TitleContainer>I do not have an account</TitleContainer>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="number"
          name="age"
          value={age}
          onChange={handleChange}
          label="Age"
          required
        />
        <GenderContainer>
          <Text>Gender</Text>
          <GenderContainerData>
            <FormInputRadio
              type="radio"
              name="gender"
              value="Other"
              onChange={handleChange}
              label="Other"
              required
            />
            <FormInputRadio
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              label="Male"
              required
            />
            <FormInputRadio
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              label="Female"
              required
            />
          </GenderContainerData>
        </GenderContainer>
        <CountryContainer>
          <Text>Country</Text>
          <select id="country" name="country" onChange={handleChange} size="7">
            {defaultCountries.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </CountryContainer>
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <FormInput
          handleChange={handleChange}
          type="file"
          name="file"
          value={file}
          label="PhotoURL"
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </SignUpContainer>
  );
};

export default SignUp;
