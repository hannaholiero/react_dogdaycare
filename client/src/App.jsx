import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./components/Start";
import Profile from "./components/Profile";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Navbar from "./components/Navbar";
import SingleProfile from "./components/SingleProfile";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<SingleProfile />} />
        <Route path="create" element={<Create />} />
        <Route path="edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
