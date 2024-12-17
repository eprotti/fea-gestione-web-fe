import React from 'react';
import { Card } from 'react-bootstrap';
import { separatorDocumento } from '../utils/DocumentoUtil';
import { FaAddressBook } from 'react-icons/fa';

const InfoRubricaCard = () => {

  return (
    <Card className="mb-4 custom-card">

      <div className="card-body px-4 pb-4">

        <Card.Subtitle className="mb-2 text-muted py-1 card-subtitle h6">
          <h5 className="m-a-0 text-uppercase light mt-1 mb-0"><FaAddressBook size={20} color="#06c" style={{ verticalAlign: "unset", marginRight: "5px" }} /> Benvenuto nella Rubrica</h5>
        </Card.Subtitle>

        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

        <div className="row">
          <div className="col-xs-12">
            <div className="data-show">
              <p className="data-value" style={{
                background: "#efe",
                padding: "10px",
                fontSize: "medium"
              }}>La rubrica ti permette di gestire facilmente i tuoi contatti.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="data-show">
              <p className="data-value" style={{
                background: "#eff",
                padding: "10px",
                fontSize: "medium"
              }}>Aggiungendo i tuoi contatti alla rubrica, potrai velocizzare il processo di caricamento dei documenti e aggiungere rapidamente i firmatari quando stai preparando il documento da caricare.</p>
            </div>
          </div>
        </div>

      </div>

    </Card>
  );
};

export default InfoRubricaCard;
