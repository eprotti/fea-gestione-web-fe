import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Steps from '../../enum/Steps';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import WizardBreadcrumb from './WizardBreadcrumb';
import { setStepCompleted } from '../../reducers/stepsDocumentReducer';
import { setCurrentStep } from '../../slices/uploadDocumentSlice';
import { scrollToTop } from '../../utils/uploadDocumentUtil';
import { addNotification } from '../../actions/notificationAction';
import { handleViewDocument } from '../../utils/navigationUtil';

const UploadDocument = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* Documento da caricare */
    const document = useSelector((state) => state.uploadDocument);
    const currentStep = document.currentStep;

    // Schema di validazione con Yup
    const validationSchemaStep1 = Yup.object({
        tipologiaFirma: Yup.string().required('Tipologia di firma è obbligatoria'),
        dataScadenza: Yup.date().required('La data di scadenza è obbligatoria').min(new Date(), 'La data di scadenza non può essere nel passato'),
        marcaTemporale: Yup.string().required('Marca temporale è obbligatoria'),
        titolo: Yup.string().required('Il titolo è obbligatorio'),
        descrizione: Yup.string().required('La descrizione è obbligatoria'),
        /* tipologiaDocumento: Yup.string().required('Tipologia documento è obbligatoria'), */
        pdfFile: Yup.mixed().required('Il file PDF è obbligatorio').test('fileType', 'Il file deve essere in formato PDF', value => value && value.type === 'application/pdf')
    });

    const validationSchemaStep2 = Yup.object({
        firmatari: Yup.array().min(1, 'Devi aggiungere almeno un firmatario').required('Firmatari obbligatori')
    });

    // Schema di validazione per Step 3 (Firme)
    const validationSchemaStep3 = Yup.object({
        firme: Yup.array().of(
            Yup.object().shape({
                titolo: Yup.string().required('Il titolo è obbligatorio'),
                obbligatoria: Yup.boolean(),
            })
        ),
    });

    // Gestione del submit per lo Step 1
    const handleSubmitStep = (values, { setSubmitting }) => {
        setSubmitting(true);
        setSubmitting(false);
        scrollToTop();
        dispatch(setStepCompleted(currentStep)); // Quando l'utente completa lo step, lo segnamo come completato
        if (currentStep == Steps.DATI_GENERALI) {
            dispatch(setCurrentStep(Steps.RICERCA_FIRMATARI));
        } else if (currentStep == Steps.RICERCA_FIRMATARI) {
            dispatch(setCurrentStep(Steps.FIRME_DOCUMENTO));
        } else if (currentStep == Steps.FIRME_DOCUMENTO) {
            if (values.posizionamentoFirme === 'automatico') {
                console.log(values)
                dispatch(addNotification("Documento caricato con successo", "success"));
                handleViewDocument(navigate, "de0ad9e3-15d8-4895-badc-4a34e7bb5971");
            } else {
                dispatch(setCurrentStep(Steps.POSIZIONAMENTO_FIRME));
            }
        } else if (currentStep == Steps.POSIZIONAMENTO_FIRME) {
            dispatch(addNotification("Documento caricato con successo", "success"));
            handleViewDocument(navigate, "de0ad9e3-15d8-4895-badc-4a34e7bb5971");
        }

    };

    return (
        <>
            {/* Barra di Navigazione tra gli Step */}
            <WizardBreadcrumb />

            <Formik
                initialValues={{
                    tipologiaFirma: document.documentDetails.tipologiaFirma,
                    dataScadenza: document.documentDetails.dataScadenza,
                    marcaTemporale: document.documentDetails.marcaTemporale,
                    titolo: document.documentDetails.titolo,
                    descrizione: document.documentDetails.descrizione,
                    tipologiaDocumento: document.documentDetails.tipologiaDocumento,
                    pdfFile: document.documentDetails.pdfFile,
                    firmatari: document.firmatari,
                    firme: document.firme,
                    posizionamentoFirme: document.posizionamentoFirme,
                }}
                validationSchema={
                    currentStep == Steps.DATI_GENERALI ? validationSchemaStep1 :
                        currentStep == Steps.RICERCA_FIRMATARI ? validationSchemaStep2 :
                            validationSchemaStep3}
                onSubmit={handleSubmitStep}
            >
                {({ values, setFieldValue, errors, touched, isSubmitting, isValid }) => {
                    return (
                        <Form>
                            {currentStep == Steps.DATI_GENERALI && (
                                <Step1 values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} isSubmitting={isSubmitting} />
                            )}
                            {currentStep == Steps.RICERCA_FIRMATARI && (
                                <Step2 values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} isSubmitting={isSubmitting} />
                            )}
                            {currentStep == Steps.FIRME_DOCUMENTO && (
                                <Step3 values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} isSubmitting={isSubmitting} />
                            )}
                            {currentStep == Steps.POSIZIONAMENTO_FIRME && (
                                <Step4 />
                            )}

                            <Row>
                                <Col xs={12} md={8}>
                                    <Card className="mb-4 custom-card mt-0">
                                        <div className="card-body px-4 pb-4">

                                            <div className="d-flex justify-content-between mt-2">
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    className="btn-lg"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? 'Caricamento...' : 'Avanti'}
                                                </Button>
                                            </div>

                                        </div>
                                    </Card>

                                    {/* Mostra l'errore e scrolla verso di esso */}
                                    {Object.keys(errors).length > 0 && !isSubmitting && (
                                        <div className="alert alert-danger mt-4">
                                            <p>Si sono verificati degli errori nei seguenti campi:</p>
                                            <ul>
                                                {Object.keys(errors).map((key) => (
                                                    <li key={key}>{errors[key]}</li>
                                                ))}
                                            </ul>
                                            Correggi prima di inviare.
                                        </div>
                                    )}
                                </Col>
                                <Col xs={12} md={4}>
                                </Col>
                            </Row>

                        </Form >
                    );
                }}
            </Formik>
        </>
    );
};

export default UploadDocument;
