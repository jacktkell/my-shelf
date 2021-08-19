import React, { useState } from "react";
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
                <BookCollection currentUser={currentUser} />
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
