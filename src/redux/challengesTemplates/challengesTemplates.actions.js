import challengeTemplateActionTypes from "./challengesTemplates.types";

export const proposeChallengeStart = (
  challengeCredentials,
  dispatchedStoreChallengeStart,
  challengesTemplatesId
) => ({
  type: challengeTemplateActionTypes.PROPOSE_CHALLENGE_START,
  payload: {
    challengeCredentials,
    dispatchedStoreChallengeStart,
    challengesTemplatesId
  }
});

export const proposeChallengeFailure = error => ({
  type: challengeTemplateActionTypes.PROPOSE_CHALLENGE_FAILURE,
  payload: error
});

export const fetchChallengesTemplateStart = () => ({
  type: challengeTemplateActionTypes.FETCH_CHALLENGES_TEMPLATE_START
});

export const fetchChallengesTemplateSuccess = challengesTemplatesCategories => ({
  type: challengeTemplateActionTypes.FETCH_CHALLENGES_TEMPLATE_SUCCESS,
  payload: challengesTemplatesCategories
});

export const fetchChallengesTemplateFailure = error => ({
  type: challengeTemplateActionTypes.FETCH_CHALLENGES_TEMPLATE_FAILURE,
  payload: error
});

export const setCategoryOverview = category => ({
  type: challengeTemplateActionTypes.SET_CATEGORY_OVERVIEW,
  payload: category
});

export const storeChallengeTemplateStart = (
  challengeCredentials,
  downloadURL,
  challengesTemplatesId
) => ({
  type: challengeTemplateActionTypes.STORE_CHALLENGE_TEMPLATE_START,
  payload: {
    challengeCredentials,
    downloadURL,
    challengesTemplatesId
  }
});

export const storeChallengeTemplateSuccess = () => ({
  type: challengeTemplateActionTypes.STORE_CHALLENGE_TEMPLATE_SUCCESS
});

export const storeChallengeTemplateFailure = error => ({
  type: challengeTemplateActionTypes.STORE_CHALLENGE_TEMPLATE_FAILURE,
  payload: error
});
