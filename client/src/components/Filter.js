import React, {useState} from "react";

function Filter({onFilter}) {
    const [filter, setFilter] = useState("")

    function filterBooks(e) {
        e.preventDefault()
        onFilter(filter)
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
          <option value="">all</option>
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

export default Filter;
