import React, {useState} from "react";

import {connect} from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {checkUser} from "../../redux/user/user.utils"

import "./sign-in.styles.scss";

const SignIn= ({checkUser})=> {

    const[userCredentials, setCredentials]=useState({email:"", password:""});

    const {email, password} = userCredentials;

    const handleSubmit =event=>{
        event.preventDefault();
       const user= checkUser(email, password);
       console.log(user);
    }

    const handleChange =event=>{
        const {value, name}=event.target;
        setCredentials({...userCredentials, [name]:value});
    }

    return(
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                handleChange={handleChange} 
                type="email" 
                name="email" 
                value={email}
                label="Email" 
                required/>
                <FormInput 
                handleChange={handleChange} 
                type="password" 
                name="password" 
                value={password} 
                label="Password"
                required/>
                <div className="buttons">
                    <CustomButton type="submit">Sign in</CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch =>({
    checkUser: (email, password) => dispatch(checkUser(email, password)),
})

export default connect(null,mapDispatchToProps)(SignIn);