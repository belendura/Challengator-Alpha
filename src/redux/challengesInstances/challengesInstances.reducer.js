import challengeInstanceActionTypes from "./challengesInstances.types";

const INITIAL_STATE = {
  challenge_in_progress: false,
  challenge_instance: {},
  challenges: {},
  contenders: [],
  validators: [],
  isFetching: false,
  error: undefined
};

const challengeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case challengeInstanceActionTypes.ACCEPT_CHALLENGE:
      return {
        ...state,
        challenge_in_progress: true,
        challenge_instance: action.payload
      };
    case challengeInstanceActionTypes.CANCEL_CHALLENGE:
      return {
        ...state,
        challenge_in_progress: false
      };
    case challengeInstanceActionTypes.FETCH_CHALLENGES_INSTANCE_START:
      return {
        ...state,
        isFetching: true
      };
    case challengeInstanceActionTypes.FETCH_CHALLENGES_INSTANCE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        challenges: action.payload
      };
    case challengeInstanceActionTypes.FETCH_CHALLENGES_INSTANCE_FAILURE:
    case challengeInstanceActionTypes.STORE_CHALLENGE_INSTANCE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default challengeReducer;
