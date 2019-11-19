import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import HomePage from "./pages/homepage/homepage.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import Header from "./components/header/header.component";

import {selectCurrentUser} from "./redux/user/user.selectors";

import {GlobalStyle} from "./global.styles";

function App({currentUser}) {
  return (
    <div>
     <GlobalStyle/>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/signin" 
          render={()=> currentUser? 
          <Redirect to="/"/>
          : <SignInAndSignUpPage/>}/>
        </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(App);