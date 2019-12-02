import challengeActionTypes from "./challenge.types";

export const acceptChallenge = item=>({
    type: challengeActionTypes.ACCEPT_CHALLENGE,
    payload: item,
});

export const cancelChallenge = item=>({
    type: challengeActionTypes.CANCEL_CHALLENGE,
    payload: item,
});

export const clearCart= () =>({
    type: challengeActionTypes.CLEAR_CART,
});