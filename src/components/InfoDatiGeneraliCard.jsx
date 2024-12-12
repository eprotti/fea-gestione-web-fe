import React from 'react';
import { Card } from 'react-bootstrap';
import { separatorDocumento } from '../utils/DocumentoUtil';

const InfoDatiGeneraliCard = () => {

  return (
    <Card className="mb-4 custom-card">

      <div className="card-body px-4 pb-4">

        <Card.Subtitle className="mb-2 text-muted py-1 card-subtitle h6">
          <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Informazione</h5>
        </Card.Subtitle>

        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

        <div className="row">
          <div className="col-xs-12">
            <div className="data-show">
              <p className="data-value" style={{
                background: "#efe",
                padding: "10px",
                fontSize: "medium"
              }}>La <strong>marca temporale</strong> va inserita solamente nei documenti che non necessitano di protocollazione e per cui si voglia garantire una validità certificata nel tempo.</p>
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
              }}>Sono ammessi soltanto <strong>file PDF</strong> con dimensione non superiore a 5 MB. Verifica il file prima di effettuare il caricamento.</p>
            </div>
          </div>
        </div>

      </div>

    </Card>
  );
};

export default InfoDatiGeneraliCard;
