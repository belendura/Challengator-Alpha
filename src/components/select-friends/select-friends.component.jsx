import React from "react";

const SelectFriends = ({ players, friends, handleChange }) => {
  return (
    <div>
      <select
        id={players}
        name={players}
        onChange={handleChange}
        multiple
        required
      >
        {friends
          ? friends.map((item, index) => {
              return (
                <option key={index} value={item.key}>
                  {item.name}
                </option>
              );
            })
          : null}
      </select>
    </div>
  );
};

export default SelectFriends;
