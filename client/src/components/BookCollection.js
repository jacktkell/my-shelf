import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Searchbar from "./Searchbar"

function BookCollection({currentUser, books, onSearch}) {
  

 


  //displays each book in it's own card as a "recommended" section
  return (
    <div>
      <Searchbar onSearch={onSearch}/>
      <h1>You might like:</h1>
      {books.map((book) => (
        <BookCard book={book} key={book.id}/>
      ))}
    </div>
  );
}

export default BookCollection;
