const fs = require("fs");
const path = require("path");

// Rutas de los archivos
const hymnsPath = path.join(__dirname, "hymns.json"); // Archivo base con letras
const updatedHymnsPath = path.join(__dirname, "hymns_actualizado.json"); // Archivo con las pistas de audio

const mergeAudioTracks = () => {
  try {
    // Leer ambos archivos
    const hymns = JSON.parse(fs.readFileSync(hymnsPath, "utf-8"));
    const updatedHymns = JSON.parse(fs.readFileSync(updatedHymnsPath, "utf-8"));

    // Fusionar las pistas de audio en hymns.json
    const mergedHymns = hymns.map((hymn) => {
      const matchingUpdatedHymn = updatedHymns.find((uHymn) => uHymn.numero === hymn.numero);
      return {
        ...hymn,
        audio: matchingUpdatedHymn ? matchingUpdatedHymn.audio : hymn.audio, // Tomar el audio de hymns_actualizado
      };
    });

    // Escribir el archivo actualizado
    fs.writeFileSync(hymnsPath, JSON.stringify(mergedHymns, null, 2));
    console.log("¡Pistas de audio fusionadas correctamente en hymns.json!");
  } catch (error) {
    console.error("Error al fusionar las pistas de audio:", error);
  }
};

mergeAudioTracks();
