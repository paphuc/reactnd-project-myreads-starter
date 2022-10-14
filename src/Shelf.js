import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

class Shelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onStateChange: PropTypes.func.isRequired
  }
  render() {
    const { title, books, onStateChange } = this.props
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.map(book => (
                  <Book
                    key={book.id}
                    book={book}
                    onStateChange={onStateChange}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Shelf