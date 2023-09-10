import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ViewUser() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    usertype: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details for user with id {user.id}:
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  {" "}
                  <b> Username: </b>{user.username}
                </li>
                <li className="list-group-item">
                  {" "}
                  <b> Password: </b>{user.password}
                </li>
                <li className="list-group-item">
                  {" "}
                  <b> Usertype: </b>{user.usertype}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to="/">
            {" "}
            Back to Home{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
