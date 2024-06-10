import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MenuList() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/menu")
      .then((response) => {
        setMenus(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Menu List</h1>
      <Link to="/add">Add Menu</Link>
      <ul>
        {menus.map((menu) => (
          <li key={menu.menu_id}>
            {menu.menu_name} - ${menu.price}
            {menu.image_url && (
              <img
                src={menu.image_url}
                alt={menu.menu_name}
                style={{ width: "100px", height: "100px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuList;
