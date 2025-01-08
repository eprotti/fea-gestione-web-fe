import { DocumentState } from '../enum/DocumentState';

// Funzione per determinare se il documento è in scadenza (ad esempio, entro 3 giorni dalla scadenza)
export const isExpiring = (dataScadenza, stato) => {

    if ((stato == "IN_ATTESA" || stato == "SCADUTO" || stato == "FIRMATO" || stato == "ANNULLATO")) {
        return false;
    }

    const currentDate = new Date(); // Data di oggi
    const expirationDate = new Date(dataScadenza); // Data di scadenza

    // Imposta entrambi i valori a mezzanotte per ignorare le ore
    currentDate.setHours(0, 0, 0, 0);
    expirationDate.setHours(0, 0, 0, 0);

    // Calcola la differenza in giorni
    const timeDifferenceInDays = (expirationDate - currentDate) / (1000 * 3600 * 24);

    // Verifica se la scadenza è nei prossimi 3 giorni
    return timeDifferenceInDays <= 3 && timeDifferenceInDays > 0;
};

// Funzione per abbreviare il titolo se supera i 40 caratteri
export const truncateTitle = (title, maxLength = 40) => {
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
};

// Funzione per abbreviare il titolo se supera i 40 caratteri
export const truncateEmail = (email, maxLength = 20) => {
    return email.length > maxLength ? email.slice(0, maxLength) + '...' : email;
};

export const separatorDocument = (stato) => {
    switch (stato) {
        case DocumentState.DA_COMPILARE:
            return 'border-cc-06';
        case DocumentState.DA_FIRMARE:
            return 'border-cc-01';
        case DocumentState.IN_ATTESA:
            return 'border-cc-05';
        case DocumentState.SCADUTO:
            return 'border-cc-03';
        case DocumentState.FIRMATO:
            return 'border-cc-02';
        case DocumentState.ANNULLATO:
            return 'border-cc-45';
        default:
            return 'border-cc-00';
    }
}

export const downloadDocument = (stato) => {
    switch (stato) {
        case DocumentState.DA_COMPILARE:
            return 'document-icon-11';
        case DocumentState.DA_FIRMARE:
            return 'document-icon-1';
        case DocumentState.IN_ATTESA:
            return 'document-icon-7';
        case DocumentState.SCADUTO:
            return 'document-icon-3';
        case DocumentState.FIRMATO:
            return 'document-icon-2';
        case DocumentState.ANNULLATO:
            return 'document-icon-4';
        default:
            return '';
    }
}

