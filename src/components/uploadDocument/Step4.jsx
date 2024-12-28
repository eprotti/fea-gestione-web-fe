import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { separatorDocumento } from '../../utils/documentUtil';
import PdfViewer from './PdfViewer';
import SignatureList from './SignatureList';

const Step4 = () => {
    const availableSignatures = useSelector(state => state.signatures.availableSignatures);
    // Filtra le firme per la pagina corrente
    const availableSignaturesNotPlaced = availableSignatures.filter(
        signature => signature.placed == false
    );

    // Stato per gestire la visibilità della colonna destra
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    // Funzione per togglare la visibilità della colonna destra
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <Row>
            <Col xs={12} md={8} className="pdf-area">
                <a className="btn btn-primary mb-4" onClick={toggleSidebar}>
                    {isSidebarVisible ? 'Nascondi Menu' : 'Mostra Menu'}
                </a>
                <PdfViewer file="/TEST_PAGE2.pdf" />
            </Col>
            {/* Colonna destra fissa che si sovrappone */}
            <div
                className={`signature-area col-3 p-0 bg-dark text-white ${isSidebarVisible ? '' : 'd-none'}`}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1000, // Assicura che la sidebar stia sopra il contenuto
                    transition: 'transform 0.3s ease',
                    transform: isSidebarVisible ? 'translateX(0)' : 'translateX(-100%)', // Anima la comparsa/nascita della sidebar
                }}
            >
                <Card className="mb-4 custom-card">
                    <div className="card-body px-4 pb-4">
                        <Card.Subtitle className="mb-2 text-muted py-1">
                            <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Firme</h5>
                        </Card.Subtitle>
                        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

                        <SignatureList signatures={availableSignaturesNotPlaced} />
                    </div>
                </Card>
            </div>

        </Row >
    );
};

export default Step4;
