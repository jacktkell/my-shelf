import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Searchbar from "./Searchbar";

function MyShelf({ currentUser }) {
  const [myBooks, setMyBooks] = useState([]);

   //gets a users books
   useEffect(() => {
    async function getBooks() {
      const res = await fetch(`/users/${currentUser.id}`);
      if (res.ok) {
        const user = await res.json();
        setMyBooks(user.user_books);
      }
    }
    getBooks();
  }, []);

  return (
    <div className="bookcard">
      {myBooks.length > 0 ? (
        myBooks.map((book) => <BookCard book={book} key={book.id} />)
      ) : (
        <h2>No books found</h2>
      )}
    </div>
  );
}

export default MyShelf;
