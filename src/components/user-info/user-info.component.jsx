import React from "react";

import './user-info.styles.scss';

const UserInfo= ({currentUser:{displayName, photo, belt, rating, countdown}})=>(
    <div className="user-info-container">
          <img src={photo} alt="photo" className="photo"/>
          <span className="rating">{displayName}</span>
          <span className="rating">{rating}</span>
          <span className="countdown">{countdown}</span>
          <img src={belt} alt="belt" className="belt"/>   
    </div>  
)

export default UserInfo;