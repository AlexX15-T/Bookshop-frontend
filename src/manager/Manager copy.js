import React, { useState, useEffect } from 'react';
import './Manager.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import { AiOutlineFlag } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import en from "./en.json";
import fr from "./fr.json";
import ro from "./ro.json";
import de from "./de.json";

const Manager = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    domain: '',
    author: '',
    publisher: '',
    minPrice: '',
    maxPrice: '',
    disponibility: false
  });
  const [uniqueDomains, setUniqueDomains] = useState([]);
  const [uniqueAuthors, setUniqueAuthors] = useState([]);
  const [uniquePublishers, setUniquePublishers] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [language, setLanguage] = useState(queryParams.get("lang") || "en"); // Default language is English

  let languageData = queryParams.get("lang") || "en";

  if (language === "en") {
    languageData = en;
  } else if (language === "fr") {
    languageData = fr;
  } else if (language === "ro") {
    languageData = ro;
  } else if (language === "de") {
    languageData = de;
  }

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  // Fetch books from the backend on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to fetch books from the backend
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8080/books'); // Adjust the endpoint URL accordingly
      const jsonData = await response.json();
      setBooks(jsonData);
      setUniqueDomains([...new Set(jsonData.map(book => book.domain))]);
      setUniqueAuthors([...new Set(jsonData.map(book => book.author))]);
      setUniquePublishers([...new Set(jsonData.map(book => book.publisher))]);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Function to handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle filter change
  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  function getBook(id) {
    // return the book with the given id
    return books.find(book => book.id === id);
    }

  function deleteBook(id) {
    fetch(`http://localhost:8080/book/${id}`, {
      method: 'DELETE'
    }).then(() => {
      alert('Book deleted successfully!');
      window.location.reload();
    }).catch(error => {
      console.error('Error deleting book:', error);
    });
  }

  function sell(id) {
    let currentBook = getBook(id);
    currentBook.disponibility = currentBook.disponibility - 1;
    fetch(`http://localhost:8080/book/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentBook)
    }).then(() => {
      alert('Book sold successfully!');
      window.location.reload();
    }).catch(error => {
      console.error('Error selling book:', error);
    });
  }

  // Apply filters to the book data
  const filteredBooks = books.filter(book => {
    const { title, domain, author, publisher, price, disponibility } = book;
    const { minPrice, maxPrice } = filters;

    // Apply search term filter
    if (searchTerm && !title.toLowerCase().startsWith(searchTerm.toLowerCase())) {
      return false;
    }

    // Apply domain filter
    if (filters.domain && domain !== filters.domain) {
      return false;
    }

    // Apply author filter
    if (filters.author && author !== filters.author) {
      return false;
    }

    // Apply publisher filter
    if (filters.publisher && publisher !== filters.publisher) {
      return false;
    }

    // Apply price filter
    if (
      (minPrice && price < parseFloat(minPrice)) ||
      (maxPrice && price > parseFloat(maxPrice))
    ) {
      return false;
    }

    // Apply disponibility filter
    if (filters.disponibility && disponibility <= 0) {
      return false;
    }

    return true;
  });

  const [saveFormat, setSaveFormat] = useState('txt');

  const handleSaveFormatChange = (event) => {
    axios.get(`http://localhost:8080/books/save/${event.target.value}`)
        .then((response) => {
            setBooks(response.data);
        }
    );
    setSaveFormat(event.target.value);
  };

  const handleSave = () => {
    // Perform save operation based on selected format and book data
    console.log(`Saving books as ${saveFormat}`);
  };

  return (
    <div className="container">
      <div className="navbar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search by title"
        />
        <Link to="/books/add">
            <button>Add Book</button>
        </Link>

          <button
            className={`language-button ${language === "en" && "active"}`}
            onClick={() => handleLanguageChange("en")}
          >
            <AiOutlineFlag className="language-icon" /> English
          </button>
          <button
            className={`language-button ${language === "fr" && "active"}`}
            onClick={() => handleLanguageChange("fr")}
          >
            <AiOutlineFlag className="language-icon" /> Français
          </button>
          <button
            className={`language-button ${language === "ro" && "active"}`}
            onClick={() => handleLanguageChange("ro")}
          >
            <AiOutlineFlag className="language-icon" /> Română
          </button>
          <button
            className={`language-button ${language === "de" && "active"}`}
            onClick={() => handleLanguageChange("de")}
          >
            <AiOutlineFlag className="language-icon" /> Deutsch
          </button>

          <div className="save-format">
          <label htmlFor="saveFormat">Save Format:</label>
          <select id="saveFormat" name="saveFormat" value={saveFormat} onChange={handleSaveFormatChange}>
            <option value="txt">Text (txt)</option>
            <option value="json">JSON (json)</option>
            <option value="xml">XML (xml)</option>
            <option value="csv">CSV (csv)</option>
          </select>
        </div>

        <div className="button-group">
          <button type="button" onClick={handleSave}>Save</button>
        </div>

      </div>
      <div className="filters">
        <label htmlFor="domain">Domain:</label>
        <select
          id="domain"
          name="domain"
          value={filters.domain}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          {uniqueDomains.map((domain, index) => (
            <option key={index} value={domain}>
              {domain}
            </option>
          ))}
        </select>
        <label htmlFor="author">Author:</label>
        <select
          id="author"
          name="author"
          value={filters.author}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          {uniqueAuthors.map((author, index) => (
            <option key={index} value={author}>
              {author}
            </option>
          ))}
        </select>
        <label htmlFor="publisher">Publisher:</label>
        <select
          id="publisher"
          name="publisher"
          value={filters.publisher}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          {uniquePublishers.map((publisher, index) => (
            <option key={index} value={publisher}>
              {publisher}
            </option>
          ))}
        </select>
        <label htmlFor="minPrice">Min Price:</label>
        <input
          type="text"
          id="minPrice"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
        <label htmlFor="maxPrice">Max Price:</label>
        <input
          type="text"
          id="maxPrice"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
        <label htmlFor="disponibility">Disponibility:</label>
        <input
          type="checkbox"
          id="disponibility"
          name="disponibility"
          checked={filters.disponibility}
          onChange={handleFilterChange}
        />
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>No. of Pages</th>
            <th>Price</th>
            <th>ISBN</th>
            <th>Publisher</th>
            <th>Disponibility</th>
            <th>Domain</th>
            <th>Language</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>
                <input
                  type="text"
                  value={book.title}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={book.author}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={book.year}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={book.noOfPages}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={book.price}
                />
              </td>
              <td>{book.isbn}</td>
              <td>
                <input
                  type="text"
                  value={book.publisher}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={book.disponibility}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={book.domain}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={book.language}
                />
              </td>
                <td>
                <Link
                    class="btn btn-outline-primary mx-2"
                    to={`/books/edit/${book.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    class="btn btn-danger"
                    onClick={() => deleteBook(book.id)}
                  >
                    Delete
                  </button>
                  <button
                    class="btn btn-outline-primary"
                    onClick={() => sell(book.id)}
                  >
                    Sell
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Manager;
