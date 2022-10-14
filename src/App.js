import React, { Component } from "react";
import { Link, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Book from "./Book.js";
import Shelf from "./Shelf";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends Component {
  state = {
    query: "",
    books: [],
    result: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  handleStateChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf;
      BooksAPI.getAll().then((books) => {
        this.setState({
          books: books,
        });
      });
    });
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
      result: [],
    }));
    if (query) {
      BooksAPI.search(query).then((result) => {
        if (result.error) {
          console.log("Search book err: " + result.error);
        } else {
          this.state.books.forEach((book) => {
            let bookOnShelf = result.find((result) => result.id === book.id);
            if (bookOnShelf) bookOnShelf.shelf = book.shelf;
          });
          this.setState({ result });
        }
      });
    }
  };

  render() {
    const shelfs = ["currentlyReading", "wantToRead", "read"];
    const titles = ["Currently Reading", "Want To Read", "Read"];
    const result = this.state.result;
    const books = this.state.books;
    console.log(books)
    return (
      <div className="app">
        <Routes>
          <Route
            path="/search"
            element={
              <div className="search-books">
                <div className="search-books-bar">
                  <Link to="/" className="close-search">
                    Close
                  </Link>
                  <div className="search-books-input-wrapper">
                    <input
                      type="text"
                      placeholder="Search by title or author"
                      value={this.state.query}
                      onChange={(event) => this.updateQuery(event.target.value)}
                    />
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid">
                    {result.map((book) => (
                      <Book
                        key={book.id}
                        book={book}
                        onStateChange={(book, newShelf) => {
                          this.handleStateChange(book, newShelf);
                        }}
                      />
                    ))}
                  </ol>
                </div>
              </div>
            }
          />
          <Route
            exact
            path="/"
            element={
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                {shelfs.map((title, index) => (
                  <Shelf
                    key={index}
                    title={titles[index]}
                    books={books.filter(
                      (book) => book.shelf === title
                    )}
                    onStateChange={this.handleStateChange}
                  />
                ))}
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
