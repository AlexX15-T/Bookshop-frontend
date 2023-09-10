import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import Login from "./login/Login";
import Register from "./register/Register";
import ShowNavbar from "./components/showNavbar/ShowNavbar";
import Manager from "./manager/Manager";
import Employee from "./employee/Employee";
import AddBook from "./books/AddBook";
import EditBook from "./books/EditBook";

function App() {
  return (
    <div className="App">
      <Router>
        <ShowNavbar>
          <Navbar/>
        </ShowNavbar>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/users/add" element={<AddUser/>} />
            <Route exact path="/users/edit/:id" element={<EditUser/>} />
            <Route exact path="/users/view/:id" element={<ViewUser/>} />
            <Route exact path="/books/add" element={<AddBook/>} />
            <Route exact path="/books/edit/:id" element={<EditBook/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/manager" element={<Manager/>} />
            <Route exact path="/employee" element={<Employee/>} />
            <Route exact path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
