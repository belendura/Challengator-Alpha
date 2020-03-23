import challengeInstanceActionTypes from "./challengesInstances.types";

export const storeChallengeInstanceStart = (
  challengeInstance,
  contenders,
  validators
) => ({
  type: challengeInstanceActionTypes.STORE_CHALLENGE_INSTANCE_START,
  payload: { challengeInstance, contenders, validators }
});

export const storeChallengeInstanceSuccess = challengeInstance => ({
  type: challengeInstanceActionTypes.STORE_CHALLENGE_INSTANCE_SUCCESS,
  payload: challengeInstance
});

export const storeChallengeInstanceFailure = error => ({
  type: challengeInstanceActionTypes.STORE_CHALLENGE_INSTANCE_FAILURE,
  payload: error
});

export const removeChallengeStart = item => ({
  type: challengeInstanceActionTypes.REMOVE_CHALLENGE_START,
  payload: item
});

export const removeChallengeSuccess = () => ({
  type: challengeInstanceActionTypes.REMOVE_CHALLENGE_SUCCESS
});

export const removeChallengeFailure = error => ({
  type: challengeInstanceActionTypes.REMOVE_CHALLENGE_FAILURE,
  payload: error
});

export const fetchChallengesInstancesStart = () => ({
  type: challengeInstanceActionTypes.FETCH_CHALLENGES_INSTANCES_START
});

export const fetchChallengesInstancesSuccess = challengesInstances => ({
  type: challengeInstanceActionTypes.FETCH_CHALLENGES_INSTANCES_SUCCESS,
  payload: challengesInstances
});

export const fetchChallengesInstancesFailure = error => ({
  type: challengeInstanceActionTypes.FETCH_CHALLENGES_INSTANCES_FAILURE,
  payload: error
});

export const IncreaseLikesChallengeInstanceStart = (
  instanceId,
  contender,
  user
) => ({
  type: challengeInstanceActionTypes.INCREASE_LIKES_CHALLENGE_INSTANCE_START,
  payload: { instanceId, contender, user }
});

export const IncreaseLikesChallengeInstanceSuccess = newChallenge => ({
  type: challengeInstanceActionTypes.INCREASE_LIKES_CHALLENGE_INSTANCE_SUCCESS,
  payload: { newChallenge }
});

export const IncreaseLikesChallengeInstanceFailure = error => ({
  type: challengeInstanceActionTypes.INCREASE_LIKES_CHALLENGE_INSTANCE_FAILURE,
  payload: error
});

export const IncreaseUnlikesChallengeInstanceStart = (
  instanceId,
  contender,
  user
) => ({
  type: challengeInstanceActionTypes.INCREASE_UNLIKES_CHALLENGE_INSTANCE_START,
  payload: { instanceId, contender, user }
});

export const IncreaseUnlikesChallengeInstanceSuccess = newChallenge => ({
  type:
    challengeInstanceActionTypes.INCREASE_UNLIKES_CHALLENGE_INSTANCE_SUCCESS,
  payload: { newChallenge }
});

export const IncreaseUnlikesChallengeInstanceFailure = error => ({
  type:
    challengeInstanceActionTypes.INCREASE_UNLIKES_CHALLENGE_INSTANCE_FAILURE,
  payload: error
});
