import React, { useState } from 'react';
import './AddBook.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBook ( onAddBook ) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [noOfPages, setNoOfPages] = useState('');
  const [price, setPrice] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publisher, setPublisher] = useState('');
  const [disponibility, setDisponibility] = useState('');
  const [domain, setDomain] = useState('');
  const [language, setLanguage] = useState('');

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBook = {
      title,
      author,
      year,
      noOfPages,
      price,
      isbn,
      publisher,
      disponibility,
      domain,
      language
    };

    await axios.post("http://localhost:8080/book", newBook);
    navigate("/employee");

    // Reset the form fields after submission
    setTitle('');
    setAuthor('');
    setYear('');
    setNoOfPages('');
    setPrice('');
    setIsbn('');
    setPublisher('');
    setDisponibility('');
    setDomain('');
    setLanguage('');
  };

  return (
    <div className="add-book">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          required
        />
        <label htmlFor="year">Year:</label>
        <input
          type="text"
          id="year"
          value={year}
          onChange={(event) => setYear(event.target.value)}
          required
        />
        <label htmlFor="noOfPages">No. of Pages:</label>
        <input
          type="text"
          id="noOfPages"
          value={noOfPages}
          onChange={(event) => setNoOfPages(event.target.value)}
          required
        />
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="text"
          id="isbn"
          value={isbn}
          onChange={(event) => setIsbn(event.target.value)}
          required
        />
        <label htmlFor="publisher">Publisher:</label>
        <input
          type="text"
          id="publisher"
          value={publisher}
          onChange={(event) => setPublisher(event.target.value)}
          required
        />
        <label htmlFor="disponibility">Disponibility:</label>
        <input
          type="text"
          id="disponibility"
          value={disponibility}
          onChange={(event) => setDisponibility(event.target.value)}
          required
        />
        <label htmlFor="domain">Domain:</label>
        <input
          type="text"
          id="domain"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
          required
        />
        <label htmlFor="language">Language:</label>
        <input
          type="text"
          id="language"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
