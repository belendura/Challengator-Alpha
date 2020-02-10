import React from "react";

import FriendItem from "../friend-item/friend-item.component";

import "./friends.styles.scss";

const Friends = ({ friends }) => {
  return (
    <div>
      {friends.map((item, index) => {
        return <FriendItem key={index} item={item} />;
      })}
    </div>
  );
};

export default Friends;
