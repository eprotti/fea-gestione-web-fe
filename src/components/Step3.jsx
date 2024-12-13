import React, { useState } from 'react';
import { Form as BootstrapForm, Button, Card, Col, Row } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addFirma } from '../slices/caricaDocumentoSlice';
import { separatorDocumento } from '../utils/DocumentoUtil';
import FirmatarioCard from './FirmatarioCard';
import { ErrorMessage, Field } from 'formik';

const Step3 = ({ touched, errors, setFieldValue, isSubmitting }) => {

    const dispatch = useDispatch();

    /* Documento da caricare */
    const document = useSelector((state) => state.document);

    // Stato per gestire quale pulsante è attivo
    const [positioning, setPositioning] = useState('automatico');

    const handleButtonClick = (type) => {
        setPositioning(type);
        setFieldValue('posizionamentoFirme', type);
    };

    // Stato per gestire le righe
    const [firme, setFirme] = useState([
        { id: 1, titolo: 'Titolo Firma 1', obbligatoria: true },
    ]);

    // Funzione per clonare la riga
    const handleCloneRow = () => {
        const newFirma = {
            id: firme.length + 1,  // Incrementa l'ID per garantire unicità
            titolo: `Titolo Firma ${firme.length + 1}`,
            obbligatoria: true,
        };
        setFirme([...firme, newFirma]);  // Aggiungi la nuova riga all'array
        dispatch(addFirma(newFirma));
        setFieldValue('firme', ([...document.firme, newFirma]));
    };

    return (
        <Row>
            <Col xs={12} md={8}>

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

                        <Card.Text className="mt-3 py-2 px-2 card-text mb-0" style={{background: "#efefef"}}>
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
                        {firme.map((firma, index) => (
                            <Row key={index} className="mb-3">
                                <Col md={9}>
                                    <BootstrapForm.Group className='mb-2'>
                                        <BootstrapForm.Label><strong>Titolo</strong></BootstrapForm.Label>
                                        <Field type="text" name={`firme[${index}].titolo`} className={`form-control input-group>${touched.titolo && errors.titolo ? 'is-invalid' : ''}`} placeholder="Inserisci il titolo" />
                                        <ErrorMessage name={`firme[${index}].titolo`}>
                                            {(msg) => (
                                                <div className="invalid-feedback d-block">
                                                    <BsExclamationCircle /> {msg}
                                                </div>
                                            )}
                                        </ErrorMessage>
                                    </BootstrapForm.Group>
                                </Col>

                                <Col md={3}>
                                    <BootstrapForm.Group>
                                        <BootstrapForm.Label></BootstrapForm.Label>
                                        <BootstrapForm.Check
                                            type="switch"
                                            id="custom-switch"
                                            name={`firme[${index}].obbligatoria`}
                                            label={firma.obbligatoria?"obbligatoria":"non obbligatoria"}
                                            onChange={() =>
                                                setFieldValue(`firme[${index}].obbligatoria`, !firma.obbligatoria)
                                            }
                                            checked={firma.obbligatoria} // Check if switch is on or off
                                            className='pt-3'
                                        />
                                        <ErrorMessage name={`firme[${index}].obbligatoria`}>
                                            {(msg) => (
                                                <div className="invalid-feedback d-block">
                                                    <BsExclamationCircle /> {msg}
                                                </div>
                                            )}
                                        </ErrorMessage>
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

            </Col>
            <Col xs={12} md={4}>
                <FirmatarioCard />
            </Col>
        </Row>
    );
};

export default Step3;
