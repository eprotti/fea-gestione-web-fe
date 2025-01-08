import React from 'react';
import { Card } from 'react-bootstrap';
import { FaEnvelope, FaIdCard, FaUser } from 'react-icons/fa';
import { separatorDocument } from '../../utils/documentUtil';

const SignatoryCard = ({ signatory }) => {

  return (
    <Card className="mb-4 custom-card">

      <div className="card-body px-4 pb-4">

        <Card.Subtitle className="mb-2 text-muted py-1 card-subtitle h6">
          <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Firmatario</h5>
        </Card.Subtitle>

        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocument()}`} />

        <div className="d-flex mb-3" style={{ background: "#efefef", padding: "8px" }}>

          <FaUser style={{
            fontSize: "48px",
            border: "1px solid",
            borderRadius: "54px",
            padding: "8px",
            marginTop: "4px",
            background: "#06c",
            color: "white"
          }} />

          <div className="">
            <h5 className="px-3 py-3" style={{ margin: "0", fontSize: "large" }}>{signatory.nomeCompleto}</h5>
          </div>

        </div>

        <div className="row">
          <div className="col-xs-12">
            <div className="data-show">
              <p className="data-text"><FaIdCard size={24} style={{ color: "#06c", verticalAlign: "sub", marginRight: "6px" }} /> Codice fiscale</p>
              <p className="data-value">{signatory.codiceFiscale}</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <div className="data-show">
              <p className="data-text"><FaEnvelope size={24} style={{ color: "#06c", verticalAlign: "sub", marginRight: "6px" }} /> Indirizzo email:</p>
              <p className="data-value">{signatory.email}</p>
            </div>
          </div>
        </div>

      </div>

    </Card>
  );
};

export default SignatoryCard;
