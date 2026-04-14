// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import Borrow from "./pages/Borrow";
import Return from "./pages/Return";

import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Books />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/return" element={<Return />} />
        
        {/* <Route path="/borrowed" element={<Borrowed />} /> */}
      </Routes>
    </BrowserRouter>
  );
}