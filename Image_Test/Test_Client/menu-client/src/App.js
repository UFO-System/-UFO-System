import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuList from "./components/MenuList";
import AddMenu from "./components/AddMenu";
import DeleteMenu from "./components/DeleteMenu";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MenuList />} />
          <Route path="/add" element={<AddMenu />} />
          <Route path="/delete" element={<DeleteMenu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
