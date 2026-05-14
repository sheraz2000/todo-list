import React, { useState, useEffect } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Delete user
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/user/${userId}`
      );

      // Remove from UI
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );

      toast.success(response.data.message || "User deleted successfully", {
        position: "top-right",
      });

    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="userTable">

      {/* Add User Button */}
      <Link to="/add" className="btn btn-primary">
        Add User <i className="fa-solid fa-user-plus"></i>
      </Link>

      {/* Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>

                {/* Edit Button */}
                <Link
                  to={`/update/${user._id}`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => deleteUser(user._id)}
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default User;