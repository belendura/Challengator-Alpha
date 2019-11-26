import React from "react";

import "./challenge-item.styles.scss";

const ChallengeItem= ({item}) =>{
    const {title, src, description, visualizations, difficulty}=item;
    console.log("item", item);
    return(    
    <div className="challenge-container">
        <iframe width="644" height="362" src={src} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <div className="challenge-details">
        <span className="title">{title}</span>
        <p className="description">{description}</p>
        <div className="footer">
        <span className="visualizations">{visualizations} visualitzations</span>
        <span className="difficulty">Difficulty: {difficulty}</span>
        </div>
        </div>
    </div>
)}

export default ChallengeItem;