import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./components/Start";
import Profile from "./components/Profile";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create" element={<Create />} />
        <Route path="edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
