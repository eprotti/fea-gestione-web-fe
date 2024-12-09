import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';
import { scaricaDocumento } from '../utils/DocumentoUtil';

const ScaricaDocumentoCard = ({ documento }) => {

    return (
        <Card className="mb-4 custom-card">

            <div className="card-body px-4 py-4">

              <Card.Subtitle className="mb-2 text-muted py-1">
                <h5 className="m-a-0 text-uppercase light mt-0 mb-0">consulta il documento</h5>
              </Card.Subtitle>

              <a href="#" className="external" title="il documento verrà aperto in una nuova finestra">

                <img src={`/img/${scaricaDocumento(documento.stato)}.svg`} className="my-1 mb-4" alt="consulta il documento" />

                <Button variant="primary" className="btn-secondary">
                  <span style={{marginRight: "10px"}}>Scarica</span> <FaDownload />
                </Button>
              </a>

            </div>

          </Card>
    );
};

export default ScaricaDocumentoCard;
