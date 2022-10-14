import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onStateChange: PropTypes.func.isRequired,
  };
  state = {
    bookState: "",
  };

  componentDidMount() {
    this.setState({ bookState: "none" });
    if (this.props.book.shelf) {
      this.setState({
        bookState: this.props.book.shelf,
      });
    }
  }

  render() {
    const { book, onStateChange } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : "No Image"})`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={this.state.bookState}
                onChange={(event) => {
                  onStateChange(book, event.target.value);
                }}
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
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    );
  }
}

export default Book;
