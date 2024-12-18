import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { separatorDocumento } from '../utils/DocumentoUtil';
import { FaEnvelope, FaIdCard, FaUser } from 'react-icons/fa';

const DettaglioContattoModale = ({ show, contact, onHide }) => {
  if (!contact) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton style={{ paddingBottom: "0", border: "none" }}>
        <Modal.Title>
          <h5 className="m-a-0 text-uppercase light mt-0 mb-0">Dettaglio contatto</h5>
        </Modal.Title>

      </Modal.Header>
      <Modal.Body style={{ paddingTop: "0" }}>
        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />
        <div className='px-2'>

          <div className="row" style={{paddingRight: "10px"}}>
            <div className="col-xs-12 col-md-7">
              <div className="row">
                <div className="col-xs-12 col-md-12">
                  <div className="data-show">
                    <p className="data-text"><strong>Nome:</strong></p>
                    <p className="data-value" style={{ borderBottom: "1px solid #ccc" }}>{contact.nome}</p>
                  </div>
                </div>
                <div className="col-xs-12 col-md-12">
                  <div className="data-show">
                    <p className="data-text"><strong>Cognome:</strong></p>
                    <p className="data-value" style={{ borderBottom: "1px solid #ccc" }}>{contact.cognome}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-5 d-none d-md-block">
              <FaUser size={180} color='#ccc' style={{ border: "4px solid", padding: "5px" }} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-12">
              <div className="data-show">
                <p className="data-text"><FaEnvelope color='#aaa' /> <strong>Email:</strong></p>
                <p className="data-value" style={{ borderBottom: "1px solid #ccc" }}>{contact.email}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-12">
              <div className="data-show">
                <p className="data-text"><FaIdCard color='#aaa' /> <strong>Codice fiscale:</strong></p>
                <p className="data-value" style={{ borderBottom: "1px solid #ccc" }}>{contact.codiceFiscale}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ border: "none" }}>
        <Button variant="secondary" onClick={onHide}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DettaglioContattoModale;
