import React from 'react';

const Spinner = () => {
  return (
    <div style={spinnerContainer}>
      <div style={spinner}></div>
      <p>Loading data...</p>
    </div>
  );
};

// Inline styles
const spinnerContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  color: '#333',
};

const spinner = {
  border: '6px solid #f3f3f3',
  borderTop: '6px solid #3498db',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  animation: 'spin 1s linear infinite',
  marginBottom: '10px',
};

// Add CSS keyframes dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);

export default Spinner;
