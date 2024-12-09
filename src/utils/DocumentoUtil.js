import { StatoDocumento } from '../enum/StatoDocumento';

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

export const separatorDocumento = (stato) => {
    switch (stato) {
        case StatoDocumento.DA_COMPILARE:
            return 'border-cc-06';
        case StatoDocumento.DA_FIRMARE:
            return 'border-cc-01';
        case StatoDocumento.IN_ATTESA:
            return 'border-cc-05';
        case StatoDocumento.SCADUTO:
            return 'border-cc-03';
        case StatoDocumento.FIRMATO:
            return 'border-cc-02';
        case StatoDocumento.ANNULLATO:
            return 'border-cc-45';
        default:
            return '';
    }
}

export const scaricaDocumento = (stato) => {
    switch (stato) {
        case StatoDocumento.DA_COMPILARE:
            return 'document-icon-11';
        case StatoDocumento.DA_FIRMARE:
            return 'document-icon-1';
        case StatoDocumento.IN_ATTESA:
            return 'document-icon-7';
        case StatoDocumento.SCADUTO:
            return 'document-icon-3';
        case StatoDocumento.FIRMATO:
            return 'document-icon-2';
        case StatoDocumento.ANNULLATO:
            return 'document-icon-4';
        default:
            return '';
    }
}

