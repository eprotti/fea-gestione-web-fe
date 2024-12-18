// Funzione per abbreviare il messaggio se supera i 100 caratteri
export const truncateNominativo = (nominativo, maxLength = 100) => {
    return nominativo.length > maxLength ? nominativo.slice(0, maxLength) + '...' : nominativo;
};

// Funzione per abbreviare il messaggio se supera i 60 caratteri
export const truncateVeryShortNominativo = (nominativo, maxLength = 20) => {
    return nominativo.length > maxLength ? nominativo.slice(0, maxLength) + '...' : nominativo;
};
