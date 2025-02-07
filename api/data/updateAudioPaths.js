const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "hymns_actualizado.json");

// Base URL para los archivos MP3
const baseURL = "https://ia600701.us.archive.org/27/items/h601_20241125/";

// Función principal para actualizar las rutas de audio
function updateAudioPaths() {
    try {
        // Leer el archivo JSON
        const data = fs.readFileSync(filePath, "utf-8");
        const hymns = JSON.parse(data);

        // Actualizar las rutas de audio con secuencias MP3
        hymns.forEach((hymn) => {
            hymn.audio = `${baseURL}h${hymn.numero}.mp3`;
        });

        // Guardar el archivo actualizado
        fs.writeFileSync(filePath, JSON.stringify(hymns, null, 2), "utf-8");
        console.log("Archivo actualizado con las rutas MP3.");
    } catch (error) {
        console.error("Error al actualizar las rutas de audio:", error);
    }
}

// Ejecutar el script
updateAudioPaths();
