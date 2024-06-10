import React, { useState } from "react";
import axios from "axios";

function DeleteMenu() {
  const [formData, setFormData] = useState({
    admin_id: "",
    menu_id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .delete("http://localhost:3001/delete-menu", { data: formData })
      .then((response) => {
        console.log(response.data);
        alert("Menu deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting menu:", error);
      });
  };

  return (
    <div>
      <h1>Delete Menu</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Admin ID:</label>
          <input type="text" name="admin_id" onChange={handleChange} required />
        </div>
        <div>
          <label>Menu ID:</label>
          <input
            type="number"
            name="menu_id"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Delete Menu</button>
      </form>
    </div>
  );
}

export default DeleteMenu;
