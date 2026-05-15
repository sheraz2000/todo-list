import React, { useState, useEffect } from 'react';
import "./update.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // Input handler
  const inputHandler = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Get user by ID
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // Update user
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/user/${id}`,
        user
      );

      toast.success(response.data.message || "User updated");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="addUser">

      <Link to="/" className="btn btn-secondary">
        Back
      </Link>

      <h3>Update User</h3>

      <form className="addUserForm" onSubmit={submitForm}>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={inputHandler}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={inputHandler}
            required
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={inputHandler}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>

      </form>
    </div>
  );
};

export default UpdateUser;
