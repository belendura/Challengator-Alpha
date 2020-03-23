import React, { useEffect, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectShowModal } from "./redux/modal/modal.selectors";
import { selectChallengesTemplatesFetching } from "./redux/challengesTemplates/challengesTemplates.selectors";

import { checkUserSession } from "./redux/user/user.actions";
import { fetchChallengesTemplateStart } from "./redux/challengesTemplates/challengesTemplates.actions";
import { fetchChallengesInstancesStart } from "./redux/challengesInstances/challengesInstances.actions";
import { fetchUsersStart } from "./redux/users/users.actions";

import Modal from "./components/modal/modal.component";
import InnerModal from "./components/modal/inner-modal.component";
import Header from "./components/header/header.component";

import { GlobalStyles } from "./global.styles";

const HomePage = React.lazy(() =>
  import("./pages/homepage/homepage.component")
);
const UserPage = React.lazy(() =>
  import("./pages/userpage/user-page.component")
);
const SignInAndSignUpPage = React.lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const ChallengeTemplatePage = React.lazy(() =>
  import("./pages/challenge-template-page/challenge-template-page.component")
);
const ChallengeInstancePage = React.lazy(() =>
  import("./pages/challenge-instance-page/challenge-instance-page.component")
);

const selectData = createStructuredSelector({
  currentUser: selectCurrentUser,
  showModal: selectShowModal,
  isFetching: selectChallengesTemplatesFetching
});

const App = () => {
  const dispatch = useDispatch();
  const { currentUser, showModal, isFetching } = useSelector(
    selectData,
    shallowEqual
  );
  // const showModal = useSelector(selectShowModal, shallowEqual);

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  useEffect(() => {
    dispatch(fetchChallengesTemplateStart());
  }, []);

  useEffect(() => {
    dispatch(fetchChallengesInstancesStart());
  }, [fetchChallengesInstancesStart, dispatch]);

  useEffect(() => {
    dispatch(fetchUsersStart());
  }, [fetchUsersStart, dispatch]);

  return (
    <div>
      <GlobalStyles />
      <Header />
      <Switch>
        <Suspense fallback={<div>...Is Loading</div>}>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/user"
            render={() => (currentUser ? <UserPage /> : <Redirect to="/" />)}
          />
          <Route
            exact
            path="/signIn"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          />
          {!isFetching ? (
            <Route
              exact
              path="/challenge/:templateId"
              component={ChallengeTemplatePage}
            />
          ) : null}
          <Route
            exact
            path="/user-challenge"
            component={ChallengeInstancePage}
          />
        </Suspense>
      </Switch>
      {showModal ? (
        <Modal>
          <InnerModal />
        </Modal>
      ) : null}
    </div>
  );
};

export default App;
