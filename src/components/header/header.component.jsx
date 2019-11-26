import React from "react";
import {Link} from "react-router-dom"

import {connect} from "react-redux";

import {createStructuredSelector} from "reselect";
import{selectCurrentUser} from "../../redux/user/user.selectors";
import {signOutStart} from "../../redux/user/user.utils"

import {ReactComponent as Logo} from "../../assets/logo.svg";

import UserInfo from "../user-info/user-info.component";

import './header.styles.scss';

const Header= ({currentUser, signOutStart})=>{
    
    return(
    <div className="header">
        <Link to="/">
         <Logo className="logo"/>
        </Link>
        <div className="user-info-container">
            {
            currentUser? 
            <UserInfo className="user-info" currentUser={currentUser}/> 
            :null
            }
        </div>
        <div className="miscelaneous-container">
            {
            currentUser?
            <div className="signOut" onClick={signOutStart}>SIGN OUT</div>:
            <Link className="signIn" to="/signIn">SIGN IN / REGISTER</Link>
            }
        </div>
    </div>
)
}

const mapStateToProps = createStructuredSelector({
        currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch =>({
    signOutStart: currentUser => dispatch(signOutStart(currentUser)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);