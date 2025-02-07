import React, { useState, useEffect } from 'react';

function Favorites({ favorites, selectHymn }) {
  const [titles, setTitles] = useState({});

  useEffect(() => {
    // Cargar los títulos de los himnos desde los archivos de texto
    const loadTitles = async () => {
      const newTitles = {};

      for (let hymn of favorites) {
        try {
          const response = await fetch(`/textes/H${hymn.numero}.txt`);
          const text = await response.text();

          // Extraer el título del archivo de texto
          const titleMatch = text.match(/Title:\s*(.*)/);
          newTitles[hymn.numero] = titleMatch ? titleMatch[1] : 'No Title';
        } catch (error) {
          console.error(`Error al cargar el archivo para el himno ${hymn.numero}:`, error);
          newTitles[hymn.numero] = 'No Title';
        }
      }

      setTitles(newTitles);
    };

    loadTitles();
  }, [favorites]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h3 style={{
        color: '#FFFFFF',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        marginBottom: '15px'
      }}>
        Your favorite songs
      </h3>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        color: '#FFFFFF',
        fontSize: '18px',
        lineHeight: '1.8',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)'
      }}>
        {favorites.map(hymn => (
          <li key={hymn.numero} style={{ marginBottom: '10px' }}>
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#ADD8E6', // Azul claro
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '18px',
              }}
              onClick={() => selectHymn(hymn)}
            >
              {hymn.numero} - {titles[hymn.numero] || "Sans Titre"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
