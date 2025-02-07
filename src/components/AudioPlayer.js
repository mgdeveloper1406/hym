// components/AudioPlayer.js
import React from 'react';

function AudioPlayer({ title, audioSrc, onSearch }) {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSearch = () => {
    if (onSearch) onSearch(inputValue);
  };

  return (
    <div style={styles.container}>
      <input 
        type="number" 
        placeholder="Número de Himno" 
        value={inputValue} 
        onChange={handleInputChange} 
        style={styles.input} 
      />
      <button onClick={handleSearch} style={styles.button}>Buscar</button>
      <div style={styles.title}>{title || "Título del Himno"}</div>
      <audio controls style={styles.audioPlayer}>
        <source src={audioSrc} type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003366',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    width: '90%',
    maxWidth: '500px',
    margin: '20px auto',
    color: '#ffffff',
  },
  input: {
    width: '80px',
    height: '30px',
    textAlign: 'center',
    fontSize: '16px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#3399cc',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  title: {
    flex: 1,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  audioPlayer: {
    marginLeft: '10px',
  },
};

export default AudioPlayer;
