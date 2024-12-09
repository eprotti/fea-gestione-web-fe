import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaAddressBook, FaChevronRight, FaCogs, FaFileAlt, FaInfoCircle, FaQuestionCircle, FaUpload } from "react-icons/fa";
import { useSelector } from 'react-redux';
import UltimiDocumentiCaricatiCard from "../components/UltimiDocumentiCaricatiCard";

// Registriamo i componenti necessari per il grafico
ChartJS.register(ArcElement, Tooltip, Legend);

// Definizione degli stati dei documenti
const documentStates = ["DA_FIRMARE", "FIRMATO", "PARZIALMENTE_FIRMATO", "ANNULLATO", "SCADUTO"];

const HomePage = () => {

  const { documents, loading, error } = useSelector((state) => state.documents);

  // Selezioniamo solo i primi 3 documenti
  const recentDocuments = documents.slice(0, 3);

  return (
    <Container className="main-container pt-5 pb-5">

      <Row>
        {/* Colonna principale per il contenuto */}
        <Col xs={12} md={4}>

          <section id="upload" className="card upload-card">
            <FaUpload size={45} color="#ffffff" style={{margin: "0"}} />
            <h2>Gestione Documento</h2>
            <p>Carica un nuovo documento</p>
          </section>

          <section id="contacts" className="card contacts-card">
            <FaAddressBook size={45} color="#ffffff" style={{margin: "0"}} />
            <h2>Gestione Rubrica</h2>
            <p>Vai alla rubrica per gestire i contatti</p>
          </section>

        </Col>

        <Col xs={12} md={4}>

          <section id="archive" className="card archive-card">
            <FaFileAlt size={45} color="#ffffff" style={{margin: "0"}} />
            <h2>Archivio Documenti</h2>
            <p>Ricerca i documenti caricati per consultarli</p>
          </section>

          <section id="templates" className="card templates-card">
            <FaCogs size={45} color="#ffffff" style={{margin: "0"}} />
            <h2>Gestione Template</h2>
            <p>Vai alla gestione dei template</p>
          </section>
        </Col>

        {/* Colonna laterale (opzionale, visibile su schermi più grandi) */}
        <Col xs={12} md={4}>
          <UltimiDocumentiCaricatiCard />
        </Col>
      </Row>
      
      <Row><Col><hr className="mt-4"/></Col></Row>

      <Row>
        {/* Colonna principale per il contenuto */}
        <Col xs={12} md={8}>
          <div id="tutorials" className="mt-2 document-item">
            <h5><FaInfoCircle size={30} color="#06c" /> Cos'è Sigillo Gestione?</h5>
            <p className="tutorial-description">
              Scopri come funziona e come può aiutarti a gestire documenti, la rubrica, e molto altro in modo semplice e sicuro. 
            </p>
            <p className="tutorial-link">
              <a href="/tutorials" className="tutorial-link-text">Approfondisci <FaChevronRight /></a>
            </p>
          </div>
        </Col>
        {/* Colonna laterale (opzionale, visibile su schermi più grandi) */}
        <Col xs={12} md={4}>
          <div id="tutorials" className="mt-2 document-item">
            <h5><FaQuestionCircle size={30} color="#06c" /> Hai bisogno di aiuto?</h5>
            <p className="tutorial-description">
              Consulta la guida completa su come utilizzare tutte le funzionalità di Sigillo Gestione. 
            </p>
            <p className="tutorial-link">
              <a href="/tutorials" className="tutorial-link-text">Approfondisci <FaChevronRight /></a>
            </p>
          </div>
        </Col>
      </Row>


    </Container >
  );
};

export default HomePage;
