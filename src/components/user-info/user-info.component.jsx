import React from "react";

import './user-info.styles.scss';

const UserInfo= ()=>(
    <div className="user-info-container">
       <div className="photo container">
            <img src={image} alt="user-photo"/>
       </div>
       <div classname="rating">RATING</div>
       <div classname="countdown">COUNTDOWN</div>
       <div classname="belt-container">
            <img src={image} alt="belt"/>  
       </div>   
    </div>  
)

export default UserInfo;