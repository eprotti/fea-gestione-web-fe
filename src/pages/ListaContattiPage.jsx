import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';
import TabellaContattiCard from '../components/TabellaContattiCard.jsx';
import InfoRubricaCard from '../components/InfoRubricaCard.jsx';

const ListaContattiPage = () => {

  const [contacts, setContacts] = useState([
    { nome: 'Luigi', cognome: 'Bianchi', email: 'luigi.bianchi@example.com', codiceFiscale: 'BNCLGU80A01F205M' },
    { nome: 'Mario', cognome: 'Rossi', email: 'mario.rossi@example.com', codiceFiscale: 'RSSMRA80A01H501Z' },
    { nome: 'Giulia', cognome: 'Verdi', email: 'giulia.verdi@example.com', codiceFiscale: 'VRDGLI90B01Z404S' },
    { nome: 'Emanuele Vittorio', cognome: 'Filiberto Di Savoia', email: 'giulia.verdi@example.com', codiceFiscale: 'VRDGLI90B01Z404S' },
    // Aggiungi altri contatti qui...
  ]);

  // Funzione per gestire la modifica di un contatto
  const handleEdit = (contact) => {
    console.log('Modifica contatto:', contact);
    // Aggiungi la logica per modificare il contatto
  };

  // Funzione per gestire la cancellazione di un contatto
  const handleDelete = (contact) => {
    const newContacts = contacts.filter(c => c.codiceFiscale !== contact.codiceFiscale);
    setContacts(newContacts);
    console.log('Contatto eliminato:', contact);
  };

  return (
    <Container className="main-container pt-5 pb-5">
      <h3 className='mb-0 py-2 h3'>Rubrica</h3>

      <hr />
      <Row>
        {/* Colonna principale per il contenuto */}
        <Col xs={12} md={8}>
          {/* <ListaContattiCard /> */}

          <TabellaContattiCard contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />

          <div className="mt-3">
            <a onClick={() => navigate(-1)} rel="noopener noreferrer" style={{ cursor: "pointer", fontSize: "large" }} className="mt-3 text-primary">
              <FaChevronLeft /> Torna alla homepage
            </a>
          </div>
        </Col>

        {/* Colonna laterale (opzionale, visibile su schermi più grandi) */}
        <Col xs={12} md={4}>
          <InfoRubricaCard />
        </Col>
      </Row>
    </Container>
  );
};

export default ListaContattiPage;
