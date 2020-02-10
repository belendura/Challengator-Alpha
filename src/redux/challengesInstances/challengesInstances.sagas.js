import { takeLatest, put, all, call } from "redux-saga/effects";

import {
  firestore,
  convertChallengesInstanceSnapshotToMap,
  createChallengeInstanceDocument
} from "../../firebase/firebase.utils";

import {
  storeChallengeInstanceSuccess,
  storeChallengeInstanceFailure,
  fetchChallengesInstanceSuccess,
  fetchChallengesInstanceFailure
} from "./challengesInstances.actions";

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
  } catch (error) {
    yield put(storeChallengeInstanceFailure(error));
  }
}

export function* onFetchChallengesInstanceStart() {
  yield takeLatest(
    challengeInstanceActionTypes.FETCH_CHALLENGES_INSTANCE_START,
    fetchChallengesInstanceAsync
  );
}

export function* fetchChallengesInstanceAsync() {
  try {
    const collectionRef = firestore.collection("challengesInstances");
    const snapshot = yield collectionRef.get();
    const challengesInstances = yield call(
      convertChallengesInstanceSnapshotToMap,
      snapshot
    );
    yield put(fetchChallengesInstanceSuccess(challengesInstances));
  } catch (error) {
    yield put(fetchChallengesInstanceFailure(error.message));
  }
}

export function* challengesInstancesSagas() {
  yield all([
    call(onStoreChallengeInstanceStart),
    call(onFetchChallengesInstanceStart)
  ]);
}
