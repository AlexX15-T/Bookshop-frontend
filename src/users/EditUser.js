import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {

    let navigate = useNavigate();

    const {id} = useParams();

  const [user, setUser] = useState({
    username: "",
    password: "",
    usertype: "",
  });

  const { username, password, usertype } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/user/${id}`, user);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label for="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group mb-3">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group mb-3">
              <label for="usertype">Usertype</label>
              <input
                type="text"
                className="form-control"
                id="usertype"
                placeholder="Enter Usertype"
                value={usertype}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-primary float-end">
              Submit
            </button>
            <Link className="btn btn-danger float-end mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
