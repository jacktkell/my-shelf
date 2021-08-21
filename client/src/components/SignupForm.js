import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignupForm({ onLogin, currentUser }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [fav_genre, setFav_Genre] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState(null);

  const history = useHistory();

  //handles input from user and posts to backend
  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      name,
      password,
      fav_genre,
      bio,
    };
    const res = await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    const userData = await res.json();
    if (res.ok) {
      onLogin(userData);
      history.push("/");
    } else {
      setErrors(userData.message);
    }
  }

  //form for users to fill out to create an account
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Biography"
          value={bio}
          name="bio"
          onChange={(e) => setBio(e.target.value)}
        ></input>
        <select
          name="FavGenre"
          id="FavGenre"
          onChange={(e) => setFav_Genre(e.target.value)}
        >
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Poetry">Poetry</option>
          <option value="Manga">Manga</option>
          <option value="Western">Western</option>
          <option value="Adventure">Adventure</option>
          <option value="Science Fiction">Science Fiction</option>
        </select>
        <input type="submit" value="Submit"></input>
        {errors ? errors.map((error) => <div>{error}</div>) : null}
      </form>
    </div>
  );
}

export default SignupForm;
