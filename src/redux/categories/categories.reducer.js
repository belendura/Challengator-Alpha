import categoriesActionTypes from "./categories.types";

const INITIAL_STATE={ 
 selectedCategory: "miscelaneous",
}

const categoriesReducer = (state=INITIAL_STATE, action)=>{
    switch (action.type){
        case categoriesActionTypes.SET_CATEGORY_OVERVIEW:
            return{
            ...state,
            selectedCategory:action.payload,
            }
        default:
            return state;
    }
}

export default categoriesReducer;