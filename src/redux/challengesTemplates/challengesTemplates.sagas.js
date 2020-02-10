import { takeLatest, put, all, call } from "redux-saga/effects";

import { createIDChallenge } from "./challengesTemplates.utils";

import {
  uploadFile,
  firestore,
  convertChallengesSnapshotToMap,
  createChallengeTemplateDocument
} from "../../firebase/firebase.utils";

import {
  proposeChallengeFailure,
  fetchChallengesTemplateSuccess,
  fetchChallengesTemplateFailure,
  storeChallengeTemplateSuccess,
  storeChallengeTemplateFailure
} from "./challengesTemplates.actions";

import challengeTemplateActionTypes from "./challengesTemplates.types";

import { openModal } from "../modal/modal.actions";

export function* onProposeChallengeStart() {
  yield takeLatest(
    challengeTemplateActionTypes.PROPOSE_CHALLENGE_START,
    onProposeChallenge
  );
}

export function* onProposeChallenge({ payload }) {
  try {
    yield call(uploadFile, payload);
  } catch (error) {
    yield put(proposeChallengeFailure(error));
  }
}

export function* onStoreChallengeTemplateStart() {
  yield takeLatest(
    challengeTemplateActionTypes.STORE_CHALLENGE_TEMPLATE_START,
    storeChallengeAsync
  );
}

export function* storeChallengeAsync({
  payload: { challengeCredentials, downloadURL, challengesTemplatesId }
}) {
  try {
    const templateId = yield call(createIDChallenge, challengesTemplatesId);
    yield call(
      createChallengeTemplateDocument,
      challengeCredentials,
      downloadURL,
      templateId
    );
    yield put(storeChallengeTemplateSuccess());
    yield put(
      openModal("ALERTS", {
        alertText: "challengeTemplate succesfully created"
      })
    );
  } catch (error) {
    console.log(error.message);
    yield put(storeChallengeTemplateFailure(error));
    yield put(openModal("ALERTS", { alertText: error }));
  }
}

export function* onfetchChallengesStart() {
  yield takeLatest(
    challengeTemplateActionTypes.FETCH_CHALLENGES_TEMPLATE_START,
    fetchChallengesAsync
  );
}

export function* fetchChallengesAsync() {
  try {
    const collectionRef = firestore.collection("challengesTemplates");
    const snapshot = yield collectionRef.get();
    const challengesTemplatesCategories = yield call(
      convertChallengesSnapshotToMap,
      snapshot
    );
    yield put(fetchChallengesTemplateSuccess(challengesTemplatesCategories));
  } catch (error) {
    yield put(fetchChallengesTemplateFailure(error.message));
  }
}

export function* challengesTemplatesSagas() {
  yield all([
    call(onProposeChallengeStart),
    call(onfetchChallengesStart),
    call(onStoreChallengeTemplateStart)
  ]);
}
