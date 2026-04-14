import { useState } from "react";

export default function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addUser = () => {
    alert(
      `User added:\nName: ${form.name}\nEmail: ${form.email}\nPassword: ${form.password}`
    );

    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div>
      <h2>Add User</h2>

      <input
        name="name"
        placeholder="User name"
        value={form.name}
        onChange={handleChange}
      />

      <br />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <br />

      <button onClick={addUser}>Add</button>
    </div>
  );
}