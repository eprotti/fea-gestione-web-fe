import { ErrorMessage, Field } from 'formik';
import React, { useRef, useState } from 'react';
import { Form as BootstrapForm, Button, Card, Col, Row } from 'react-bootstrap';
import { BsExclamationCircle } from 'react-icons/bs'; // Icona di errore
import { FaCheck, FaFilePdf, FaTrash } from 'react-icons/fa';
import { getFileSizeInKB } from '../utils/CaricaDocumentoUtils';
import { separatorDocumento } from '../utils/DocumentoUtil';
import AutoreDocumentoCard from './AutoreDocumentoCard';
import InfoDatiGeneraliCard from './InfoDatiGeneraliCard';
import { addNotification } from '../actions/NotificationActions';
import { useDispatch } from 'react-redux';

const Step1 = ({ values, touched, errors, setFieldValue, isSubmitting }) => {

    const dispatch = useDispatch();

    const fileInputRef = useRef(null); // Riferimento all'input di tipo file

    const [tipologiaFirma, setTipologiaFirma] = useState('SINGOLO_FIRMATARIO');
    const [isMarcaTemporale, setMarcaTemporale] = useState('y');

    const handleTipologiaFirmaButtonClick = (type) => {
        setFieldValue('tipologiaFirma', type);
        setTipologiaFirma(type);
    };

    const handleMarcaTemporaleSwitchChange = () => {
        setFieldValue('marcaTemporale', isMarcaTemporale);
        setMarcaTemporale(!isMarcaTemporale); // Cambia lo stato da on a off
    };

    // Gestore per il cambiamento del file
    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0]; // Ottieni il file selezionato
        setFieldValue('pdfFile', file); // Imposta il valore del campo 'file' in Formik
        dispatch(addNotification("File PDF caricato correttamente", "info"));
    };

    // Funzione per cancellare il contenuto del campo file
    const handleResetFile = () => {
        setFieldValue('pdfFile', null); // Resetta il campo 'file' a null
        fileInputRef.current.value = ''; // Cancella visivamente il file nell'input (usando il ref)
    };

    const dateInputRef = useRef(null);

    // Funzione per forzare l'apertura del calendario
    const handleFocus = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker(); // Metodo per aprire il calendario
        }
    };

    return (
        <Row>
            <Col xs={12} md={8}>
                <Card className="mb-4 custom-card">
                    <div className="card-body px-4 pb-4">
                        <Card.Subtitle className="mb-2 text-muted py-1">
                            <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Scheda documento</h5>
                        </Card.Subtitle>
                        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

                        <BootstrapForm.Group className='mb-2'>
                            <BootstrapForm.Label><strong>Tipologia Firma</strong></BootstrapForm.Label>
                            <div className='d-flex'>
                                {/* Pulsante Firma Singola */}
                                <Button
                                    variant={tipologiaFirma === 'SINGOLO_FIRMATARIO' ? 'selected' : 'unselected'}
                                    onClick={() => handleTipologiaFirmaButtonClick('SINGOLO_FIRMATARIO')}
                                    style={{ marginRight: '10px' }}
                                >
                                    Singolo firmatario {tipologiaFirma === 'SINGOLO_FIRMATARIO' && <FaCheck style={{ marginLeft: "10px" }} />}
                                </Button>

                                <Button
                                    variant={tipologiaFirma === 'MULTI_FIRMATARIO' ? 'selected' : 'unselected'}
                                    onClick={() => handleTipologiaFirmaButtonClick('MULTI_FIRMATARIO')}
                                    style={{ marginRight: '10px' }}
                                >
                                    Multi firmatario {tipologiaFirma === 'MULTI_FIRMATARIO' && <FaCheck style={{ marginLeft: "10px" }} />}
                                </Button>
                            </div>

                            <Card.Text className="mt-3 py-2 px-2 card-text mb-0" style={{ background: "#efefef" }}>
                                Tipologia di firma selezionata: <strong style={{ textTransform: "uppercase" }}>{tipologiaFirma}</strong>
                            </Card.Text>
                        </BootstrapForm.Group>

                        <hr />

                        <BootstrapForm.Group className='mb-2'>
                            <BootstrapForm.Label><strong>Titolo</strong></BootstrapForm.Label>
                            <Field type="text" name="titolo" className={`form-control input-group ${touched.titolo && errors.titolo ? 'is-invalid' : ''}`} placeholder="Inserisci il titolo" />
                            <ErrorMessage name="titolo">
                                {(msg) => (
                                    <div className="invalid-feedback d-block">
                                        <BsExclamationCircle /> {msg}
                                    </div>
                                )}
                            </ErrorMessage>
                        </BootstrapForm.Group>

                        <BootstrapForm.Group>
                            <BootstrapForm.Label><strong>Descrizione</strong></BootstrapForm.Label>
                            <Field
                                as="textarea"
                                name="descrizione"
                                className={`form-control input-group ${touched.descrizione && errors.descrizione ? 'is-invalid' : ''}`}
                                placeholder="Inserisci una breve descrizione"
                                rows="4" // Definisce l'altezza della textarea (puoi modificarla se necessario)
                            />
                            <ErrorMessage name="descrizione">
                                {(msg) => (
                                    <div className="invalid-feedback d-block">
                                        <BsExclamationCircle /> {msg}
                                    </div>
                                )}
                            </ErrorMessage>
                        </BootstrapForm.Group>

                        <Row className='mb-2'>
                            <Col md={6} className='mt-2'>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label><strong>Data Scadenza</strong></BootstrapForm.Label>
                                    <Field type="date" name="dataScadenza" className={`form-control input-group ${touched.dataScadenza && errors.dataScadenza ? 'is-invalid' : ''}`}
                                        innerRef={dateInputRef} // Usa il ref per accedere all'elemento DOM
                                        onFocus={handleFocus} />
                                    <ErrorMessage name="dataScadenza">
                                        {(msg) => (
                                            <div className="invalid-feedback d-block">
                                                <BsExclamationCircle /> {msg}
                                            </div>
                                        )}
                                    </ErrorMessage>
                                </BootstrapForm.Group>
                            </Col>

                            <Col md={6} className='mt-2'>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label><strong>Marca Temporale</strong></BootstrapForm.Label>
                                    <BootstrapForm.Check
                                        type="switch"
                                        id="custom-switch"
                                        label={isMarcaTemporale ? "Abilitata" : "Disabilitata"}
                                        checked={isMarcaTemporale}
                                        onChange={handleMarcaTemporaleSwitchChange}
                                        style={{
                                            border: "1px solid #ddd", borderRadius: "8px", paddingLeft: "60px",
                                            paddingTop: "10px", paddingBottom: "9px", marginRight: "0"
                                        }}
                                    />
                                    <ErrorMessage name="marcaTemporale">
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
                </Card>

                <Card className="mb-4 custom-card">
                    <div className="card-body px-4 pb-4">
                        <Card.Subtitle className="mb-2 text-muted py-1">
                            <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Tipologia documento</h5>
                        </Card.Subtitle>
                        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

                        <BootstrapForm.Group>
                            <div role="radiogroup" className={`d-flex radio-group ${touched.tipologiaDocumento && errors.tipologiaDocumento ? 'is-invalid' : ''}`}>
                                <Row className='mb-2'>
                                    <Col md={4} className='mt-2'>
                                        <div className="form-check" style={{ width: "150px" }}>
                                            <Field type="radio" name="tipologiaDocumento" value="" id="tipologiaDocumento" className="form-check-input" />
                                            <label className="form-check-label" htmlFor="tipologiaDocumento">
                                                Non specificata
                                            </label>
                                        </div>
                                    </Col>
                                    <Col md={4} className='mt-2'>
                                        <div className="form-check ml-5" style={{ width: "150px" }}>
                                            <Field type="radio" name="tipologiaDocumento" value="tipo1" id="tipologiaDocumento" className="form-check-input" />
                                            <label className="form-check-label" htmlFor="tipologiaDocumento">
                                                Tipologia 1
                                            </label>
                                        </div>
                                    </Col>
                                    <Col md={4} className='mt-2'>
                                        <div className="form-check ml-5" style={{ width: "150px" }}>
                                            <Field type="radio" name="tipologiaDocumento" value="tipo2" id="tipologiaDocumento" className="form-check-input" />
                                            <label className="form-check-label" htmlFor="tipologiaDocumento">
                                                Tipologia 2
                                            </label>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <ErrorMessage name="tipologiaDocumento">
                                {(msg) => (
                                    <div className="invalid-feedback d-block">
                                        <BsExclamationCircle /> {msg}
                                    </div>
                                )}
                            </ErrorMessage>
                        </BootstrapForm.Group>
                    </div>
                </Card>

                <Card className="mb-4 custom-card">
                    <div className="card-body px-4 pb-4">
                        <Card.Subtitle className="mb-2 text-muted py-1">
                            <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Carica documento</h5>
                        </Card.Subtitle>
                        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

                        <BootstrapForm.Group>
                            {!values.pdfFile && (<BootstrapForm.Label>
                                <strong>
                                    Upload File PDF
                                </strong>
                            </BootstrapForm.Label>)}

                            {!values.pdfFile && (<input
                                ref={fileInputRef} // Usa il ref per l'input file
                                type="file"
                                name="pdfFile"
                                className={`form-control input-group ${touched.pdfFile && errors.pdfFile ? 'is-invalid' : ''}`}
                                onChange={handleFileChange} // Gestisci il cambiamento del file
                                disabled={values.pdfFile}
                            />)}

                            {/* Visualizza informazioni sul file caricato */}
                            {values.pdfFile && (
                                <div className='d-flex px-1 py-1' style={{ fontSize: "large", background: "#efefef" }}>
                                    <p className='pt-3 mx-2'>
                                        <strong>
                                            <FaFilePdf size={20} color='darkred' style={{ verticalAlign: "sub" }} /> {values.pdfFile.name}
                                        </strong>
                                    </p>
                                    <p className='pt-3 mx-2 d-none d-xl-block'>
                                        <span style={{ whiteSpace: "nowrap" }}>
                                            ({getFileSizeInKB(values.pdfFile)} KB)
                                        </span>
                                    </p>
                                    <p className='pt-3' style={{ marginLeft: "auto", marginRight: "0" }}>
                                        <a onClick={handleResetFile} style={{ cursor: "pointer", padding: "16px" }}><FaTrash size={16} color='#06c' style={{ verticalAlign: "unset" }} /> Rimuovi</a>
                                    </p>
                                </div>
                            )}

                            <ErrorMessage name="pdfFile">
                                {(msg) => (
                                    <div className="invalid-feedback d-block">
                                        <BsExclamationCircle /> {msg}
                                    </div>
                                )}
                            </ErrorMessage>
                        </BootstrapForm.Group>
                    </div>
                </Card>

            </Col>

            <Col xs={12} md={4}>
                <AutoreDocumentoCard />

                <InfoDatiGeneraliCard />
            </Col>
        </Row>
    );
};

export default Step1;
