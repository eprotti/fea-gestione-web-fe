import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Schema di validazione con Yup
const validationSchema = Yup.object({
    nome: Yup.string().required('Nome è obbligatorio'),
    cognome: Yup.string().required('Cognome è obbligatorio'),
    email: Yup.string().email('Email non valida').required('Email è obbligatoria'),
    codiceFiscale: Yup.string().required('Codice Fiscale è obbligatorio'),
});

const ModificaContattoModale = ({ show, contact, onHide, onSave }) => {
    const [editedContact, setEditedContact] = useState(contact || {});

    // Aggiornare il form quando il contatto cambia
    useEffect(() => {
        setEditedContact(contact);
    }, [contact]);

    // Funzione per gestire la sottomissione del modulo
    const handleSave = (values) => {
        onSave(values); // Passa i dati aggiornati al componente genitore
        onHide(); // Chiudi la modale
    };

    if (!contact) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Modifica Contatto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        nome: editedContact.nome || '',
                        cognome: editedContact.cognome || '',
                        email: editedContact.email || '',
                        codiceFiscale: editedContact.codiceFiscale || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSave}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <FormikForm>
                            <Form.Group controlId="formNome">
                                <Form.Label>Nome</Form.Label>
                                <Field
                                    name="nome"
                                    type="text"
                                    className={`form-control ${touched.nome && errors.nome ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="nome" component="div" className="invalid-feedback" />
                            </Form.Group>

                            <Form.Group controlId="formCognome">
                                <Form.Label>Cognome</Form.Label>
                                <Field
                                    name="cognome"
                                    type="text"
                                    className={`form-control ${touched.cognome && errors.cognome ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="cognome" component="div" className="invalid-feedback" />
                            </Form.Group>

                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Field
                                    name="email"
                                    type="email"
                                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </Form.Group>

                            <Form.Group controlId="formCodiceFiscale">
                                <Form.Label>Codice Fiscale</Form.Label>
                                <Field
                                    name="codiceFiscale"
                                    type="text"
                                    className={`form-control ${touched.codiceFiscale && errors.codiceFiscale ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="codiceFiscale" component="div" className="invalid-feedback" />
                            </Form.Group>

                            <Modal.Footer>
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

export default ModificaContattoModale;
