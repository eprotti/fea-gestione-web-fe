export const handleSignDocument = (navigate, codiceDocumento) => {
    navigate(`/documenti-da-firmare/firma-documento/${codiceDocumento}`);
};

export const handleViewDocument = (navigate, codiceDocumento) => {
    navigate(`dettaglio-documento/${codiceDocumento}`);
};

export const handleCompileDocument = (navigate, codiceDocumento) => {
    navigate(`/documenti-da-compilare/compila-documento/${codiceDocumento}`);
};

export const handleViewDetailDocument = (navigate, codiceDocumento) => {
    navigate(`/archivio/dettaglio-documento/${codiceDocumento}`);
};