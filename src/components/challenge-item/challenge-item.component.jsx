import React from "react";
import {withRouter} from "react-router-dom";

import {connect} from "react-redux";

import {createStructuredSelector} from "reselect";
import{selectCurrentUser} from "../../redux/user/user.selectors";

import CustomButton from "../custom-button/custom-button.component";

import {acceptChallenge} from "../../redux/challenge/challenge.actions";

import "./challenge-item.styles.scss";

const ChallengeItem= ({item, currentUser, history, dispatch}) =>{
    const {title, src, description, visualizations, difficulty}=item;
    console.log("item", item);
    console.log("currentUser",currentUser);
    return(    
    <div className="challenge-container">
        <iframe width="322" height="181" src={src} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <div className="challenge-details">
        <span className="title">{title}</span>
        <p className="description">{description}</p>
        <div className="footer">
        <span className="visualizations">{visualizations} visualitzations</span>
        <span className="difficulty">Difficulty: {difficulty}</span>
        </div>
        <CustomButton onClick={()=>{currentUser? 
        history.push("/"): 
        history.push("/signIn");
        dispatch(acceptChallenge(item))}}>
        Accept Challenge
        </CustomButton> 
        </div>
    </div>
)}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
})

export default  withRouter(connect(mapStateToProps)(ChallengeItem));