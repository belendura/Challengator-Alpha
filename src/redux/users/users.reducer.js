import usersActionTypes from "./users.types";

const INITIAL_STATE = {
  users: [],
  isFetching: false,
  error: null
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case usersActionTypes.FETCH_USERS_START:
      return {
        ...state,
        isFetching: true
      };
    case usersActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.payload
      };
    case usersActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case usersActionTypes.ADD_FRIEND_FAILURE:
    case usersActionTypes.ACCEPT_FRIEND_FAILURE:
    case usersActionTypes.DELETE_FRIEND_FAILURE:
    case usersActionTypes.DENY_FRIEND_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default usersReducer;
