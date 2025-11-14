import React, { useEffect, useState } from "react";

function App() {
  const API_URL = "http://localhost:5000/users";
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);

  //  GET: Fetch users
  const fetchUsers = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //  POST: Add new user
  const addUser = async () => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", email: "" });
    fetchUsers();
  };

  //  PUT: Update full user
  const updateUser = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEditId(null);
    setForm({ name: "", email: "" });
    fetchUsers();
  };

  //  PATCH: Update only name
  const patchUser = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name }),
    });
    setForm({ name: "", email: "" });
    fetchUsers();
  };

  // DELETE: Remove user
  const deleteUser = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    editId ? updateUser(editId) : addUser();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>React + JSON-Server CRUD</h2>

      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "20px", textAlign: "center" }}
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "2px solid #4a90e2",
        }}
      >
        <thead style={{ backgroundColor: "#4a90e2", color: "white" }}>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={tdStyle}>{u.id}</td>
              <td style={tdStyle}>{u.name}</td>
              <td style={tdStyle}>{u.email}</td>
              <td style={tdStyle}>
                <button onClick={() => deleteUser(u.id)}> Delete</button>
                <button
                  onClick={() => {
                    setEditId(u.id);
                    setForm({ name: u.name, email: u.email });
                  }}
                  style={{ marginLeft: "8px" }}
                >
                   Edit
                </button>
                <button
                  onClick={() => patchUser(u.id)}
                  style={{ marginLeft: "8px" }}
                >
                   Patch Name
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styles
const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "center",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
};

export default App;
