import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Books from "./pages/Books.jsx";
import Users from "./pages/Users.jsx";
import AddBook from "./pages/AddBook.jsx";
import AddUser from "./pages/AddUser.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "20px", width: "100%" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            {/* <Route path="/users" element={<Users />} /> */}
            <Route path="/add-book" element={<AddBook />} />
            {/* <Route path="/add-user" element={<AddUser />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}