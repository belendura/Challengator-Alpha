import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectChallengesTemplatesId } from "../../redux/challengesTemplates/challengesTemplates.selectors";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {
  proposeChallengeStart,
  storeChallengeTemplateStart
} from "../../redux/challengesTemplates/challengesTemplates.actions";
import { openModal } from "../../redux/modal/modal.actions";

import {
  ProposeChallengeContainer,
  ButtonsContainer
} from "./propose-challenge.styles.jsx";

const selectInnerModalData = createStructuredSelector({
  currentUser: selectCurrentUser,
  challengesTemplatesId: selectChallengesTemplatesId
});

const ProposeChallenge = () => {
  const { currentUser, challengesTemplatesId } = useSelector(
    selectInnerModalData,
    shallowEqual
  );

  let history = useHistory();
  const dispatch = useDispatch();

  const [challengeCredentials, setchallengeCredentials] = useState({
    title: "",
    description: "",
    author: currentUser,
    category: "",
    file: "",
    fileObj: null
  });

  const { title, description, file, category } = challengeCredentials;

  const dispatchedStoreChallengeStart = (
    challengeCredentials,
    downloadURL,
    templateId
  ) => {
    dispatch(
      storeChallengeTemplateStart(challengeCredentials, downloadURL, templateId)
    );
  };

  const handleChange = event => {
    const { value, name, files } = event.target;

    name === "file"
      ? setchallengeCredentials({
          ...challengeCredentials,
          fileObj: files[0],
          file: value
        })
      : setchallengeCredentials({ ...challengeCredentials, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!currentUser) {
      history.push("/signIn");
    } else if (!category) {
      return;
    } else {
      dispatch(
        proposeChallengeStart(
          challengeCredentials,
          dispatchedStoreChallengeStart,
          challengesTemplatesId
        )
      );
    }
  };

  return (
    <ProposeChallengeContainer>
      <form onSubmit={handleSubmit}>
        <FormInput
          handleChange={handleChange}
          type="text"
          name="title"
          value={title}
          label="Title"
          required
        />
        <FormInput
          handleChange={handleChange}
          type="text"
          name="description"
          value={description}
          label="Description"
          required
        />
        <label>Category</label>
        <select
          id="category"
          name="category"
          onChange={handleChange}
          required
          defaultValue="default"
        >
          <option value="default" disabled>
            select category
          </option>
          <option value="ability">ability</option>
          <option value="height">height</option>
          <option value="foodie">foodie</option>
          <option value="dancer">dancer</option>
          <option value="travel">travel</option>
          <option value="miscelaneous">miscelaneous</option>
        </select>
        <FormInput
          handleChange={handleChange}
          type="file"
          name="file"
          value={file}
          label="Video URL"
          required
        />
        <ButtonsContainer>
          <CustomButton type="submit">Propose New Challenge</CustomButton>
        </ButtonsContainer>
      </form>
    </ProposeChallengeContainer>
  );
};

export default ProposeChallenge;
