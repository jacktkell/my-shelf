import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function UpdateForm({ currentUser, setProfile }) {
  const [newName, setNewName] = useState("");
  const [newFavGenre, setNewFavGenre] = useState("");
  const [newBio, setNewBio] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const profileData = {
      name: newName,
      fav_genre: newFavGenre,
      bio: newBio,
    };
    const res = await fetch(`/users/${currentUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })
      .then((res) => res.json())
      .then((json) => setProfile(json));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Update Profile</h1>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          name="newName"
          onChange={(e) => setNewName(e.target.value)}
        ></input>
        <br/>
        <input
          type="text"
          placeholder="Bio"
          value={newBio}
          name="newBio"
          onChange={(e) => setNewBio(e.target.value)}
        ></input>
        <br/>
        <select
          name="newFavGenre"
          id="newFavGenre"
          onChange={(e) => setNewFavGenre(e.target.value)}
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
        <br/>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default UpdateForm;
