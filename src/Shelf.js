import React from "react";
import PropTypes from "prop-types";
import Book from "./Book.js";

function Shelf(props) {
  return (
    <div className="list-books-content">
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {props.books.map((book) => (
                <Book key={book.id} book={book} onStateChange={props.onStateChange} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onStateChange: PropTypes.func.isRequired
}
export default Shelf;
