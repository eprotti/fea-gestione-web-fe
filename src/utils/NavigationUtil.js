
export const handleViewDocument = (navigate, codiceDocumento) => {
    navigate(`/archivio/dettaglio-documento/${codiceDocumento}`);
};

export const handleUploadDocument = (navigate) => {
    navigate("/gestione-documento/carica");
}