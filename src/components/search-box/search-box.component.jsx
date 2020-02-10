import React from "react";
import { SearchBoxContainer } from "./search-box.styles.jsx";

const SearchBox = ({ placeholder, handleChange }) => {
  return (
    <div>
      <SearchBoxContainer
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
