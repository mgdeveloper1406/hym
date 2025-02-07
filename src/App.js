import React, { useState, useEffect } from 'react';
import { FaBible, FaBook, FaFemale } from 'react-icons/fa';
import AdvancedSearch from './components/AdvancedSearch';
import HymnDetails from './components/HymnDetails';
import Favorites from './components/Favorites';
import './App.css';
import background from './assets/background.jpg';

function App() {
  const [hymns, setHymns] = useState([]);
  const [selectedHymn, setSelectedHymn] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('/data/hymns_actualizado.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Himnos cargados:', data);
        setHymns(data);
      })
      .catch((error) => console.error('Error al cargar la lista de himnos:', error));
  }, []);

  const handleSearch = (term) => {
    const searchTerm = term.toLowerCase();
    const hymnByNumber = hymns.find((h) => String(h.numero) === searchTerm);
    const hymnsByKeyword = hymns.filter((h) => h.titulo?.toLowerCase().includes(searchTerm));

    if (hymnByNumber) {
      setSelectedHymn(hymnByNumber);
    } else if (hymnsByKeyword.length > 0) {
      setSelectedHymn(hymnsByKeyword[0]);
    } else {
      alert('No hymns found with the number or keyword provided.');
    }
  };

  const handleBack = () => {
    setSelectedHymn(null);
  };

  const toggleFavorites = (hymn) => {
    const alreadyFavorite = favorites.some((fav) => fav.numero === hymn.numero);
    if (alreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.numero !== hymn.numero));
    } else {
      setFavorites([...favorites, hymn]);
    }
  };

  const selectHymn = (hymn) => {
    setSelectedHymn(hymn);
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      <h1>Hymnal</h1>
      {selectedHymn ? (
        <HymnDetails hymn={selectedHymn} onBack={handleBack} toggleFavorites={toggleFavorites} favorites={favorites} />
      ) : (
        <>
          <AdvancedSearch onSearch={handleSearch} />
          <Favorites favorites={favorites} selectHymn={selectHymn} />
          <p>Enter a song number and press "Search" to see the Details.</p>
        </>
      )}

      {/* Mostrar menú solo si no hay himno seleccionado */}
      {!selectedHymn && (
        <div className="bottom-menu">
          <a href="https://bible.cjennings.dev/" target="_blank" rel="noopener noreferrer" className="menu-item">
            <FaBible size={40} color="#e9f0f5" />
          </a>
          <a href="https://sabbath-school.adventech.io/en/2025-01" target="_blank" rel="noopener noreferrer" className="menu-item">
            <FaBook size={40} color="#e9f0f5" />
          </a>
          <a href="https://bibleforwoman.netlify.app/" target="_blank" rel="noopener noreferrer" className="menu-item">
            <FaFemale size={40} color="#e9f0f5" />
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
