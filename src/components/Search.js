import React, { useState } from "react";
import { search, update, getAll } from "../BooksAPI";
import { Link } from "react-router-dom";
import Book from "./Book";
import SearchInput from "./SearchInput";

const Search = () => {
  const [searchState, setSearchState] = useState({
    value: "",
    result: [],
    notFound: false,
  });

  const handleSearch = async (value) => {
    if (value.length > 0) {
      const result = await search(value);
      if (result === undefined || !result.length)
        return setSearchState({ value, result: [], notFound: true });
      return updateResultStates({ value, result, notFound: result.length < 1 });
    }
    setSearchState({ value, result: [], notFound: false });
  };

  const updateResultStates = async (newResult) => {
    const existingBooks = await getAll();

    newResult.result.forEach((searchBook, index) => {
      existingBooks.forEach((book) => {
        if (searchBook.id === book.id) {
          newResult.result[index] = book;
        }
      });
    });

    setSearchState(newResult);
  };

  const onUpdate = async (updatedBook, shelf) => {
    const result = await update(updatedBook, shelf);
    const books = searchState.result;

    books.forEach((book, index) => {
      if (book.id === updatedBook.id) {
        books[index].shelf = shelf;
      }
    });

    setSearchState({ ...searchState, result: books });
    return result !== undefined;
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <SearchInput onChange={handleSearch} />
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchState.result.map((book) => (
            <Book key={book.id} updateBook={onUpdate} details={book} />
          ))}
          {searchState.notFound && (
            <div className="empty">
              No such result found "{searchState.value}"
            </div>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Search;
