// Funzione per ottenere la dimensione in KB
export const getFileSizeInKB = (file) => {
    if (file) {
      return (file.size / 1024).toFixed(2); // Converte la dimensione in KB e la limita a 2 decimali
    }
    return null;
  };

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
/*     behavior: 'smooth',  // Aggiungi il comportamento "smooth" per uno scroll fluido
 */  });
};

export const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
/*     behavior: 'smooth',  // Aggiungi il comportamento "smooth" per uno scroll fluido
 */  });
};