import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { separatorDocumento } from '../../utils/documentUtil';
import PdfViewer from './PdfViewer';
import SignatureList from './SignatureList';

const Step4 = () => {
    const availableSignatures = useSelector(state => state.signatures.availableSignatures);
    // Filtra le firme per la pagina corrente
    const availableSignaturesNotPlaced = availableSignatures.filter(
        signature => signature.placed==false
    );

    return (
        <Row>
            <Col xs={12} md={8} className="pdf-area">
                <PdfViewer file="/TEST_PAGE2.pdf" />
            </Col>
            <Col xs={12} md={4} className="signature-area">
                <Card className="mb-4 custom-card">
                    <div className="card-body px-4 pb-4">
                        <Card.Subtitle className="mb-2 text-muted py-1">
                            <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Firme</h5>
                        </Card.Subtitle>
                        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

                            <SignatureList signatures={availableSignaturesNotPlaced} />
                    </div>
                </Card>
            </Col>
        </Row>
    );
};

export default Step4;
