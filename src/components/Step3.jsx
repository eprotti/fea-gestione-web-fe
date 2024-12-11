import { ErrorMessage, Field } from 'formik';
import React, { useState } from 'react';
import { Form as BootstrapForm, Button, Card, Col, Row } from 'react-bootstrap';
import { BsExclamationCircle } from 'react-icons/bs'; // Icona di errore
import { separatorDocumento } from '../utils/DocumentoUtil';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa';

const Step3 = ({ touched, errors, setFieldValue }) => {

    const dispatch = useDispatch();

    /* Documento da caricare */
    const document = useSelector((state) => state.document);

    // Stato per gestire quale pulsante è attivo
    const [positioning, setPositioning] = useState('automatico');
    const [isMandatory, setMandatory] = useState('y');

    const handleButtonClick = (type) => {
        setPositioning(type);
    };

    const handleSwitchChange = () => {
        setMandatory(!isMandatory); // Cambia lo stato da automatico a manuale
    };

    // Stato per gestire le righe
    const [rows, setRows] = useState([
        { id: 1, title: 'Titolo Firma 1', isRequired: true },
    ]);

    // Funzione per clonare la riga
    const handleCloneRow = () => {
        const newRow = {
            id: rows.length + 1,  // Incrementa l'ID per garantire unicità
            title: `Titolo Firma ${rows.length + 1}`,
            isRequired: true,
        };
        setRows([...rows, newRow]);  // Aggiungi la nuova riga all'array
    };

    return (
        <>
            <Card className="mb-4 custom-card">
                <div className="card-body px-4 pb-4">
                    <Card.Subtitle className="mb-2 text-muted py-1">
                        <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Posizionamento firme grafiche</h5>
                    </Card.Subtitle>
                    <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

                    <div className='d-flex'>
                        {/* Pulsante Automatico */}
                        <Button
                            variant={positioning === 'automatico' ? 'primary' : 'secondary'}
                            onClick={() => handleButtonClick('automatico')}
                            style={{ marginRight: '10px' }}
                        >
                            Automatico {positioning === 'automatico' && <FaCheck style={{ marginLeft: "10px" }} />}
                        </Button>

                        {/* Pulsante Manuale */}
                        <Button
                            variant={positioning === 'manuale' ? 'primary' : 'secondary'}
                            onClick={() => handleButtonClick('manuale')}
                        >
                            Manuale {positioning === 'manuale' && <FaCheck style={{ marginLeft: "10px" }} />}
                        </Button>
                    </div>

                    <Card.Text className="mt-3">
                        Tipo di posizionamento selezionato: <strong style={{ textTransform: "uppercase" }}>{positioning}</strong>
                    </Card.Text>
                </div>
            </Card>
            <Card className="mb-4 custom-card">
                <div className="card-body px-4 pb-4">
                    <Card.Subtitle className="mb-2 text-muted py-1">
                        <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Lista firme</h5>
                    </Card.Subtitle>
                    <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

                    {/* Mappiamo le righe esistenti */}
                    {rows.map((row, index) => (
                        <Row key={row.id} className="mb-3">
                            <Col md={10}>
                                <BootstrapForm.Group controlId={`title_${row.id}`}>
                                    <BootstrapForm.Label>{row.title}</BootstrapForm.Label>
                                    <BootstrapForm.Control
                                        type="text"
                                        placeholder="Inserisci il nome"
                                        required={row.isRequired}
                                    />
                                </BootstrapForm.Group>
                            </Col>

                            <Col md={2}>
                                <BootstrapForm.Group controlId={`required_${row.id}`}>
                                    <BootstrapForm.Label></BootstrapForm.Label>
                                    <BootstrapForm.Check
                                        type="switch"
                                        id="custom-switch"
                                        label={"obbligatoria"}
                                        checked={isMandatory}
                                        onChange={handleSwitchChange}
                                        className='pt-3'
                                    />
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                    ))}

                    {/* Bottone per clonare la riga */}
                    <Button variant="secondary" onClick={handleCloneRow}>
                        Aggiungi una firma
                    </Button>

                </div>
            </Card>

        </>
    );
};

export default Step3;
