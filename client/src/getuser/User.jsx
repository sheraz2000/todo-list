import React, { useState, useEffect } from "react";
import "./user.css";
import api from "../api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/user");
        setUsers(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          setUsers([]);
          return;
        }
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Delete user
  const deleteUser = async (userId) => {
    try {
      const response = await api.delete(
        `/api/user/${userId}`
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
      toast.error(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  };

  return (
    <div className="userTable">

      {/* Add User Button */}
      <Link to="/add" className="btn btn-primary userTable__addButton">
        Add User <i className="fa-solid fa-user-plus"></i>
      </Link>

      {/* Table */}
      <div className="userTable__scroll">
        <table className="table table-bordered userTable__table">
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
                <td data-label="S.N.">{index + 1}</td>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Address">{user.address}</td>
                <td data-label="Actions">
                  <div className="userTable__actions">
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-primary userTable__actionButton"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteUser(user._id)}
                      className="btn btn-danger userTable__actionButton"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default User;
