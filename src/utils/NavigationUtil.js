
export const handleViewDocument = (navigate, codiceDocumento) => {
    navigate(`/archivio/dettaglio-documento/${codiceDocumento}`);
};

export const handleUploadDocument = (navigate) => {
    navigate("/gestione-documento/carica");

}

export const handleContactsList = (navigate) => {
    navigate("/rubrica/lista-contatti");
}

export const handleArchiveDocument = (navigate) => {
    navigate("/archivio-documenti/lista-documenti");
}

export const handleManageTemplate = (navigate) => {
    navigate("/gestione-template/crea");
}


