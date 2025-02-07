const fs = require('fs');
const path = require('path');

// Ruta del archivo hymns_actualizado.json (en la carpeta public/data)
const hymnsFilePath = path.join(__dirname, '../../public/data/hymns_actualizado.json'); // Ajuste de la ruta

// Leer el archivo hymns_actualizado.json
fs.readFile(hymnsFilePath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }

    // Parsear el contenido JSON
    let hymnsData = JSON.parse(data);

    // Ruta donde están los archivos de texto
    const textsFolderPath = path.join(__dirname, '../../public/textes'); // Ajuste de la ruta

    // Modificar los títulos de los himnos en el JSON
    hymnsData.forEach(hymn => {
        const hymnNumber = hymn.numero; // Asumiendo que 'numero' es el campo con el número del himno
        
        // Asegurarse de que el número tenga tres dígitos (por ejemplo, 001, 002, ...)
        const hymnTextFileName = `H${String(hymnNumber).padStart(1, '0')}.txt`; // Modificación para asegurar tres dígitos
        const hymnTextPath = path.join(textsFolderPath, hymnTextFileName);

        // Leer el archivo de texto correspondiente al himno
        fs.readFile(hymnTextPath, 'utf-8', (err, text) => {
            if (err) {
                console.error(`Error al leer el archivo de texto para el himno ${hymnNumber}:`, err);
                return;
            }

            // Extraer el título del himno del archivo de texto (buscando "Title:")
            const titleMatch = text.match(/Title:\s*(.*)/); // Buscar "Title: "
            const title = titleMatch ? titleMatch[1] : 'No Title'; // Si no se encuentra, poner 'No Title'

            // Actualizar el título en el JSON
            hymn.titulo = title;

            // Guardar el archivo actualizado
            fs.writeFile(hymnsFilePath, JSON.stringify(hymnsData, null, 2), 'utf-8', (err) => {
                if (err) {
                    console.error('Error al guardar el archivo:', err);
                } else {
                    console.log('Archivo JSON actualizado con los títulos de los himnos.');
                }
            });
        });
    });
});
