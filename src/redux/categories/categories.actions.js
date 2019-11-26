import categoriesActionTypes from "./categories.types";

export const setCategoryOverview = category =>({
    type: categoriesActionTypes.SET_CATEGORY_OVERVIEW,
    payload: category,
});
