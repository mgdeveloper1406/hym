const fs = require('fs');
const path = require('path');

// Ruta de la carpeta de audios en 'public/audios'
const audiosDir = path.join(__dirname, 'public', 'audios');

// Lee el contenido de la carpeta de audios
fs.readdir(audiosDir, (err, files) => {
  if (err) {
    console.error('Error al leer la carpeta de audios:', err);
    return;
  }

  files.forEach(file => {
    // Verifica que el archivo tenga el formato 'NNN.mp3'
    const match = file.match(/^(\d+)\.mp3$/);
    if (match) {
      const oldPath = path.join(audiosDir, file);
      const newFileName = `${parseInt(match[1], 10)}.mp3`; // Elimina los ceros iniciales
      const newPath = path.join(audiosDir, newFileName);

      // Renombra el archivo
      fs.rename(oldPath, newPath, err => {
        if (err) {
          console.error(`Error al renombrar el archivo ${file}:`, err);
        } else {
          console.log(`Archivo renombrado: ${file} -> ${newFileName}`);
        }
      });
    }
  });
});
