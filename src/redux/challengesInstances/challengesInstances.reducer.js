import challengeInstanceActionTypes from "./challengesInstances.types";

const INITIAL_STATE = {
  challenge_instance: {},
  challenges: {},
  contenders: [],
  validators: [],
  isFetching: false,
  error: undefined
};

const challengeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case challengeInstanceActionTypes.STORE_CHALLENGE_SUCCESS:
      return {
        ...state,
        challenge_instance: action.payload
      };
    case challengeInstanceActionTypes.FETCH_CHALLENGES_INSTANCES_START:
      return {
        ...state,
        isFetching: true
      };
    case challengeInstanceActionTypes.FETCH_CHALLENGES_INSTANCES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        challenges: action.payload
      };
    case challengeInstanceActionTypes.FETCH_CHALLENGES_INSTANCES_FAILURE:
    case challengeInstanceActionTypes.STORE_CHALLENGE_INSTANCE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case challengeInstanceActionTypes.INCREASE_LIKES_CHALLENGE_INSTANCE_SUCCESS:
    case challengeInstanceActionTypes.INCREASE_UNLIKES_CHALLENGE_INSTANCE_SUCCESS:
      return {
        ...state,
        challenges: Object.entries(state.challenges).reduce(
          (accumulator, item) => {
            const [key, value] = item;
            if (key !== action.payload.newChallenge.instanceId) {
              accumulator[key] = value;
            } else {
              accumulator[action.payload.newChallenge.instanceId] =
                action.payload.newChallenge;
            }

            return accumulator;
          },
          {}
        )
      };
    default:
      return state;
  }
};

export default challengeReducer;
