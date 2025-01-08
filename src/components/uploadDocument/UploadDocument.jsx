import React from 'react';
import { Form, Formik } from 'formik';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNotification } from '../../actions/notificationAction';
import { setStepCompleted } from '../../reducers/stepsDocumentReducer';
import { setCurrentStep } from '../../reducers/currentStepReducer';
import { handleViewDocument } from '../../utils/navigationUtil';
import { scrollToTop } from '../../utils/uploadDocumentUtil';
import * as Yup from 'yup';
import SignPosition from '../../enum/SignPosition';
import SignType from '../../enum/SignType';
import Steps from '../../enum/Steps';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import WizardBreadcrumb from './WizardBreadcrumb';

const UploadDocument = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* Step attuale */
    const currentStep = useSelector((state) => state.currentStep.currentStep);

    // Schema di validazione per Step 1 (Dati generali)
    const validationSchemaStep1 = Yup.object({
        dataScadenza: Yup.date()
            .required('La data di scadenza è obbligatoria')
            .min(new Date(), 'La data di scadenza non può essere nel passato'),
        titolo: Yup.string().required('Il titolo è obbligatorio'),
        descrizione: Yup.string().required('La descrizione è obbligatoria'),
        pdfFile: Yup.mixed()
            .required('Il file PDF è obbligatorio')
            .test('fileType', 'Il file deve essere in formato PDF', value => value && value.type === 'application/pdf')
    });

    // Schema di validazione per Step 2 (Ricerca Firmatari)
    const validationSchemaStep2 = Yup.object({
        firmatari: Yup.array()
            .min(1, 'Devi aggiungere almeno un firmatario')
            .required('Firmatari obbligatori')
    });

    // Schema di validazione per Step 3 (Firme)
    const validationSchemaStep3 = Yup.object({
        checkFirme: Yup.boolean()
            .oneOf([true], 'Una o più firme non sono valide. Almeno una firma deve essere obbligatoria')  // checkFirme può essere solo true
            .required('Una o più firme non sono valide'),  // Assicurati che checkFirme venga valorizzato
    });

    // Schema di validazione per Step 4 (Firme)
    const validationSchemaStep4 = Yup.object({
        checkPosizionamentoFirme: Yup.boolean()
            .oneOf([true], 'Una o più firme non sono state ancora posizionate')  // checkFirme può essere solo true
            .required('Una o più firme non sono state ancora posizionate'),  // Assicurati che checkFirme venga valorizzato
    });

    // Gestione del submit
    const handleSubmitStep = (values, { setSubmitting }) => {
        setSubmitting(true);
        /*
        *   Salvataggio servizi backend
        */
        setSubmitting(false);
        scrollToTop();
        dispatch(setStepCompleted(currentStep)); // Quando l'utente completa lo step, lo segnamo come completato
        if (currentStep === Steps.DATI_GENERALI) {
            dispatch(setCurrentStep(Steps.RICERCA_FIRMATARI));
        } else if (currentStep === Steps.RICERCA_FIRMATARI) {
            dispatch(setCurrentStep(Steps.FIRME_DOCUMENTO));
        } else if (currentStep === Steps.FIRME_DOCUMENTO) {
            if (values.posizionamentoFirme === SignPosition.AUTOMATICO) {
                dispatch(addNotification("Documento caricato con successo", "success"));
                handleViewDocument(navigate, "de0ad9e3-15d8-4895-badc-4a34e7bb5971");
            } else {
                dispatch(setCurrentStep(Steps.POSIZIONAMENTO_FIRME));
            }
        } else if (currentStep === Steps.POSIZIONAMENTO_FIRME) {
            dispatch(addNotification("Documento caricato con successo", "success"));
            handleViewDocument(navigate, "de0ad9e3-15d8-4895-badc-4a34e7bb5971");
        }
    };

    return (
        <>
            {/* Barra di Navigazione tra gli Step */}
            <WizardBreadcrumb />

            {/* Form globale per tutti gli step*/}
            <Formik
                initialValues={{
                    tipologiaFirma: SignType.SINGOLO_FIRMATARIO,
                    dataScadenza: "",
                    marcaTemporale: true,
                    titolo: "",
                    descrizione: "",
                    tipologiaDocumento: "",
                    pdfFile: undefined,
                    firmatari: [],
                    firme: [],
                    checkFirme: true,
                    checkPosizionamentoFirme: false,
                    posizionamentoFirme: SignPosition.AUTOMATICO,
                }}
                validationSchema={
                    currentStep === Steps.DATI_GENERALI ? validationSchemaStep1 :
                        currentStep === Steps.RICERCA_FIRMATARI ? validationSchemaStep2 :
                            currentStep === Steps.FIRME_DOCUMENTO ? validationSchemaStep3 :
                                currentStep === Steps.POSIZIONAMENTO_FIRME ? validationSchemaStep4 : null}
                onSubmit={handleSubmitStep}
            >
                {({ values, setFieldValue, errors, touched, isSubmitting }) => {
                    return (
                        <Form>
                            {currentStep === Steps.DATI_GENERALI && (
                                <Step1 values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} />
                            )}
                            {currentStep === Steps.RICERCA_FIRMATARI && (
                                <Step2 values={values} setFieldValue={setFieldValue} />
                            )}
                            {currentStep === Steps.FIRME_DOCUMENTO && (
                                <Step3 values={values} touched={touched} errors={errors} setFieldValue={setFieldValue} />
                            )}
                            {currentStep === Steps.POSIZIONAMENTO_FIRME && (
                                <Step4 values={values} setFieldValue={setFieldValue}/>
                            )}

                            <Row>
                                <Col xs={12} md={currentStep === Steps.POSIZIONAMENTO_FIRME ? 12 : 8}>
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
