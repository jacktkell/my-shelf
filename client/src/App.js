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

function App() {

  //state so each book can be mapped over and contain its own info
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  // set state for logged in user
  const [currentUser, setCurrentUser] = useState({});

  function storeUser(user) {
    localStorage.setItem("user", user.id);
    setCurrentUser(user);
  }

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

  const displayedBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Router>
      <div>
        {localStorage.getItem("user") && (
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/myshelf">My Shelf</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Log out</button>
              </li>
            </ul>
          </nav>
        )}
        <Switch>
          {localStorage.getItem("user") ? (
            <>
              <Route path="/books/:id">
                <BookDetails currentUser={currentUser} />
              </Route>
              <Route path="/" exact>
                <BookCollection currentUser={currentUser} books={displayedBooks} onSearch = {setSearch}/>
              </Route>
              <Route path="/myshelf">
                <MyShelf currentUser={currentUser} />
              </Route>
            </>
          ) : (
            <Route exact path="/">
                <LoginSignupPage
                  onLogin={storeUser}
                  currentUser={currentUser}
                />
            </Route>
          )}
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
