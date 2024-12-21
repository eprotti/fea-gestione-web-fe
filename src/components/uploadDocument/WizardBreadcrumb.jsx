import React from 'react';
import { Breadcrumb, Card } from 'react-bootstrap';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from '../../slices/uploadDocumentSlice';

// Componente breadcrumb
const WizardBreadcrumb = () => {

  const dispatch = useDispatch();

  /* Documento da caricare */
  const document = useSelector((state) => state.uploadDocument);
  const currentStep = document.currentStep;

  /* Step */
  const steps = useSelector((state) => state.steps);

  // Funzione per navigare direttamente a uno step specifico
  const handleStepClick = (step) => {
    if ((step === "datiGenerali" && steps.datiGenerali) ||
      (step === "ricercaFirmatari" && steps.ricercaFirmatari) ||
      (step === "firmeDocumento" && steps.firmeDocumento) ||
      (step === "posizionamentoFirme" && steps.posizionamentoFirme) ||
      step === currentStep) {
      dispatch(setCurrentStep(step));
    }
  };

  return (
    <>
      <Breadcrumb className='step-navigation-carica-documento'>
        {steps.datiGenerali || currentStep == "datiGenerali" ? (
          <Breadcrumb.Item
            onClick={() => handleStepClick("datiGenerali")}
            active={currentStep == "datiGenerali"}
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
        {steps.ricercaFirmatari || currentStep == "ricercaFirmatari" ? (
          <Breadcrumb.Item
            onClick={() => handleStepClick("ricercaFirmatari")}
            active={currentStep == "ricercaFirmatari"}
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
        {steps.firmeDocumento || currentStep == "firmeDocumento" ? (
          <Breadcrumb.Item
            onClick={() => handleStepClick("firmeDocumento")}
            active={currentStep == "firmeDocumento"}
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

        {/* Mostra il terzo step solo se è stato completato o se è lo step attivo */}
        {steps.posizionamentoFirme || currentStep == "posizionamentoFirme" ? (
          <Breadcrumb.Item
            onClick={() => handleStepClick("posizionamentoFirme")}
            active={currentStep == "posizionamentoFirme"}
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
        {currentStep == "datiGenerali" && <span style={{ fontSize: "large" }}><FaInfoCircle size={24} color='#06c' style={{ marginRight: "10px" }} /> Inserisci i dati generali del documento come titolo, descrizione e data di scadenza. Effettua l'upload del file PDF che vuoi caricare.</span>}
        {currentStep == "ricercaFirmatari" && <span style={{ fontSize: "large" }}><FaInfoCircle size={24} color='#06c' style={{ marginRight: "10px" }} /> Aggiungi i firmatari che dovranno apporre le firme al documento</span>}
        {currentStep == "firmeDocumento" && <span style={{ fontSize: "large" }}><FaInfoCircle size={24} color='#06c' style={{ marginRight: "10px" }} /> Inserisci le firme che verranno richieste ai firmatari per poter firmare il documento</span>}
        {currentStep == "posizionamentoFirme" && <span style={{ fontSize: "large" }}><FaInfoCircle size={24} color='#06c' style={{ marginRight: "10px" }} /> Posiziona le firme che trovi sulla colonna destra all'interno delle pagine del file PDF.</span>}

      </Card>
    </>
  );
};

export default WizardBreadcrumb;
