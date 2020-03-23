import { takeLatest, put, all, call } from "redux-saga/effects";

import {
  firestore,
  convertChallengesInstanceSnapshotToMap,
  createChallengeInstanceDocument,
  updateLikesChallengeInstances,
  updateUnlikesChallengeInstances
} from "../../firebase/firebase.utils";

import {
  storeChallengeInstanceSuccess,
  storeChallengeInstanceFailure,
  fetchChallengesInstancesSuccess,
  fetchChallengesInstancesFailure,
  IncreaseLikesChallengeInstanceSuccess,
  IncreaseLikesChallengeInstanceFailure,
  IncreaseUnlikesChallengeInstanceSuccess,
  IncreaseUnlikesChallengeInstanceFailure
} from "./challengesInstances.actions";

import { openModal } from "../modal/modal.actions";

import challengeInstanceActionTypes from "./challengesInstances.types";

export function* onStoreChallengeInstanceStart() {
  yield takeLatest(
    challengeInstanceActionTypes.STORE_CHALLENGE_INSTANCE_START,
    storeChallengeInstanceAsync
  );
}

export function* storeChallengeInstanceAsync({
  payload: { challengeInstance, contenders, validators }
}) {
  try {
    yield call(
      createChallengeInstanceDocument,
      challengeInstance,
      contenders,
      validators
    );
    yield put(storeChallengeInstanceSuccess());
    yield put(
      openModal("ALERTS", {
        alertText: "challengeInstance succesfully created"
      })
    );
  } catch (error) {
    yield put(storeChallengeInstanceFailure(error));
    yield put(
      openModal("ALERTS", {
        alertText: error
      })
    );
  }
}

export function* onFetchChallengesInstancesStart() {
  yield takeLatest(
    challengeInstanceActionTypes.FETCH_CHALLENGES_INSTANCES_START,
    fetchChallengesInstancesAsync
  );
}

export function* fetchChallengesInstancesAsync() {
  try {
    const collectionRef = firestore.collection("challengesInstances");
    const snapshot = yield collectionRef.get();
    const challengesInstances = yield call(
      convertChallengesInstanceSnapshotToMap,
      snapshot
    );
    yield put(fetchChallengesInstancesSuccess(challengesInstances));
  } catch (error) {
    yield put(fetchChallengesInstancesFailure(error.message));
  }
}

export function* onIncreaseLikesChallengeInstancesStart() {
  yield takeLatest(
    challengeInstanceActionTypes.INCREASE_LIKES_CHALLENGE_INSTANCE_START,
    updateLikesChallengesAsync
  );
}

export function* updateLikesChallengesAsync({
  payload: { instanceId, contender, user }
}) {
  try {
    const newChallenge = yield call(
      updateLikesChallengeInstances,
      instanceId,
      contender,
      user
    );
    yield put(IncreaseLikesChallengeInstanceSuccess(newChallenge));
  } catch (error) {
    yield put(IncreaseLikesChallengeInstanceFailure(error.message));
  }
}

export function* onIncreaseUnlikesChallengeInstancesStart() {
  yield takeLatest(
    challengeInstanceActionTypes.INCREASE_UNLIKES_CHALLENGE_INSTANCE_START,
    updateUnlikesChallengesAsync
  );
}

export function* updateUnlikesChallengesAsync({
  payload: { instanceId, contender, user }
}) {
  try {
    const newChallenge = yield call(
      updateUnlikesChallengeInstances,
      instanceId,
      contender,
      user
    );
    yield put(IncreaseUnlikesChallengeInstanceSuccess(newChallenge));
  } catch (error) {
    yield put(IncreaseUnlikesChallengeInstanceFailure(error.message));
  }
}

export function* challengesInstancesSagas() {
  yield all([
    call(onStoreChallengeInstanceStart),
    call(onFetchChallengesInstancesStart),
    call(onIncreaseLikesChallengeInstancesStart),
    call(onIncreaseUnlikesChallengeInstancesStart)
  ]);
}
