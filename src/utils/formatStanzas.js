// Archivo: src/utils/formatStanzas.js

function formatStanzas(lyrics) {
    // Dividir el texto en líneas y asegurarse de que se preserve cada línea
    const lines = lyrics.split('\n');
    let formatted = '';

    for (const line of lines) {
        // Verificar si la línea es solo un número de estrofa
        if (/^\d+$/.test(line.trim())) {
            formatted += `<strong>${line.trim()}</strong><br/>`; // Número de estrofa en negrita
        } else {
            formatted += `${line.trim()}<br/>`; // Texto normal con salto de línea
        }
    }

    return formatted;
}

export default formatStanzas;
