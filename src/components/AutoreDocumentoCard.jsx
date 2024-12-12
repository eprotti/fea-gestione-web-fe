import React from 'react';
import { Card } from 'react-bootstrap';
import { FaBuilding, FaEnvelope, FaSchool } from 'react-icons/fa';
import { separatorDocumento } from '../utils/DocumentoUtil';

const AutoreDocumentoCard = () => {

  return (
    <Card className="mb-4 custom-card">

      <div className="card-body px-4 pb-4">

        <Card.Subtitle className="mb-2 text-muted py-1 card-subtitle h6">
          <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Autore documento</h5>
        </Card.Subtitle>

        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

        <div className="row">
          <div className="col-xs-12">
            <div className="data-show">
              <p className="data-text"><FaBuilding size={24} style={{ color: "#06c", verticalAlign: "unset", marginRight: "8px" }} /> Predisposto da:</p>
              <p className="data-value">RMTF02000R - ITIS G.ARMELLINI</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <div className="data-show">
              <p className="data-text"><FaEnvelope size={24} style={{ color: "#06c", verticalAlign: "sub", marginRight: "8px" }} /> Indirizzo email:</p>
              <p className="data-value">rmtf02000r@istruzione.it</p>
            </div>
          </div>
        </div>

      </div>

    </Card>
  );
};

export default AutoreDocumentoCard;
