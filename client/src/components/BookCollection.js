import React from "react";
import BookCard from "./BookCard";
import Searchbar from "./Searchbar";
import Filter from "./Filter";

function BookCollection({
  currentUser,
  filteredBooks,
  onFilter,
  onSearch,
  searchedBooks,
}) {
  //displays each book in it's own card as a "recommended" section
  return (
    <div className="bookcard">
      {/* <Searchbar onSearch={onSearch} /> */}
      <Filter onFilter={onFilter} />
      <h1>You might like:</h1>
      {/* {searchedBooks.map((book) => (
        <BookCard book={book} key={book.id} />
      ))} */}
      {filteredBooks.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </div>
  );
}

export default BookCollection;
