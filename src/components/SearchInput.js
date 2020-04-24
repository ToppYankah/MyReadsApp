import React from "react";

const SearchInput = ({ onChange }) => {
  return (
    <div className="search-books-input-wrapper">
      <input
        onChange={({ currentTarget: { value } }) => onChange(value)}
        type="text"
        placeholder="Search by title or author"
      />
    </div>
  );
};

export default SearchInput;
