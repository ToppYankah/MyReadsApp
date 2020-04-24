import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import "../App.css";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    books: [],
    shelves: [
      {
        title: "Currently Reading",
        label: "currentlyReading",
      },
      {
        title: "Want to Read",
        label: "wantToRead",
      },
      {
        title: "Read",
        label: "read",
      },
    ],
  };

  async componentDidMount() {
    this.setState({ books: await BooksAPI.getAll() });
  }

  handleUpdate = (updatedBook, shelf) => {
    BooksAPI.update(updatedBook, shelf).then(async () => {
      const newBooks = this.state.books.filter(
        (book) => book.id !== updatedBook.id
      );
      newBooks.push(await BooksAPI.get(updatedBook.id));
      this.setState({ books: newBooks });
    });
  };

  render() {
    const { books, shelves } = this.state;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (
              <Shelf
                key={shelf.label}
                onUpdate={this.handleUpdate}
                title={shelf.title}
                books={books.filter((book) => book.shelf === shelf.label)}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Home;
