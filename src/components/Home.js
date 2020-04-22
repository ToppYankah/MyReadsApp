import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import "../App.css";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    books: [],
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
    const { books } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              onUpdate={this.handleUpdate}
              title="Currently Reading"
              books={books.filter((book) => book.shelf === "currentlyReading")}
            />
            <Shelf
              onUpdate={this.handleUpdate}
              title="Want to Read"
              books={books.filter((book) => book.shelf === "wantToRead")}
            />
            <Shelf
              onUpdate={this.handleUpdate}
              title="Read"
              books={books.filter((book) => book.shelf === "read")}
            />
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
