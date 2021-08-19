import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function UpdateForm({ currentUser }) {
  const [newName, setNewName] = useState("");
  const [newFavGenre, setNewFavGenre] = useState("");
  const [newBio, setNewBio] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    const profileData = {
      name: newName,
      fav_genre: newFavGenre,
      bio: newBio,
    };
    async function updateProfile() {
      const res = await fetch(`/users/${currentUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileData }),
      });
      if (res.ok) {
        const profile = await res.json();
        history.push("/myprofile");
      }
    }
    updateProfile();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Update Profile</h1>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          name="name"
          onChange={(e) => setNewName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Bio"
          value={newBio}
          name="name"
          onChange={(e) => setNewBio(e.target.value)}
        ></input>
        <select
          name="FavGenre"
          id="FavGenre"
          onChange={(e) => setNewFavGenre(e.target.value)}
        >
          <option value="fantasy">fantasy</option>
          <option value="horror">horror</option>
          <option value="romance">romance</option>
          <option value="poetry">poetry</option>
          <option value="manga">manga</option>
          <option value="western">western</option>
          <option value="adventure">adventure</option>
          <option value="science fiction">science fiction</option>
        </select>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default UpdateForm;
