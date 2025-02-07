const fs = require('fs');

// Lee el archivo JSON
const data = JSON.parse(fs.readFileSync('api/data/hymns.json', 'utf-8'));

// Reemplaza las extensiones .midi por .mp3 en cada himno
data.forEach(hymn => {
  if (hymn.audio) {
    hymn.audio = hymn.audio.replace('.midi', '.mp3');
  }
});

// Escribe los cambios en el archivo JSON
// Escribe los cambios en el archivo JSON
fs.writeFileSync('api/data/hymns_actualizado.json', JSON.stringify(data, null, 2), 'utf-8');

console.log("Las extensiones se han cambiado de .midi a .mp3 en hymns_actualizado.json");
