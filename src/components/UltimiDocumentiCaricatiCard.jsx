import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNotification } from '../actions/NotificationActions';
import { isExpiring, truncateTitle } from '../utils/DocumentoUtil';
import { handleViewDocument } from '../utils/NavigationUtil';

const UltimiDocumentiCaricatiCard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Otteniamo lo stato dal Redux store
    const { documents, loading, error } = useSelector((state) => state.documents);
    // Selezioniamo solo i primi 3 documenti
    const filteredDocuments = documents.slice(0, 3);

    const cardTitle = () => {
        return <h3 className="mt-4">Ultimi documenti caricati</h3>
    };

    // Se i dati sono in caricamento, mostriamo lo spinner
    if (loading) {
        return (<>
            {cardTitle()}
            <div className='my-5 pt-5'>
                <div className="d-flex justify-content-center align-items-center" >
                    <div style={{ width: '80%', padding: '20px' }}>
                        <ProgressBar animated now={60} label="Caricamento..." />
                    </div>
                </div>
            </div>
        </>
        );
    }

    // Se c'è un errore, mostriamo un messaggio
    if (error) {
        dispatch(addNotification("Si è verificato un errore: " + error, "error"));
    }

    return (<>
        {cardTitle()}
        <div className="document-list">
            {Array.isArray(filteredDocuments) && filteredDocuments.length > 0 ? (
                filteredDocuments.map((documento, index) => (
                    <div key={index} className="document-item">
                        <div className="document-item-title">
                            <h5 style={{ marginTop: "0" }}>{truncateTitle(documento.titolo)}</h5>
                            {isExpiring(documento.dataScadenza, documento.stato) && (
                                <div className='document-item-toexpire'>In scadenza</div>
                            )}
                        </div>


                        <div>Data di caricamento: {documento.dataInserimento}</div>
                        <div>Stato: {documento.stato}</div>
                        <div style={{ display: "block", textAlign: "right" }}>
                            <a onClick={() => handleViewDocument(navigate, documento.codiceDocumento)} rel="noopener noreferrer" style={{ textAlign: "right", cursor: "pointer" }}>
                                Vedi dettaglio <FaChevronRight size={20} />
                            </a>
                        </div>
                    </div>
                ))
            ) : (
                <p>Nessun documento trovato.</p>
            )}
        </div>
    </>
    );
};

export default UltimiDocumentiCaricatiCard;
