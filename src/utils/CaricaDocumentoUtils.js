// Funzione per ottenere la dimensione in KB
export const getFileSizeInKB = (file) => {
    if (file) {
      return (file.size / 1024).toFixed(2); // Converte la dimensione in KB e la limita a 2 decimali
    }
    return null;
  };