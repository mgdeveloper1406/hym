const fs = require('fs');
const path = require('path');

// Ruta de la carpeta donde se encuentran los archivos de audio
const audioFolder = path.join(__dirname, 'public', 'audios');

// Cargar el archivo JSON que contiene los himnos
const hymnsFile = path.join(__dirname, 'api', 'data', 'hymns.json');

// Leer el contenido del archivo JSON
fs.readFile(hymnsFile, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo JSON:', err);
        return;
    }

    // Convertir el contenido del JSON a un objeto
    let hymns = JSON.parse(data);

    // Actualizar la URL de cada himno con la nueva ruta local
    hymns.forEach(hymn => {
        // Suponiendo que el campo 'audio' tiene la URL que queremos reemplazar
        const hymnNumber = hymn.numero.padStart(3, '0');  // Asegurar que el número tenga 3 dígitos
        const newAudioUrl = path.join(audioFolder, `${hymnNumber}.mp3`);  // Nueva ruta del archivo mp3

        hymn.audio = newAudioUrl;
    });

    // Guardar los cambios en el archivo JSON
    fs.writeFile(hymnsFile, JSON.stringify(hymns, null, 2), 'utf-8', (err) => {
        if (err) {
            console.error('Error al escribir el archivo JSON:', err);
        } else {
            console.log('Archivo JSON actualizado con las nuevas URLs de los audios');
        }
    });
});
