import React from 'react';

function HymnList({ hymns, onSelectHymn }) {
  return (
    <div>
      {hymns.map(hymn => (
        <button key={hymn.numero} onClick={() => onSelectHymn(hymn.numero)}>
          {hymn.numero}. {hymn.titulo}
        </button>
      ))}
    </div>
  );
}

export default HymnList;
