import React, { useEffect, useState } from 'react';

const HymnDetails = ({ hymn, onBack, toggleFavorites, favorites }) => {
    const [hymnLyrics, setHymnLyrics] = useState(''); // Estado para las letras del himno
    const [title, setTitle] = useState(''); // Estado para el título
    const isFavorite = favorites.some((fav) => fav.numero === hymn.numero);

    // Cargar la letra y título desde la carpeta textes
    useEffect(() => {
        const loadHymnDetails = async () => {
            try {
                const response = await fetch(`/textes/H${hymn.numero}.txt`); // Ajusta la ruta si es necesario
                let text = await response.text();

                // Extraer el título del texto (si está presente) y eliminar otras partes
                const titleMatch = text.match(/Title:\s*(.*)/); // Buscar "Title: "
                const titleText = titleMatch ? titleMatch[1] : 'No Title';

                // Filtrar las líneas que no queremos (Author, Copyright, CCLI, Hymnal, etc.)
                text = text.replace(/(Author:.*|Copyright:.*|CCLI:.*|Hymnal:.*|PlayOrder:.*|Title:.*)/g, '').trim();

                setTitle(titleText); // Establecer el título
                setHymnLyrics(text); // Actualizar la letra (ya sin las partes no deseadas)
            } catch (error) {
                console.error('Error al cargar el archivo del himno:', error);
                setHymnLyrics('Erreur lors du chargement des paroles.');
            }
        };

        loadHymnDetails();
    }, [hymn.numero]);

    return (
        <div className="hymn-details">
            <header className="hymn-header">
                <button onClick={onBack} className="btn btn-back">Back</button>
                <audio controls>
                    <source src={`/audios/${hymn.audio}`} type="audio/mpeg" />
                    Votre navigateur ne prend pas en charge l'élément audio.
                </audio>
            </header>
            {/* Mostrar el título solo una vez */}
            <div className="hymn-meta">
                {title && <h2>{title}</h2>} {/* Mostrar el título */}
            </div>
            <pre className="hymn-lyrics">{hymnLyrics}</pre> {/* Mostrar las letras */}
            <div className="actions">
                <button onClick={() => toggleFavorites(hymn)} className="btn btn-favorite">
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        </div>
    );
};

export default HymnDetails;
