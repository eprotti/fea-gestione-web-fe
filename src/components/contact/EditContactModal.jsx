import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { separatorDocumento } from '../../utils/documentUtil';

// Schema di validazione con Yup
const validationSchema = Yup.object({
    nome: Yup.string().required('Nome è obbligatorio'),
    cognome: Yup.string().required('Cognome è obbligatorio'),
    email: Yup.string().email('Email non valida').required('Email è obbligatoria'),
    codiceFiscale: Yup.string().required('Codice Fiscale è obbligatorio'),
});

const EditContactModal = ({ show, contact, onHide, onSave }) => {

    const dispatch = useDispatch();


    // Funzione per gestire la sottomissione del modulo
    const handleSave = (values) => {
        const editedContact = { id: values.id, nome: values.nome, cognome: values.cognome, email: values.email, codiceFiscale: values.codiceFiscale };
        dispatch(onSave(editedContact));
        onHide(); // Chiudi la modale
    };

    if (!contact) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton style={{ paddingBottom: "0", border: "none" }}>
                <Modal.Title>
                    <h5 className="m-a-0 text-uppercase light mt-0 mb-0">Modifica contatto</h5>
                </Modal.Title>

            </Modal.Header>
            <Modal.Body style={{ paddingTop: "0" }}>
                <hr className={`thin-color-separator mt-2 ${separatorDocumento()}`} />

                <Formik
                    initialValues={{
                        id: contact.id,
                        nome: contact.nome || '',
                        cognome: contact.cognome || '',
                        email: contact.email || '',
                        codiceFiscale: contact.codiceFiscale || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSave}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <FormikForm>
                            <div className='px-2'>
                                <Form.Group controlId="formNome" className='pt-2'>
                                    <Form.Label>Nome</Form.Label>
                                    <Field
                                        name="nome"
                                        type="text"
                                        className={`form-control input-group ${touched.nome && errors.nome ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="nome" component="div" className="invalid-feedback" />
                                </Form.Group>

                                <Form.Group controlId="formCognome" className='pt-2'>
                                    <Form.Label>Cognome</Form.Label>
                                    <Field
                                        name="cognome"
                                        type="text"
                                        className={`form-control input-group ${touched.cognome && errors.cognome ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="cognome" component="div" className="invalid-feedback" />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className='pt-2'>
                                    <Form.Label>Email</Form.Label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className={`form-control input-group ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </Form.Group>

                                <Form.Group controlId="formCodiceFiscale" className='pt-2'>
                                    <Form.Label>Codice Fiscale</Form.Label>
                                    <Field
                                        name="codiceFiscale"
                                        type="text"
                                        className={`form-control input-group ${touched.codiceFiscale && errors.codiceFiscale ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="codiceFiscale" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </div>
                            <Modal.Footer className='mt-4 pt-2' style={{ border: "none", padding: "0" }}>
                                <Button variant="secondary" onClick={onHide}>
                                    Annulla
                                </Button>
                                <Button variant="primary" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Salvando...' : 'Salva'}
                                </Button>
                            </Modal.Footer>
                        </FormikForm>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default EditContactModal;
