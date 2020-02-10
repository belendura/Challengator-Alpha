import React from "react";

import AcceptedFriendItem from "../accepted-friend-item/accepted-friend-item.component";

import "./accepted-friends.styles.jsx";

const AcceptedFriends = ({ friends }) => {
  return (
    <div>
      {friends.map((item, index) => {
        return <AcceptedFriendItem key={index} item={item} />;
      })}
    </div>
  );
};

export default AcceptedFriends;
