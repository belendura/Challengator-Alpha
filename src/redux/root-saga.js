import { all, call } from "redux-saga/effects";

import { userSagas } from "./user/user.sagas";
import { usersSagas } from "./users/users.sagas";
import { challengesTemplatesSagas } from "./challengesTemplates/challengesTemplates.sagas";
import { challengesInstancesSagas } from "./challengesInstances/challengesInstances.sagas";

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(usersSagas),
    call(challengesTemplatesSagas),
    call(challengesInstancesSagas)
  ]);
}
