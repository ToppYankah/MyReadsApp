import React, { useState } from "react";

const Book = ({ details: book, updateBook }) => {
  const [move, setMove] = useState(false);

  const changeShelf = async ({ currentTarget }) => {
    const { value: shelf } = currentTarget;
    setMove(true);
    const result = await updateBook(book, shelf);
    result && setMove(false);
  };

  return (
    <li>
      <div className={`book ${move ? "moving" : ""}`}>
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(
                    ${book.imageLinks && book.imageLinks.smallThumbnail})`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              disabled={move}
              value={book.shelf ? book.shelf : "none"}
              onChange={changeShelf}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && (
          <div className="book-authors">
            {book.authors.length > 1
              ? book.authors.join(", ")
              : book.authors[0]}
          </div>
        )}
      </div>
    </li>
  );
};

export default Book;
