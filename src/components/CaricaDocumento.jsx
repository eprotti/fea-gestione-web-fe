import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Form as BootstrapForm, Button, Card, Col, Row } from 'react-bootstrap';
import { BsExclamationCircle } from 'react-icons/bs'; // Icona di errore
import { useDispatch, useSelector } from 'react-redux';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import WizardBreadcrumb from './WizardBreadcrumb';
import { setStepCompleted } from '../reducers/caricaDocumentoReducers';
import { setCurrentStep } from '../slices/caricaDocumentoSlice';
import Steps from '../enum/Steps';

const CaricaDocumento = () => {

    const dispatch = useDispatch();

    /* Documento da caricare */
    const document = useSelector((state) => state.document);
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
            Yup.object({
              titolo: Yup.string().required('Il titolo è obbligatorio'), // Validazione per il titolo
              obbligatoria: Yup.boolean().required() // Cambiato per gestire un booleano
            })
          )
    });

    // Gestione del submit per lo Step 1
    const handleSubmitStep = (values, { setSubmitting }) => {
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            dispatch(setStepCompleted(currentStep)); // Quando l'utente completa lo step, lo segnamo come completato
            if (currentStep == Steps.DATI_GENERALI) {
                dispatch(setCurrentStep(Steps.RICERCA_FIRMATARI));
            } else if (currentStep == Steps.RICERCA_FIRMATARI) {
                dispatch(setCurrentStep(Steps.FIRME_DOCUMENTO));
            } else {
                dispatch(setCurrentStep(Steps.FIRME_DOCUMENTO));
            }

        }, 2000);
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
                                <Step2 touched={touched} errors={errors} setFieldValue={setFieldValue} isSubmitting={isSubmitting} />
                            )}
                            {currentStep == Steps.FIRME_DOCUMENTO && (
                                <Step3 touched={touched} errors={errors} setFieldValue={setFieldValue} isSubmitting={isSubmitting} />
                            )}
                            
                        </Form >
                    );
                }}
            </Formik>
        </>
    );
};

export default CaricaDocumento;
