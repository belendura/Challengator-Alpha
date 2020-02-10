import challengeInstanceActionTypes from "./challengesInstances.types";

export const acceptChallenge = item => ({
  type: challengeInstanceActionTypes.ACCEPT_CHALLENGE,
  payload: item
});

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

export const cancelChallenge = item => ({
  type: challengeInstanceActionTypes.CANCEL_CHALLENGE,
  payload: item
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

export const fetchChallengesInstanceStart = () => ({
  type: challengeInstanceActionTypes.FETCH_CHALLENGES_INSTANCE_START
});

export const fetchChallengesInstanceSuccess = challengesInstances => ({
  type: challengeInstanceActionTypes.FETCH_CHALLENGES_INSTANCE_SUCCESS,
  payload: challengesInstances
});

export const fetchChallengesInstanceFailure = error => ({
  type: challengeInstanceActionTypes.FETCH_CHALLENGES_INSTANCE_FAILURE,
  payload: error
});
