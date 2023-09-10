import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditBook.css'

export default function EditBook ( onSave ) {
  const [book, setBook] = useState({
    title: '',
    author: '',
    year: '',
    noOfPages: '',
    price: '',
    isbn: '',
    publisher: '',
    disponibility: '',
    domain: '',
    language: ''
  });

  let navigate = useNavigate();

  const {id} = useParams();

  //set fields with existing data
  const loadBook = async () => {
    const response = await fetch(`http://localhost:8080/book/${id}`);
    const data = await response.json();
    setBook(data);
  };
  

  useEffect(() => {
    // Fetch book data for the given id and update the state
    loadBook();
    fetchBookData();
  }, [id]);

  const fetchBookData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/book/${id}`); // Adjust the endpoint URL accordingly
      const jsonData = await response.json();
      setBook(jsonData);
    } catch (error) {
      console.error(`Error fetching book with ID ${id}:`, error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:8080/book/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      });
      navigate('/employee');
    } catch (error) {
      console.error(`Error updating book with ID ${id}:`, error);
    }
  };

  return (
    <div className="edit-book">
      <h2>Edit Book</h2>
      <form onSubmit={handleSave}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={book.title}
          onChange={handleInputChange}
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={book.author}
          onChange={handleInputChange}
        />
        <label htmlFor="year">Year:</label>
        <input
          type="text"
          id="year"
          name="year"
          value={book.year}
          onChange={handleInputChange}
        />
        <label htmlFor="noOfPages">No. of Pages:</label>
        <input
          type="text"
          id="noOfPages"
          name="noOfPages"
          value={book.noOfPages}
          onChange={handleInputChange}
        />
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={book.price}
          onChange={handleInputChange}
        />
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={book.isbn}
          onChange={handleInputChange}
        />
        <label htmlFor="publisher">Publisher:</label>
        <input
          type="text"
          id="publisher"
          name="publisher"
          value={book.publisher}
          onChange={handleInputChange}
        />
        <label htmlFor="disponibility">Disponibility:</label>
        <input
          type="text"
          id="disponibility"
          name="disponibility"
          value={book.disponibility}
          onChange={handleInputChange}
        />
        <label htmlFor="domain">Domain:</label>
        <input
          type="text"
          id="domain"
          name="domain"
          value={book.domain}
          onChange={handleInputChange}
        />
        <label htmlFor="language">Language:</label>
        <input
          type="text"
          id="language"
          name="language"
          value={book.language}
          onChange={handleInputChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

