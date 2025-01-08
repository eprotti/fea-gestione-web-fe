import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ErrorMessage, Field, FieldArray, Formik } from 'formik';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { BsExclamationCircle } from 'react-icons/bs';
import { separatorDocument } from '../../utils/documentUtil';
import { addNotification } from '../../actions/notificationAction';
import * as Yup from 'yup';
import SignatoryListCard from './SignatoryListCard';
import SignatoryCard from './SignatoryCard';
import InfoSingsPositionCard from './InfoSingsPositionCard';
import SignPosition from '../../enum/SignPosition';

const Step3 = ({ values, setFieldValue }) => {

    const dispatch = useDispatch();

    // Stato per gestire quale pulsante è attivo
    const [positioning, setPositioning] = useState(values.posizionamentoFirme);

    const formikRef = useRef(null);  // Riferimento a Formik per accedere alle sue funzioni

    // Funzione per clonare una firma
    const cloneFirma = (push) => {
        const newId = formikRef.current.values.firme.length + 1;
        const newFirma = {
            id: newId,
            titolo: `Titolo firma ${newId}`,
            obbligatoria: true, // Stato iniziale dell'obbligatoria è OFF
        };
        push(newFirma); // Aggiungiamo la nuova firma alla lista tramite Formik
        setFieldValue('firme', ([...formikRef.current.values.firme, newFirma]));
        dispatch(addNotification("Firma aggiunta", "info"));
    };

    // Funzione per rimuovere la firma
    const removeFirma = (index, remove, setFieldValue) => {
        remove(index); // Rimuove la firma dall'array
        setFieldValue('firme', formikRef.current.values.firme.filter((_, i) => i !== index)); // Aggiorna lo stato
        dispatch(addNotification("Firma rimossa", "info"));
    };

    const handleButtonClick = (type) => {
        setPositioning(type);
        setFieldValue('posizionamentoFirme', type);
    };

    const manualValidationForm = async () => {
        if (formikRef.current) {
            const errors = await formikRef.current.validateForm();  // Esegui la validazione

            setFieldValue('firme', (formikRef.current.values.firme));

            if (Object.keys(errors).length === 0) {
                setFieldValue('checkFirme', true);
            } else {
                console.log('Errori di validazione:', errors);
                setFieldValue('checkFirme', false);
            }
        }
    };

    // Schema di validazione per Step 3 (Firme)
    const validationSchema = Yup.object({
        firme: Yup.array().of(
            Yup.object({
                titolo: Yup.string().required('Il titolo è obbligatorio'),
                obbligatoria: Yup.boolean().required('Il campo obbligatoria è obbligatorio'),
            })
        ).test(
            'at-least-one-obbligatoria',
            'Almeno una firma deve essere obbligatoria',
            (firme) => {
                // Verifica che almeno una firma abbia obbligatoria === true
                return firme.some(firma => firma.obbligatoria === true);
            }
        ),
    });

    return (
        <Row>
            <Col xs={12} md={8}>

                <Card className="mb-4 custom-card">
                    <div className="card-body px-4 pb-4">
                        <Card.Subtitle className="mb-2 text-muted py-1">
                            <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Posizionamento firme grafiche</h5>
                        </Card.Subtitle>
                        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocument()}`} />

                        <div className='d-flex'>
                            {/* Pulsante Automatico */}
                            <Button
                                variant={positioning === SignPosition.AUTOMATICO ? 'selected' : 'unselected'}
                                onClick={() => handleButtonClick(SignPosition.AUTOMATICO)}
                                style={{ marginRight: '10px' }}
                            >
                                Automatico {positioning === SignPosition.AUTOMATICO && <FaCheck style={{ marginLeft: "10px" }} />}
                            </Button>

                            {/* Pulsante Manuale */}
                            <Button
                                variant={positioning === SignPosition.MANUALE ? 'selected' : 'unselected'}
                                onClick={() => handleButtonClick(SignPosition.MANUALE)}
                            >
                                Manuale {positioning === SignPosition.MANUALE && <FaCheck style={{ marginLeft: "10px" }} />}
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
                        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocument()}`} />

                        <Formik
                            innerRef={formikRef}  // Assegna il riferimento a Formik
                            initialValues={{
                                firme: values.firme && values.firme.length === 0 ? values.firmatari.map((firmatario) => ({
                                    titolo: "Firma di " + firmatario.nomeCompleto,  // Titolo della firma (ad esempio il nome del firmatario)
                                    obbligatoria: true,  // Imposta come 'si' di default, oppure 'no'
                                })) : values.firme,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => { }}
                        >
                            {({ values, handleSubmit, errors, touched }) => (
                                <Form noValidate onSubmit={handleSubmit}>

                                    <FieldArray
                                        name="firme"
                                        render={(arrayHelpers, index) => (
                                            <div key={index}>
                                                {values.firme.map((firma, index) => (
                                                    <div key={index} className="mb-3">
                                                        <Row>
                                                            <Col md={8} className='mt-2'>
                                                                <Form.Group>
                                                                    <Form.Label><strong>Titolo Firma</strong></Form.Label>
                                                                    <Field
                                                                        type="text"
                                                                        className={`form-control input-group ${touched.firme?.[index]?.titolo && errors.firme?.[index]?.titolo ? 'is-invalid' : ''}`}
                                                                        placeholder="Inserisci il titolo della firma"
                                                                        name={`firme[${index}].titolo`}
                                                                        value={firma.titolo || ''} // Assicurati che sia una stringa vuota se non definito
                                                                        onChange={async (e) => {
                                                                            const value = e.target.value;
                                                                            await arrayHelpers.replace(index, {
                                                                                ...firma,
                                                                                titolo: value || '', // Impostiamo il titolo come stringa vuota se non è definito
                                                                            });
                                                                            manualValidationForm();
                                                                        }}

                                                                    />
                                                                    <ErrorMessage name={`firme[${index}].titolo`} >
                                                                        {(msg) => (
                                                                            <div className="invalid-feedback d-block">
                                                                                <BsExclamationCircle /> {msg}
                                                                            </div>
                                                                        )}
                                                                    </ErrorMessage>
                                                                </Form.Group>
                                                            </Col>
                                                            <Col md={4} className='mt-2'>
                                                                {index !== 0 && (
                                                                    <div
                                                                        style={{
                                                                            position: "absolute",
                                                                            /* bottom: "0px", */
                                                                            right: "25px",
                                                                            fontSize: "medium",
                                                                            background: "none",
                                                                            color: "#dd0000",
                                                                            border: "none",
                                                                            cursor: "pointer",
                                                                        }}
                                                                        onClick={async () => {
                                                                            await removeFirma(index, arrayHelpers.remove, setFieldValue);
                                                                            manualValidationForm();
                                                                        }}
                                                                    >
                                                                        <FaTrash /> Rimuovi
                                                                    </div>
                                                                )}
                                                                <Form.Group>
                                                                    <Form.Label>&nbsp;</Form.Label>
                                                                    <Form.Check
                                                                        type="switch"
                                                                        name={`firme[${index}].obbligatoria`}
                                                                        id={`switch${firma.id}`}
                                                                        label={firma.obbligatoria ? "Obbligatoria" : "Non obbligatoria"}
                                                                        checked={firma.obbligatoria}
                                                                        onChange={async () => {
                                                                            await arrayHelpers.replace(index, {
                                                                                ...firma,
                                                                                obbligatoria: !firma.obbligatoria,
                                                                            });
                                                                            manualValidationForm();
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
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ))}
                                                <Button
                                                    type="button"
                                                    variant='secondary'
                                                    onClick={async () => {
                                                        await cloneFirma(arrayHelpers.push);
                                                        manualValidationForm();
                                                    }}
                                                >
                                                    Aggiungi firma
                                                </Button>
                                            </div>
                                        )}
                                    />
                                </Form>
                            )}
                        </Formik>

                    </div>
                </Card>

            </Col>
            <Col xs={12} md={4}>
                {values.firmatari.length == 1 && <SignatoryCard signatory={values.firmatari[0]} />}
                {values.firmatari.length > 1 && <SignatoryListCard signatories={values.firmatari} />}

                <InfoSingsPositionCard />
            </Col>
        </Row>
    );
};

export default Step3;
