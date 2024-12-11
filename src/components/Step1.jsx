import { ErrorMessage, Field } from 'formik';
import React from 'react';
import { Form as BootstrapForm, Card, Col, Row } from 'react-bootstrap';
import { BsExclamationCircle } from 'react-icons/bs'; // Icona di errore
import { separatorDocumento } from '../utils/DocumentoUtil';

const Step1 = ({touched, errors, setFieldValue}) => {

    return (
        <>
            <Card className="mb-4 custom-card">
                <div className="card-body px-4 pb-4">
                    <Card.Subtitle className="mb-2 text-muted py-1">
                        <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Scheda documento</h5>
                    </Card.Subtitle>
                    <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

                    <BootstrapForm.Group className='mb-2'>
                        <BootstrapForm.Label><strong>Tipologia Firma</strong></BootstrapForm.Label>
                        <div role="radiogroup" className={`d-flex radio-group ${touched.tipologiaFirma && errors.tipologiaFirma ? 'is-invalid' : ''}`}>
                            <div className="form-check">
                                <Field
                                    type="radio"
                                    name="tipologiaFirma"
                                    value="singolo"
                                    id="tipologiaFirmaSingolo"
                                    className="form-check-input"
                                />
                                <label className="form-check-label" htmlFor="tipologiaFirmaSingolo">Singolo firmatario</label>
                            </div>
                            <div className="form-check ml-4">
                                <Field
                                    type="radio"
                                    name="tipologiaFirma"
                                    value="multi"
                                    id="tipologiaFirmaMulti"
                                    className="form-check-input"
                                />
                                <label className="form-check-label" htmlFor="tipologiaFirmaMulti">Multi firmatario</label>
                            </div>
                        </div>
                        <ErrorMessage name="tipologiaFirma">
                            {(msg) => (
                                <div className="invalid-feedback d-block">
                                    <BsExclamationCircle /> {msg}
                                </div>
                            )}
                        </ErrorMessage>
                    </BootstrapForm.Group>

                    <Row className='mb-2'>
                        <Col md={6}>
                            <BootstrapForm.Group>
                                <BootstrapForm.Label><strong>Data Scadenza</strong></BootstrapForm.Label>
                                <Field type="date" name="dataScadenza" className={`form-control input-group ${touched.dataScadenza && errors.dataScadenza ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="dataScadenza">
                                    {(msg) => (
                                        <div className="invalid-feedback d-block">
                                            <BsExclamationCircle /> {msg}
                                        </div>
                                    )}
                                </ErrorMessage>
                            </BootstrapForm.Group>
                        </Col>

                        <Col md={6}>
                            <BootstrapForm.Group>
                                <BootstrapForm.Label><strong>Marca Temporale</strong></BootstrapForm.Label>
                                <div role="radiogroup" className={`d-flex radio-group ${touched.marcaTemporale && errors.marcaTemporale ? 'is-invalid' : ''}`}>
                                    <div className="form-check">
                                        <Field type="radio" name="marcaTemporale" value="si" id="marcaTemporaleSi" className="form-check-input" />
                                        <label className="form-check-label" htmlFor="marcaTemporaleSi">Sì</label>
                                    </div>
                                    <div className="form-check ml-4">
                                        <Field type="radio" name="marcaTemporale" value="no" id="marcaTemporaleNo" className="form-check-input" />
                                        <label className="form-check-label" htmlFor="marcaTemporaleNo">No</label>
                                    </div>
                                </div>
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

                    <BootstrapForm.Group className='mb-2'>
                        <BootstrapForm.Label><strong>Titolo</strong></BootstrapForm.Label>
                        <Field type="text" name="titolo" className={`form-control input-group>${touched.titolo && errors.titolo ? 'is-invalid' : ''}`} placeholder="Inserisci il titolo" />
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
                            <div className="form-check">
                                <Field type="radio" name="tipologiaDocumento" value="tipo2" id="tipologiaDocumentoPdf" className="form-check-input" />
                                <label className="form-check-label" htmlFor="tipologiaDocumentoPdf">
                                    Tipologia 1
                                </label>
                            </div>
                            <div className="form-check ml-5">
                                <Field type="radio" name="tipologiaDocumento" value="tipo1" id="tipologiaDocumentoWord" className="form-check-input" />
                                <label className="form-check-label" htmlFor="tipologiaDocumentoWord">
                                    Tipologia 2
                                </label>
                            </div>
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
                        <BootstrapForm.Label><strong>Upload File PDF</strong></BootstrapForm.Label>
                        <input
                            type="file"
                            name="pdfFile"
                            className={`form-control input-group ${touched.pdfFile && errors.pdfFile ? 'is-invalid' : ''}`}
                            onChange={(event) => setFieldValue('pdfFile', event.currentTarget.files[0])}
                        />
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
        </>
    );
};

export default Step1;
