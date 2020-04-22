import React from "react";
import Book from "./Book";

const Shelf = ({ title, books, onUpdate }) => {
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          {books.length < 1 && <div className="empty">Shelf is empty</div>}
          <ol className="books-grid">
            {books.map((book) => (
              <Book key={book.id} updateBook={onUpdate} details={book} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Shelf;
