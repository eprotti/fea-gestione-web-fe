// Funzione per abbreviare il messaggio se supera i 100 caratteri
export const truncateMessage = (message, maxLength = 100) => {
    return message.length > maxLength ? message.slice(0, maxLength) + '...' : message;
};

// Funzione per abbreviare il messaggio se supera i 60 caratteri
export const truncateVeryShortMessage = (message, maxLength = 60) => {
    return message.length > maxLength ? message.slice(0, maxLength) + '...' : message;
};