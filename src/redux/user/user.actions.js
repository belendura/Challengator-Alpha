import userActionTypes from "./user.types";

export const signInSuccess= user =>({
    type:userActionTypes.SIGN_IN_SUCCESS,
    payload: user,
});

export const signInFailure= error =>({
    type:userActionTypes.SIGN_IN_FAILURE,
    payload: error,
});

export const signOutSuccess= () =>({
    type:userActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure= error =>({
    type:userActionTypes.SIGN_OUT_FAILURE,
    payload: error,
});

