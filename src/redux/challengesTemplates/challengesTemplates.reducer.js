import challengeTemplateActionTypes from "./challengesTemplates.types";

const INITIAL_STATE = {
  challengesTemplatesCategories: {},
  selectedCategory: "miscelaneous",
  isFetching: false,
  error: undefined
};

const challengesTemplatesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case challengeTemplateActionTypes.FETCH_CHALLENGES_TEMPLATE_START:
      return {
        ...state,
        isFetching: true
      };
    case challengeTemplateActionTypes.FETCH_CHALLENGES_TEMPLATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        challengesTemplatesCategories: action.payload
      };
    case challengeTemplateActionTypes.PROPOSE_CHALLENGE_FAILURE:
    case challengeTemplateActionTypes.FETCH_CHALLENGES_TEMPLATE_FAILURE:
    case challengeTemplateActionTypes.STORE_CHALLENGE_TEMPLATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case challengeTemplateActionTypes.SET_CATEGORY_OVERVIEW:
      return {
        ...state,
        selectedCategory: action.payload
      };
    default:
      return state;
  }
};

export default challengesTemplatesReducer;
