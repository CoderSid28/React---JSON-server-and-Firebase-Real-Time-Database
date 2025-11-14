import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // ✅ Real working public API endpoint
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Conditional rendering
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error-message">❌ Error: {error}</div>;
  }

  return (
    <div className="data-container" style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Users Loaded Successfully:</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          border: "2px solid #4a90e2",
        }}
      >
        <thead style={{ backgroundColor: "#4a90e2", color: "white" }}>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>City</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((user) => (
              <tr key={user.id}>
                <td style={tdStyle}>{user.id}</td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.address.city}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

// Table styling
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

export default DataFetcher;
