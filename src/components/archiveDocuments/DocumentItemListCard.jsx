import React, { useState } from 'react';
import { Col, Pagination, ProgressBar, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DocumentoItemCard from './DocumentItemCard';

const DocumentItemListCard = () => {

    const dispatch = useDispatch();

    // Otteniamo lo stato dal Redux store
    const { loading, error } = useSelector((state) => state.documents);

    const filteredDocuments = useSelector((state) => state.documents.filteredDocuments);

    // Stato per la paginazione
    const [currentPage, setCurrentPage] = useState(1);
    const [documentsPerPage] = useState(10); // Puoi regolare questo valore a seconda delle tue necessità
    const totalDocuments = filteredDocuments.length; // Assuming this is the total number of documents

    // Calcolare il numero totale di pagine
    /* const totalPages = Math.ceil(totalDocuments / documentsPerPage); */
    const totalPages = 10;

    // Funzione per cambiare pagina
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calcolare gli indici di inizio e fine per i documenti da visualizzare
    const indexOfLastDocument = currentPage * documentsPerPage;
    const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
    const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);


    // Se i dati sono in caricamento, mostriamo lo spinner
    if (loading) {
        return (
            <div className='my-5 pt-5'>
                <div className="d-flex justify-content-center align-items-center pt-5" >
                    <div style={{ width: '90%', padding: '20px' }}>
                        <ProgressBar animated now={90} label="Caricamento..." />
                    </div>
                </div>
            </div>
        );
    }

    // Se c'è un errore, mostriamo un messaggio
    if (error) {
        dispatch(addNotification("Si è verificato un errore: " + error, "error"));
    }

    return (
        <Row>
            {filteredDocuments.map((doc) => (
                <Col key={doc.codiceDocumento} sm={12} md={6} lg={4}>
                    <DocumentoItemCard document={doc} />
                </Col>
            ))}

            <Pagination>
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </Row>
    );
};

export default DocumentItemListCard;
