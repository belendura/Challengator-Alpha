import {users} from "./user.data";

import {signInSuccess, signInFailure, signOutSuccess, signOutFailure,} from "./user.actions";

export const checkUser =(email, password)=>{
  
  const data = users.find(user=> user.email===email);
  return data !==undefined && data.password==password? 
  signInSuccess(data) : 
  signInFailure("User not found");
  
}

export const signOutStart =({currentUser})=>{
  currentUser=null;
  return !currentUser ? 
  signOutSuccess(currentUser) : 
  signOutFailure("Error signing out");
}