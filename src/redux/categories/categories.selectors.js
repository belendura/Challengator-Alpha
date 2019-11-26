import {createSelector} from "reselect";

const selectCategories= state => state.categories;

export const selectCategory = createSelector(
    [selectCategories],
    categories => categories? categories.selectedCategory : ""
)
