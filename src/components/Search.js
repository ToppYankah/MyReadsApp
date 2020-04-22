import React, { useState } from "react";
import { search, update, getAll } from "../BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchState, setSearchState] = useState({
    value: "",
    result: [],
    notFound: false,
  });

  const handleChange = ({ currentTarget }) => {
    const { value } = currentTarget;
    setSearchState({...searchState, value});
    if (value.length > 0) return handleSearch(value);

    setSearchState({ ...searchState, result: [], notFound: false });
  };

  const handleSearch = async ()=>{
    const result = await search(searchState.value);
    if (result === undefined || !result.length) {
      setSearchState({ ...searchState, result: [], notFound: true });
      return;
    }
    updateResultStates({ ...searchState, result, notFound: result.length < 1 });
  }

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
        <div className="search-books-input-wrapper">
          <input
            onChange={handleChange}
            onFocus={handleChange}
            type="text"
            placeholder="Search by title or author"
          />
        </div>
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
