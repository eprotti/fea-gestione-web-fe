import React from 'react';
import SignatureList from './SignatureList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, Col, Row } from 'react-bootstrap';
import { separatorDocumento } from '../utils/DocumentoUtil';
import PdfWithDrop from './PdfWithDrop';

const Step4 = () => {
    const signatures = [
        { id: 1, name: 'Titolo firma 1' },
        { id: 2, name: 'Titolo firma 2' },
        { id: 3, name: 'Titolo firma 3' },
    ];

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <Row>
                    <Col xs={12} md={8}>
                        <Card className="mb-4 custom-card">
                            <div className="card-body px-4 pb-4" style={{ minHeight: "890px" }}>
                                <Card.Subtitle className="mb-2 text-muted py-1 card-subtitle h6">
                                    <h5 className="m-a-0 text-uppercase light mt-1 mb-0">File PDF</h5>
                                </Card.Subtitle>

                                <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

                                <PdfWithDrop />
                            </div>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <SignatureList signatures={signatures} />
                    </Col>
                </Row>
            </div>
        </DndProvider>
    );
};

export default Step4;
