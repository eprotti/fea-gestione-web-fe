import React from 'react';
import { Card, Col, ProgressBar, Row } from 'react-bootstrap';
import { FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNotification } from '../actions/notificationAction';
import { isExpiring, separatorDocumento, truncateTitle } from '../utils/documentUtil';
import { handleViewDocument } from '../utils/navigationUtil';

const LastDocumentUploadedCard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Otteniamo lo stato dal Redux store
    const { documents, loading, error } = useSelector((state) => state.documents);
    // Selezioniamo solo i primi 3 documenti
    const filteredDocuments = documents.slice(0, 3);

    const cardTitle = () => {
        return <h3 style={{ marginTop: "30px" }}>Ultimi documenti caricati</h3>
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
        <div>
            {Array.isArray(filteredDocuments) && filteredDocuments.length > 0 ? (
                filteredDocuments.map((documento, index) => (
                    <Card key={index} className="shadow">
                        <Card.Body className='px-3 py-3 pb-3 my-0'>
                            <Card.Title>
                                <div className='d-flex'>
                                    <div style={{ width: "100%" }}>{truncateTitle(documento.titolo)}</div>
                                    {isExpiring(documento.dataScadenza, documento.stato) && (
                                        <div className='document-item-toexpire' style={{ margin: "0", whiteSpace: "nowrap" }}>In scadenza</div>
                                    )}
                                </div>
                            </Card.Title>
                            <hr className={`thin-color-separator pb-1 mt-2 ${separatorDocumento(documento.stato)}`} />
                            <Row>
                                <Col xs={12} lg={7}>
                                    <strong>Data Inserimento:</strong> {new Date(documento.dataInserimento).toLocaleDateString()}<br />
                                    <strong>Stato:</strong> {documento.stato}
                                </Col>
                                <Col xs={12} lg={5}>
                                    <div style={{ display: "block", textAlign: "right", paddingTop: "24px" }}>
                                        <a onClick={() => handleViewDocument(navigate, documento.codiceDocumento)} rel="noopener noreferrer" style={{ textAlign: "right", cursor: "pointer", /* whiteSpace: "nowrap" */ }}>
                                            Vedi dettaglio <FaChevronRight size={20} />
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>Nessun documento trovato.</p>
            )}
        </div >
    </>
    );
};

export default LastDocumentUploadedCard;
