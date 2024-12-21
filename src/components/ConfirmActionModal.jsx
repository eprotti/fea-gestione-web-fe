import { Formik, Form as FormikForm } from 'formik';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { separatorDocumento } from '../utils/documentUtil';

const ConfirmActionModal = ({ show, payload, onHide, action, title, message }) => {

    const dispatch = useDispatch();

    // Funzione per gestire la sottomissione del modulo
    const handleSave = (values) => {
        dispatch(action(payload));
        onHide(); // Chiudi la modale
    };

    if (!payload) return null;

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton style={{ paddingBottom: "0", border: "none" }}>
                <Modal.Title>
                    <h5 className="m-a-0 text-uppercase light mt-0 mb-0">{title}</h5>
                </Modal.Title>

            </Modal.Header>
            <Modal.Body style={{ paddingTop: "0" }}>
                <hr className={`thin-color-separator mt-2 ${separatorDocumento()}`} />

                <Formik
                    initialValues={{
                        id: payload.id,
                    }}
                    onSubmit={handleSave}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <FormikForm>
                            <div className='px-2 py-2'>
                                <h5><FaExclamationTriangle color='orange' size={24} style={{ marginRight: "10px", verticalAlign: "sub" }} /> {message}</h5>
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

export default ConfirmActionModal;
