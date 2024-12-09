import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaCalendar, FaChevronRight, FaEye, FaFileAlt, FaFileSignature, FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import StatoDocumento from '../enum/StatoDocumento';
import { isExpiring, separatorDocumento } from '../utils/DocumentoUtil';
import { handleCompileDocument, handleSignDocument, handleViewDocument } from '../utils/NavigationUtil';

const DocumentoCard = ({ codiceDocumento, titolo, descrizione, dataInserimento, dataScadenza, stato }) => {

    const navigate = useNavigate();

    return (
        <Card className="mb-4 custom-card">
            <Card.Body>
                {/* Aggiungi il badge in alto a destra se il documento è in scadenza */}
                {isExpiring(dataScadenza, stato) && (
                    <div className="expiring-badge pulse-expire-animation">In scadenza</div>
                )}

                <Card.Subtitle className="mb-2 text-muted p-y-1">
                    <span style={{ whiteSpace: "nowrap", marginRight: '10px' }}><FaCalendar /> Inserito il: {new Date(dataInserimento).toLocaleDateString()}</span> <span style={{ whiteSpace: "nowrap" }}><FaCalendar /> Scadenza: {new Date(dataScadenza).toLocaleDateString()}</span>
                </Card.Subtitle>

                <hr className={`thin-color-separator pb-2 mt-3 ${separatorDocumento(stato)}`} />
                
                <Card.Title>{titolo}</Card.Title>
                <Card.Text>{descrizione}</Card.Text>

                {stato == StatoDocumento.DA_COMPILARE &&
                    <Button onClick={() => handleCompileDocument(navigate, codiceDocumento)} variant="primary" className="btn-firma">
                        Compila documento <FaFileAlt className="ml-2" />
                    </Button>}

                {stato == StatoDocumento.DA_FIRMARE &&
                    <Button onClick={() => handleSignDocument(navigate, codiceDocumento)} variant="primary" className="btn-firma">
                        Firma documento <FaFileSignature className="ml-2" />
                    </Button>}

                {(stato == StatoDocumento.IN_ATTESA || stato == StatoDocumento.SCADUTO || stato == StatoDocumento.FIRMATO || stato == StatoDocumento.ANNULLATO) &&
                    <Button onClick={() => handleViewDocument(navigate, codiceDocumento)} variant="primary" className="btn-firma">
                        Dettaglio documento <FaEye className="ml-2" />
                    </Button>}

                {(stato != StatoDocumento.IN_ATTESA && stato != StatoDocumento.SCADUTO && stato != StatoDocumento.FIRMATO && stato != StatoDocumento.ANNULLATO) &&
                    <div className="text-end mt-3">
                        <a onClick={() => handleViewDocument(navigate, codiceDocumento)} rel="noopener noreferrer" style={{ cursor: "pointer" }} className="mt-3 d-block text-primary">
                            Vedi dettaglio documento <FaChevronRight />
                        </a>
                    </div>}

            </Card.Body>
        </Card>
    );
};

export default DocumentoCard;
