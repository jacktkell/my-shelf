import React from "react";
import "./styles.css";

function BookCard({ book }) {
  const details = `/books/${book.id}`;

  // displays information for each book in the BookCollection component
  return (
    <div>
        <ul className="bookcard">
          <h3>
            {book.title}
          </h3>
          <img src={book.image} alt={book.title} className="photo" />
          <h3>by {book.author}</h3>
          <a href={details}>Details about {book.title}</a>
        </ul>
    </div>
  );
}

export default BookCard;
