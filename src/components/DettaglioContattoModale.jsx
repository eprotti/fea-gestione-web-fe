import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DettaglioContattoModale = ({ show, contact, onHide }) => {
  if (!contact) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Dettagli Contatto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p><strong>Nome:</strong> {contact.nome}</p>
          <p><strong>Cognome:</strong> {contact.cognome}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Codice Fiscale:</strong> {contact.codiceFiscale}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DettaglioContattoModale;
