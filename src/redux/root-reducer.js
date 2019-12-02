import {combineReducers} from "redux";

import userReducer from "./user/user.reducer";
import directoryReducer from "./directory/directory.reducer";
import categoriesReducer from "./categories/categories.reducer";
import challengeReducer from "./challenge/challenge.reducer";

const rootReducer=combineReducers({
    user: userReducer,
    directory: directoryReducer,
    categories: categoriesReducer,
    challenge: challengeReducer,
});

export default rootReducer;