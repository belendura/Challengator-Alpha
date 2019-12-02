import challengeActionTypes from "./challenge.types";
import {addChallenge, removeChallenge} from "./challenge.utils";

const INITIAL_STATE={ 
 challenge_in_progress: false,
 challengeItems: []
}

const challengeReducer = (state=INITIAL_STATE, action)=>{
    switch (action.type){
        case challengeActionTypes.ACCEPT_CHALLENGE:
            return{
            ...state,
            challenge_in_progress: true,
            challengeItems: addChallenge(state.challengeItems,action.payload)
            }
        case challengeActionTypes.CANCEL_CHALLENGE:
            return{
            ...state,
            challenge_in_progress: false,
            challengeItems: removeChallenge(state.challengeItems,action.payload)
            }
        case challengeActionTypes.CLEAR_CART:
            return{
            ...state,
            challengeItems: []
            } 
        default:
            return state;
    }
}

export default challengeReducer;