import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Searchbar from "./Searchbar";

function BookCollection({currentUser}) {
  //state so each book can be mapped over and contain its own info
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  // fetch request to recieve book data from backend and set it to our state
  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("/books");
      if (res.ok) {
        const bookData = await res.json();
        setBooks(bookData);
      }
    }
    fetchBooks();
  }, []);

  const displayedBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );


  //displays each book in it's own card as a "recommended" section
  return (
    <div>
      <Searchbar onSearch={setSearch} />
      <h1>You might like:</h1>
      {books.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </div>
  );
}

export default BookCollection;
