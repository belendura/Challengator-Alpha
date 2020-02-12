import React, { useEffect, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import Modal from "./components/modal/modal.component";
import InnerModal from "./components/modal/inner-modal.component";

import Header from "./components/header/header.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectShowModal } from "./redux/modal/modal.selectors";
import { checkUserSession } from "./redux/user/user.actions";

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

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser, shallowEqual);
  const showModal = useSelector(selectShowModal, shallowEqual);

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

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
          <Route exact path="/challenge" component={ChallengeTemplatePage} />
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
