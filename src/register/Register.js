import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import en from "./en.json";
import fr from "./fr.json";
import ro from "./ro.json";
import de from "./de.json";
import { AiOutlineFlag } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleRegister = (e) => {
    e.preventDefault();
    sendRegisterRequest();
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  function sendRegisterRequest() {
    const data = { username: username, password: password };
    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Register successful!");
          window.location.href = "/login";
        } else {
          alert("Register failed!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <h2>{languageData.registerPage.title}</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>{languageData.registerPage.usernameLabel}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>{languageData.registerPage.passwordLabel}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>{languageData.registerPage.confirmPasswordLabel}</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" >
            {languageData.registerPage.registerButton}
          </button>
        </form>
        <p>
          <Link to={`/login?lang=${language}`}>
            {languageData.registerPage.loginLink}
          </Link>
        </p>
        <div className="language-container">
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
        </div>
      </div>
    </div>
  );
};

export default Register;
