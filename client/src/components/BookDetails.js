import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./styles.css";

function BookDetails({ currentUser }) {
  const [book, setBook] = useState([]);
  const [errors, setErrors] = useState(null);
  const [review, setReview] = useState([]);
  const [newReview, setNewReview] = useState([]);
  const [rating, setRating] = useState([]);
  const [newRating, setNewRating] = useState([]);
  const [hasShelf, setHasShelf] = useState([]);
  const id = useParams().id;
  let history = useHistory();

  //FETCH A SINGLE BOOK FROM BACKEND
  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}`)
      .then((r) => r.json())
      .then((book) => {
        setBook(book);
        setReview(book.book_reviews);
        setRating(book.book_ratings);
        setHasShelf(book.shelves);
      });
  }, [id]);

  //DECONSTRUCT BOOK INFO FOR EASE OF USE
  const { title, author, genre, length, pub_date, image, shelf, shelves } =
    book;

  //ADDS A BOOK TO A USER'S SHELF
  async function addBook() {
    const bookData = {
      book_id: book.id,
    };
    const res = await fetch("/shelves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    if (res.ok) {
      const shelf = await res.json();
      alert(`${title} has been added to your shelf`);
      history.push("/myshelf");
    } else {
      const error = await res.json();
      setErrors(error.message);
    }
  }

  // REMOVE BOOK FROM MYSHELF
  async function removeBook() {
    const res = await fetch(`/shelves/${shelf}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert(`${title} has been removed from your shelf`);
      history.push("/myshelf");
    }
  }

  //POST REQUEST TO ADD A REVIEW
  async function addReview(e) {
    // e.preventDefault();
    const reviewData = { book_id: book.id, content: newReview };
    const res = await fetch(`/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    const rev = await res.json();
    setReview([...review, rev]);
  }

  // POST RATING
  async function addRating(e) {
    // e.preventDefault();
    const ratingData = { book_id: book.id, rating: newRating };
    const res = await fetch(`/ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingData),
    });
    const rate = await res.json();
    setRating(rate);
  }

  // GET TOTAL FOR THE AVERAGE RATING OF A BOOK
  const total = (accumulator, currentValue) => accumulator + currentValue;

  // DISPLAY BOOK INFORMATION
  return (
    <div className="bookcard">
      <ul>
        <h3>
          {title} by {author}
        </h3>
        <img src={image} alt={title} className="photo" />
        <ul>
          <b>Genre: </b>
          {genre}
        </ul>
        <ul>
          <b>Page count: </b> {length}
        </ul>
        <ul>
          <b>Published: </b>
          {pub_date}
        </ul>
        <ul>
          <b>Average rating: </b>
          {rating.length > 0
            ? (rating.reduce(total) / rating.length).toFixed(2)
            : "This book hasn't been rated yet"}
        </ul>
      </ul>
      <div>
        <b>Reviews about {title}: </b>
        <ul>
          {review.length > 0
            ? review.map((r) => (
                <p key={r.id}>
                  <i>{r}</i>
                </p>
              ))
            : "This book hasn't been reviewed yet"}
        </ul>
        <div className="bookcard">
          {hasShelf.length > 0 ? (
            <button onClick={removeBook}>Remove from my shelf</button>
          ) : (
            <button onClick={addBook}>Add to my shelf</button>
          )}
        </div>

        {/* FORM TO ADD A RATING */}
        <div>
          <form onSubmit={addRating}>
            <label htmlFor="newRating"> Leave a rating: </label>
            <select
              name="newRating"
              id="newRating"
              onChange={(e) => setNewRating(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select> &nbsp;
            <input type="submit" value="Rate" />
          </form>
        </div>

        {/* FORM TO ADD A NEW REVIEW */}
        <div>
          <form onSubmit={addReview}>
            <textarea
              type="text"
              placeholder="Leave a review..."
              name="newReveiw"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            ></textarea> &nbsp;
            <input type="submit" value="Review" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
