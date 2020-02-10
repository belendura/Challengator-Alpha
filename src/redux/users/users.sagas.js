import { takeLatest, put, all, call } from "redux-saga/effects";

import {
  firestore,
  convertUsersSnapshotToMap,
  addFriend,
  acceptFriend,
  deleteFriend
} from "../../firebase/firebase.utils";

import {
  fetchUsersSuccess,
  fetchUsersFailure,
  addFriendSuccess,
  addFriendFailure,
  acceptFriendSuccess,
  acceptFriendFailure,
  deleteFriendSuccess,
  deleteFriendFailure
} from "./users.actions";

import usersActionTypes from "./users.types";

export function* onfetchUsersStart() {
  yield takeLatest(usersActionTypes.FETCH_USERS_START, fetchUsersAsync);
}

export function* fetchUsersAsync() {
  try {
    const collectionRef = firestore.collection("users");
    const snapshot = yield collectionRef.get();
    const users = yield call(convertUsersSnapshotToMap, snapshot);
    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export function* onAddFriendStart() {
  yield takeLatest(usersActionTypes.ADD_FRIEND_START, addFriendAsync);
}

export function* addFriendAsync({ payload: { user, friend } }) {
  try {
    yield call(addFriend, user, friend);
    yield put(addFriendSuccess());
  } catch (error) {
    yield put(addFriendFailure(error.message));
  }
}

export function* onAcceptFriendStart() {
  yield takeLatest(usersActionTypes.ACCEPT_FRIEND_START, acceptFriendAsync);
}

export function* acceptFriendAsync({ payload: { user, friend } }) {
  try {
    yield call(acceptFriend, user, friend);
    yield put(acceptFriendSuccess());
  } catch (error) {
    yield put(acceptFriendFailure(error.message));
  }
}

export function* onDeleteFriendStart() {
  yield takeLatest(usersActionTypes.DELETE_FRIEND_START, deleteFriendAsync);
}

export function* deleteFriendAsync({ payload: { user, friend } }) {
  try {
    yield call(deleteFriend, user, friend);
    yield put(deleteFriendSuccess());
  } catch (error) {
    yield put(deleteFriendFailure(error.message));
  }
}

export function* usersSagas() {
  yield all([
    call(onfetchUsersStart),
    call(onAddFriendStart),
    call(onAcceptFriendStart),
    call(onDeleteFriendStart)
  ]);
}
