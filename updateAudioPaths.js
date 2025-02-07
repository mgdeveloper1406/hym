const fs = require('fs');
const path = require('path');

// Ruta del archivo hymns_actualizado.json (en la carpeta public/data)
const hymnsFilePath = path.join(__dirname, 'public', 'data', 'hymns_actualizado.json');

// Leer el archivo hymns_actualizado.json
fs.readFile(hymnsFilePath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }

    // Parsear el contenido JSON
    let hymnsData = JSON.parse(data);

    // Modificar los enlaces de audio en el JSON
    hymnsData.forEach(hymn => {
        // Verificar si la ruta de audio contiene '/audios/'
        if (hymn.audio && hymn.audio.startsWith("/audios/")) {
            // Eliminar '/audios/' y dejar solo el número con la extensión
            const newAudioPath = hymn.audio.replace('/audios/', ''); // Reemplaza '/audios/' con una cadena vacía
            hymn.audio = newAudioPath; // Actualizar la ruta del audio en el objeto
        }
    });

    // Guardar el archivo actualizado
    fs.writeFile(hymnsFilePath, JSON.stringify(hymnsData, null, 2), 'utf-8', (err) => {
        if (err) {
            console.error('Error al guardar el archivo:', err);
        } else {
            console.log('Archivo JSON actualizado con las nuevas rutas de audio.');
        }
    });
});
