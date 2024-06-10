import React, { useState } from "react";
import axios from "axios";

function AddMenu() {
  const [formData, setFormData] = useState({
    admin_id: "",
    menu_name: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("admin_id", formData.admin_id);
    data.append("menu_name", formData.menu_name);
    data.append("price", formData.price);
    data.append("image", formData.image);

    axios
      .post("http://localhost:3001/add-menu", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Menu added successfully");
      })
      .catch((error) => {
        console.error("Error adding menu:", error);
      });
  };

  return (
    <div>
      <h1>Add Menu</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Admin ID:</label>
          <input type="text" name="admin_id" onChange={handleChange} required />
        </div>
        <div>
          <label>Menu Name:</label>
          <input
            type="text"
            name="menu_name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" onChange={handleChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleChange} required />
        </div>
        <button type="submit">Add Menu</button>
      </form>
    </div>
  );
}

export default AddMenu;
