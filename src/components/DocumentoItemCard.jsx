import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { isExpiring, separatorDocumento, truncateTitle } from '../utils/DocumentoUtil';
import { handleViewDocument } from '../utils/NavigationUtil';
import { useNavigate } from 'react-router-dom';

const DocumentoItemCard = ({ document }) => {
    const navigate = useNavigate();

    const { codiceDocumento, titolo, dataInserimento, dataScadenza, stato } = document;

    return (
        <Card className="mb-4 shadow">
            <Card.Body className='px-3 py-3'>
                <Card.Title>
                    <div className='d-flex'>
                        <div style={{ width: "100%" }}>{truncateTitle(titolo)}</div>
                        {isExpiring(dataScadenza, stato) && (
                            <div className='document-item-toexpire' style={{ margin: "0", whiteSpace: "nowrap" }}>In scadenza</div>
                        )}
                    </div>
                </Card.Title>
                <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento(stato)}`} />
                <Card.Text>
                    <strong>Data Inserimento:</strong> {new Date(dataInserimento).toLocaleDateString()}<br />
                    <strong>Data Scadenza:</strong> {new Date(dataScadenza).toLocaleDateString()}<br />
                    <strong>Stato:</strong> {stato}
                </Card.Text>

                <Button onClick={() => handleViewDocument(navigate, codiceDocumento)} variant="primary">Dettaglio</Button>
            </Card.Body>
        </Card>
    );
};

export default DocumentoItemCard;
