import React, { useState } from 'react';
import "./adduser.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {

  // Initial state
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user`,
        user
      );
      toast.success(response.data.message || "User added successfully", {
        position: "top-right"
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Could not connect to the server",
        { position: "top-right" }
      );
    }
  };

  return (
    <div className="addUser">

      <Link to="/" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Add New User</h3>

      <form className="addUserForm" onSubmit={submitForm}>

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={inputHandler}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={inputHandler}
            required
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={user.address}
            onChange={inputHandler}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

      </form>
    </div>
  );
};

export default AddUser;
