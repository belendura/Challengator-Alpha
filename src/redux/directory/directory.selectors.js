import {createSelector} from "reselect";

const selectDirectory= state => state.directory;

export const selectDirectoryCategories = createSelector(
    [selectDirectory],
    directory => directory.categories
);

export const selectDirectoryCategoriesTitle = createSelector(
    [selectDirectoryCategories],
    categories => categories.map(item=> item.title)
);

export const selectDirectoryObj = key => createSelector(
    [selectDirectoryCategories],
    categories => categories.reduce((obj, item)=>{
        obj[item[key]]=item;
        return obj
    }, {})
);

