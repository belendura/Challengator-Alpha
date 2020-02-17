import React from "react";
import { Link } from "react-router-dom";

import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import UserInfo from "../user-info/user-info.component";

import { signOutStart } from "../../redux/user/user.actions";

import {
  HeaderContainer,
  MiscelaneousContainer,
  UserInfoContainer,
  LogoPicture,
  Signed,
  SignOut,
  User,
  SignIn
} from "./header.styles.jsx";

const Header = () => {
  const currentUser = useSelector(selectCurrentUser, shallowEqual);

  const dispatch = useDispatch();

  return (
    <HeaderContainer>
      <Link to="/">
        <LogoPicture />
      </Link>
      <UserInfoContainer>
        {currentUser ? <UserInfo currentUser={currentUser} /> : null}
      </UserInfoContainer>
      <MiscelaneousContainer>
        {currentUser ? (
          <Signed>
            <User to="/user">USER</User>
            <SignOut onClick={() => dispatch(signOutStart())}>SIGN OUT</SignOut>
          </Signed>
        ) : (
          <SignIn to="/signIn">SIGN IN / REGISTER</SignIn>
        )}
      </MiscelaneousContainer>
    </HeaderContainer>
  );
};

export default Header;
