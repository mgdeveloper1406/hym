import React, { useState } from 'react';

function AdvancedSearch({ hymns, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      alert('Veuillez entrer un numéro ou un mot clé.');
      return;
    }
    onSearch(searchTerm.trim().toLowerCase()); // Convertir a minúsculas
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>Search for Songs by Number or Word</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter the number or a keyword"
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '70%',
          marginBottom: '10px',
        }}
      />
      <br />
      <button
        onClick={handleSearch}
        style={{
          backgroundColor: '#007BFF',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Research
      </button>
    </div>
  );
}

export default AdvancedSearch;
