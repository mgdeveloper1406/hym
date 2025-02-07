const fs = require("fs");
const path = require("path");

// Ruta al archivo hymns_actualizado.json en public/data
const filePath = path.join(__dirname, "../../public/data/hymns_actualizado.json");

// URL base para los archivos MP3
const baseURL = "https://troisanges.org/Musique/HymnesEtLouanges/MP3/";

// Función principal para actualizar las rutas de audio
function updateAudioPaths() {
  try {
    // Leer el archivo JSON
    const data = fs.readFileSync(filePath, "utf-8");
    const hymns = JSON.parse(data);

    // Actualizar las rutas de audio
    const updatedHymns = hymns.map((hymn) => {
      const hymnNumber = hymn.numero.padStart(3, "0"); // Asegurarse de que tenga formato H001, H002...
      hymn.audio = `${baseURL}H${hymnNumber}.mp3`;
      return hymn;
    });

    // Escribir los cambios de vuelta al archivo
    fs.writeFileSync(filePath, JSON.stringify(updatedHymns, null, 2), "utf-8");
    console.log("Las rutas de audio se han actualizado correctamente.");
  } catch (error) {
    console.error("Error al actualizar las rutas de audio:", error);
  }
}

// Ejecutar el script
updateAudioPaths();
