import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import en from "./en.json";
import fr from "./fr.json";
import ro from "./ro.json";
import de from "./de.json";
import { AiOutlineFlag } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = (e) => {
    e.preventDefault();
    sendLoginRequest();
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  function sendLoginRequest() {
    const data = { username: username, password: password };
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
            return response.json();
        }
        throw new Error("failed to authenticate user");
      })
      .then((response) => {
         
          alert("Login successful!");

          let usertype = response.usertype;

          switch (usertype) {
            case "admin":
              window.location.href = "/";
              break;
            case "manager":
              window.location.href = "/manager";
              break;
            case "employee":
              window.location.href = "/employee";
              break;
            default:
              window.location.href = "*";
          }
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h2>{languageData.loginPage.title}</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>{languageData.loginPage.usernameLabel}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              //placeholder="Enter Username"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>{languageData.loginPage.passwordLabel}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {languageData.loginPage.loginButton}
          </button>
        </form>
        <p>
          <Link to={`/register?lang=${language}`}>
            {languageData.loginPage.registerLink}
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

export default Login;
