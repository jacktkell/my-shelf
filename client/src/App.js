import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import BookCollection from "./components/BookCollection";
import LoginSignupPage from "./components/LoginSignupPage";
import BookDetails from "./components/BookDetails";
import MyShelf from "./components/MyShelf";
import MyProfile from "./components/MyProfile";
import UpdateForm from "./components/UpdateForm";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  //sets key/value pair in local storage to make authentication work
  function storeUser(user) {
    localStorage.setItem("user", user.id);
    setCurrentUser(user);
  }

  //logs user out, deletes local storage id
  function handleLogout() {
    async function logout() {
      const res = await fetch("/logout", { method: "DELETE" });
      if (res.ok) {
        localStorage.removeItem("user");
        setCurrentUser({});
      }
    }
    logout();
  }

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

  // filter books by genre
  const filteredBooks = books.filter((book) =>
    book.genre.toLowerCase().includes(filter.toLowerCase())
  );

  //search for a book
  const searchedBooks = books.filter((book) =>
  book.title.toLowerCase().includes(search.toLowerCase())
  );  

  return (
    <Router>
      <div>
        {localStorage.getItem("user") && (
          <nav className="topnav">
            <a className="active" href="/">
              Home
            </a>
            <a href="/myshelf">My Shelf</a>
            <a href="/myprofile">My Profile</a>
            <button onClick={handleLogout}>Log out</button>
          </nav>
        )}
        <Switch>
          {localStorage.getItem("user") ? (
            <>
              <Route path="/books/:id">
                <BookDetails currentUser={currentUser} />
              </Route>
              <Route path="/" exact>
                <BookCollection
                  currentUser={currentUser}
                  filteredBooks={filteredBooks}
                  onFilter={setFilter}
                  onSearch={setSearch}
                  searchedBooks={searchedBooks}
                />
              </Route>
              <Route path="/myshelf">
                <MyShelf
                  currentUser={currentUser}
                />
              </Route>
              <Route path="/myprofile">
                <MyProfile currentUser={currentUser} />
              </Route>
              <Route path="/update">
                <UpdateForm currentUser={currentUser} />
              </Route>
            </>
          ) : (
            <Route exact path="/">
              <LoginSignupPage onLogin={storeUser} currentUser={currentUser} />
            </Route>
          )}
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
