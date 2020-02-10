import usersActionTypes from "./users.types";

export const fetchUsersStart = () => ({
  type: usersActionTypes.FETCH_USERS_START
});

export const fetchUsersSuccess = users => ({
  type: usersActionTypes.FETCH_USERS_SUCCESS,
  payload: users
});

export const fetchUsersFailure = error => ({
  type: usersActionTypes.FETCH_USERS_FAILURE,
  payload: error
});

export const addFriendStart = (user, friend) => ({
  type: usersActionTypes.ADD_FRIEND_START,
  payload: { user, friend }
});

export const addFriendSuccess = () => ({
  type: usersActionTypes.ADD_FRIEND_SUCCESS
});

export const addFriendFailure = error => ({
  type: usersActionTypes.ADD_FRIEND_FAILURE,
  payload: error
});

export const acceptFriendStart = (user, friend) => ({
  type: usersActionTypes.ACCEPT_FRIEND_START,
  payload: { user, friend }
});

export const acceptFriendSuccess = () => ({
  type: usersActionTypes.ACCEPT_FRIEND_SUCCESS
});

export const acceptFriendFailure = error => ({
  type: usersActionTypes.ACCEPT_FRIEND_FAILURE,
  payload: error
});

export const deleteFriendStart = (user, friend) => ({
  type: usersActionTypes.DELETE_FRIEND_START,
  payload: { user, friend }
});

export const deleteFriendSuccess = () => ({
  type: usersActionTypes.DELETE_FRIEND_SUCCESS
});

export const deleteFriendFailure = error => ({
  type: usersActionTypes.DELETE_FRIEND_FAILURE,
  payload: error
});

export const denyFriendStart = (user, friend) => ({
  type: usersActionTypes.DENY_FRIEND_START,
  payload: { user, friend }
});

export const denyFriendSuccess = () => ({
  type: usersActionTypes.DENY_FRIEND_SUCCESS
});

export const denyFriendFailure = error => ({
  type: usersActionTypes.DENY_FRIEND_FAILURE,
  payload: error
});
