import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Searchbar from "./Searchbar";

function MyShelf({ currentUser, onSearch, searchedBooks }) {

  return (
    <div className="bookcard">
      <Searchbar onSearch={onSearch}/>
      {searchedBooks.length > 0 ? (
        searchedBooks.map((book) => <BookCard book={book} key={book.id} />)
      ) : (
        <h2>No books found</h2>
      )}
    </div>
  );
}

export default MyShelf;
