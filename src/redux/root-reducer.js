import {combineReducers} from "redux";

import userReducer from "./user/user.reducer";
import directoryReducer from "./directory/directory.reducer";
import categoriesReducer from "./categories/categories.reducer";

const rootReducer=combineReducers({
    user: userReducer,
    directory: directoryReducer,
    categories: categoriesReducer,
});

export default rootReducer;