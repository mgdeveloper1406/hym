const fs = require('fs');

// Ruta al archivo JSON de himnos
const filePath = 'api/public/audios';

// Leer el archivo JSON
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Actualizar el título y letra para cada himno
data.forEach(hymn => {
  if (hymn.letra) {
    const lines = hymn.letra.split('\n'); // Divide el texto en líneas

    // El título es la primera línea
    hymn.titulo = lines[0];

    // Remueve las primeras líneas (título y líneas vacías) de la letra
    hymn.letra = lines.slice(2).join('\n').trim();
  }
});

// Guardar los cambios en el archivo JSON
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

console.log("Títulos actualizados y letras ajustadas en hymns_actualizado.json");
