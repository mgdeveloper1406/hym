const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'hymns_actualizado.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

data.forEach(hymn => {
  if (hymn.letra) {
    // Divide las estrofas utilizando los números de estrofa como referencia
    hymn.letra = hymn.letra.replace(/(\d+)\s/g, '\n\n$1 ').trim();
  }
});

// Guarda los cambios en el archivo JSON
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

console.log("Estrofas separadas en hymns_actualizado.json");
