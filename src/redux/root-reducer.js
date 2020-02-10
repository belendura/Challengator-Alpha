import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import usersReducer from "./users/users.reducer";
import challengesInstancesReducer from "./challengesInstances/challengesInstances.reducer";
import challengesTemplatesReducer from "./challengesTemplates/challengesTemplates.reducer";
import modalReducer from "./modal/modal.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  challengesTemplates: challengesTemplatesReducer,
  challengesInstances: challengesInstancesReducer,
  modal: modalReducer
});

export default rootReducer;
