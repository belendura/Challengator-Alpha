import React from "react";
import {Link} from "react-router-dom"

import {ReactComponent as Logo} from "../../assets/logo.svg";

import './header.styles.scss';

//import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from "./header.styles";

const Header= ()=>(
    <div className="header">
        <Link to="/">
         <Logo className="logo"/>
        </Link>
        <div className="miscelaneous-container">
            <Link className="create-challenge" to="/create">
                CREATE CHALLENGE
            </Link>
            <Link className="signIn" to="/signIn">
                SIGN IN/REGISTER
            </Link>
            <div className="user">
                USER INFORMATION
            </div>
        </div>
    </div>
)

export default Header;