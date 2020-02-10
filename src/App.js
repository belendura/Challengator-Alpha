import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import HomePage from "./pages/homepage/homepage.component";
import UserPage from "./pages/userpage/user-page.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Modal from "./components/modal/modal.component";
import InnerModal from "./components/modal/inner-modal.component";

import Header from "./components/header/header.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectShowModal } from "./redux/modal/modal.selectors";
import { checkUserSession } from "./redux/user/user.actions";

import { GlobalStyles } from "./global.styles";

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
