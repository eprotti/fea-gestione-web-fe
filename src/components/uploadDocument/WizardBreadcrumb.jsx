import React from 'react';
import { Breadcrumb, Card } from 'react-bootstrap';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '../../reducers/currentStepReducer';
import Steps from '../../enum/Steps';

// Componente breadcrumb
const WizardBreadcrumb = () => {

  const dispatch = useDispatch();

  /* Step corrente */
  const currentStep = useSelector((state) => state.currentStep.currentStep);

  /* Tutti gli stati degli Step */
  const steps = useSelector((state) => state.steps);

  // Funzione per navigare direttamente a uno step specifico
  const handleStepClick = (step) => {
    if ((step === Steps.DATI_GENERALI && steps.datiGenerali) ||
      (step === Steps.RICERCA_FIRMATARI && steps.ricercaFirmatari) ||
      (step === Steps.FIRME_DOCUMENTO && steps.firmeDocumento) ||
      (step === Steps.POSIZIONAMENTO_FIRME && steps.posizionamentoFirme) ||
      step === currentStep) {
      dispatch(setCurrentStep(step));
    }
  };

  return (
    <>
      <Breadcrumb className='step-navigation-carica-documento'>
        {steps.datiGenerali || currentStep === Steps.DATI_GENERALI ? (
          <Breadcrumb.Item
            onClick={() => handleStepClick(Steps.DATI_GENERALI)}
            active={currentStep === Steps.DATI_GENERALI}
            style={{ cursor: 'pointer' }}
            className={`step-carica-documento ${steps.datiGenerali ? 'now-completed' : ''}`}
          >
            <div className='d-flex'>
              <div style={{ fontSize: "25px", marginTop: "-2px" }}>1</div>
              <h5 className='text-uppercase light' style={{ margin: "0 auto", marginTop: "5px" }}>Dati generali</h5>
              {steps.datiGenerali && <FaCheckCircle size={25} style={{ color: 'green', marginRight: "-10px", marginTop: "-10px" }} />}
            </div>
          </Breadcrumb.Item>
        ) : null}

        {/* Mostra il secondo step solo se è stato completato o se è lo step attivo */}
        {steps.ricercaFirmatari || currentStep === Steps.RICERCA_FIRMATARI ? (
          <Breadcrumb.Item
            onClick={() => handleStepClick(Steps.RICERCA_FIRMATARI)}
            active={currentStep === Steps.RICERCA_FIRMATARI}
            style={{ cursor: 'pointer' }}
            className={`step-carica-documento ${steps.ricercaFirmatari ? 'now-completed' : ''}`}
          >
            <div className='d-flex'>
              <div style={{ fontSize: "25px", marginTop: "-2px" }}>2</div>
              <h5 className='text-uppercase light' style={{ margin: "0 auto", marginTop: "5px" }}>Ricerca firmatari</h5>
              {steps.ricercaFirmatari && <FaCheckCircle size={25} style={{ color: 'green', marginRight: "-10px", marginTop: "-10px" }} />}
            </div>
          </Breadcrumb.Item>
        ) : null}

        {/* Mostra il terzo step solo se è stato completato o se è lo step attivo */}
        {steps.firmeDocumento || currentStep === Steps.FIRME_DOCUMENTO ? (
          <Breadcrumb.Item
            onClick={() => handleStepClick(Steps.FIRME_DOCUMENTO)}
            active={currentStep === Steps.FIRME_DOCUMENTO}
            style={{ cursor: 'pointer', marginTop: "0" }}
            className={`step-carica-documento ${steps.firmeDocumento ? 'now-completed' : ''}`}
          >
            <div className='d-flex'>
              <div style={{ fontSize: "25px", marginTop: "-2px" }}>3</div>
              <h5 className='text-uppercase light' style={{ margin: "0 auto", marginTop: "5px" }}>Firme documento</h5>
              {steps.firmeDocumento && <FaCheckCircle size={25} style={{ color: 'green', marginRight: "-10px", marginTop: "-10px" }} />}
            </div>
          </Breadcrumb.Item>
        ) : null}

        {/* Mostra il quarto step solo se è stato completato o se è lo step attivo */}
        {steps.posizionamentoFirme || currentStep === Steps.POSIZIONAMENTO_FIRME ? (
          <Breadcrumb.Item
            onClick={() => handleStepClick(Steps.POSIZIONAMENTO_FIRME)}
            active={currentStep === Steps.POSIZIONAMENTO_FIRME}
            style={{ cursor: 'pointer', marginTop: "0" }}
            className={`step-carica-documento ${steps.posizionamentoFirme ? 'now-completed' : ''}`}
          >
            <div className='d-flex'>
              <div style={{ fontSize: "25px", marginTop: "-2px" }}>4</div>
              <h5 className='text-uppercase light' style={{ margin: "0 auto", marginTop: "5px" }}>Posizionamento firme</h5>
              {steps.posizionamentoFirme && <FaCheckCircle size={25} style={{ color: 'green', marginRight: "-10px", marginTop: "-10px" }} />}
            </div>
          </Breadcrumb.Item>
        ) : null}

      </Breadcrumb>
      <Card className="mt-3 custom-card step-content-carica-documento">
        {currentStep === Steps.DATI_GENERALI && <span style={{ fontSize: "large" }}><FaInfoCircle size={24} color='#06c' style={{ marginRight: "10px" }} /> Inserisci i dati generali del documento come titolo, descrizione e data di scadenza. Effettua l'upload del file PDF che vuoi caricare.</span>}
        {currentStep === Steps.RICERCA_FIRMATARI && <span style={{ fontSize: "large" }}><FaInfoCircle size={24} color='#06c' style={{ marginRight: "10px" }} /> Aggiungi i firmatari che dovranno apporre le firme al documento</span>}
        {currentStep === Steps.FIRME_DOCUMENTO && <span style={{ fontSize: "large" }}><FaInfoCircle size={24} color='#06c' style={{ marginRight: "10px" }} /> Inserisci le firme che verranno richieste ai firmatari per poter firmare il documento. Almeno una firma deve essere obbligatoria.</span>}
        {currentStep === Steps.POSIZIONAMENTO_FIRME && <span style={{ fontSize: "large" }}><FaInfoCircle size={24} color='#06c' style={{ marginRight: "10px" }} /> Posiziona le firme che trovi sulla colonna destra all'interno delle pagine del file PDF.</span>}
      </Card>
    </>
  );
};

export default WizardBreadcrumb;
