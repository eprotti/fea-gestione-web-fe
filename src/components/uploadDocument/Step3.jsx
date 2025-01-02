import React, { useState } from 'react';
import { Form as BootstrapForm, Button, Card, Col, Row } from 'react-bootstrap';
import { ErrorMessage, Field, FieldArray } from 'formik';
import { FaCheck } from 'react-icons/fa';
import { BsExclamationCircle } from 'react-icons/bs';
import { separatorDocumento } from '../../utils/documentUtil';
import FirmatarioCard from './SignatoryCard';
import ListaFirmatariCard from './SignatoryListCard';
import { addNotification } from '../../actions/notificationAction';

const Step3 = ({ values, touched, errors, setFieldValue }) => {

    // Stato per gestire quale pulsante è attivo
    const [positioning, setPositioning] = useState('automatico');

    // Funzione per clonare una firma
    const cloneFirma = (push) => {
        const newId = values.firme.length + 1;
        const newFirma = {
            id: newId,
            titolo: `Titolo firma ${newId}`,
            obbligatoria: false, // Stato iniziale dell'obbligatoria è OFF
        };
        push(newFirma); // Aggiungiamo la nuova firma alla lista tramite Formik
        setFieldValue('firme', ([...document.firme, newFirma]));
        dispatch(addNotification("Firma aggiunta", "info"));
        
    };

    const handleButtonClick = (type) => {
        setPositioning(type);
        setFieldValue('posizionamentoFirme', type);
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
                                variant={positioning === 'automatico' ? 'selected' : 'unselected'}
                                onClick={() => handleButtonClick('automatico')}
                                style={{ marginRight: '10px' }}
                            >
                                Automatico {positioning === 'automatico' && <FaCheck style={{ marginLeft: "10px" }} />}
                            </Button>

                            {/* Pulsante Manuale */}
                            <Button
                                variant={positioning === 'manuale' ? 'selected' : 'unselected'}
                                onClick={() => handleButtonClick('manuale')}
                            >
                                Manuale {positioning === 'manuale' && <FaCheck style={{ marginLeft: "10px" }} />}
                            </Button>
                        </div>

                        <Card.Text className="mt-3 py-2 px-2 card-text mb-0" style={{ background: "#efefef" }}>
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

                        <FieldArray
                            name="firme"
                            render={(arrayHelpers) => (
                                <div>
                                    {values.firme.map((firma, index) => (
                                        <div key={firma.id} className="mb-3">
                                            <Row>
                                                <Col md={8} className='mt-2'>
                                                    <BootstrapForm.Group>
                                                        <BootstrapForm.Label><strong>Titolo Firma</strong></BootstrapForm.Label>
                                                        <Field
                                                            type="text"
                                                            className={`form-control input-group ${touched.titolo && errors.titolo ? 'is-invalid' : ''}`}
                                                            placeholder="Inserisci il titolo della firma"
                                                            name={`firme[${index}].titolo`}
                                                            value={firma.titolo || ''} // Assicurati che sia una stringa vuota se non definito
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                arrayHelpers.replace(index, {
                                                                    ...firma,
                                                                    titolo: value || '', // Impostiamo il titolo come stringa vuota se non è definito
                                                                });
                                                            }}

                                                        />
                                                        <ErrorMessage name={`firme[${index}].titolo`} >
                                                            {(msg) => (
                                                                <div className="invalid-feedback d-block">
                                                                    <BsExclamationCircle /> {msg}
                                                                </div>
                                                            )}
                                                        </ErrorMessage>
                                                    </BootstrapForm.Group>
                                                </Col>
                                                <Col md={4} className='mt-2'>
                                                    <BootstrapForm.Group>
                                                        <BootstrapForm.Label>&nbsp;</BootstrapForm.Label>
                                                        <BootstrapForm.Check
                                                            type="switch"
                                                            name={`firme[${index}].obbligatoria`}
                                                            id={`switch${firma.id}`}
                                                            label={firma.obbligatoria ? "Obbligatoria" : "Non obbligatoria"}
                                                            checked={firma.obbligatoria}
                                                            onChange={() => {
                                                                arrayHelpers.replace(index, {
                                                                    ...firma,
                                                                    obbligatoria: !firma.obbligatoria,
                                                                });
                                                            }}
                                                            className='ml-5'
                                                            style={{
                                                                border: "1px solid #ddd", borderRadius: "8px", paddingLeft: "60px",
                                                                paddingTop: "10px", paddingBottom: "9px", marginRight: "0"
                                                            }}
                                                        />
                                                        <ErrorMessage name={`firme[${index}].obbligatoria`} >
                                                            {(msg) => (
                                                                <div className="invalid-feedback d-block">
                                                                    <BsExclamationCircle /> {msg}
                                                                </div>
                                                            )}
                                                        </ErrorMessage>
                                                    </BootstrapForm.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        variant='secondary'
                                        onClick={() => cloneFirma(arrayHelpers.push)} // Clona una firma
                                    >
                                        Aggiungi firma
                                    </Button>
                                </div>
                            )}
                        />

                    </div>
                </Card>

            </Col>
            <Col xs={12} md={4}>
                <FirmatarioCard />
                <ListaFirmatariCard />
            </Col>
        </Row>
    );
};

export default Step3;
