import React, { useState } from "react";

function Filter({ onFilter }) {
  const [filter, setFilter] = useState("");

  function filterBooks(e) {
    e.preventDefault();
    onFilter(filter);
  }

  return (
    <div>
      <form onSubmit={filterBooks}>
        <label htmlFor="filter"> Filter by genre: </label>
        <select
          name="filter"
          id="filter"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Poetry">Poetry</option>
          <option value="Manga">Manga</option>
          <option value="Western">Western</option>
          <option value="Adventure">Adventure</option>
          <option value="Science Fiction">Science Fiction</option>
        </select>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}

export default Filter;
