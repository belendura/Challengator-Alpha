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
    case challengeTemplateActionTypes.INCREASE_LIKES_CHALLENGE_TEMPLATE_SUCCESS:
    case challengeTemplateActionTypes.INCREASE_UNLIKES_CHALLENGE_TEMPLATE_SUCCESS:
      return {
        ...state,
        challengesTemplatesCategories: Object.entries(
          state.challengesTemplatesCategories
        ).reduce((accumulator, item) => {
          const [key, value] = item;

          if (key !== action.payload.category) {
            accumulator[key] = value;
          } else {
            accumulator[action.payload.category] = action.payload.newChallenges;
          }

          return accumulator;
        }, {})
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
