import React from 'react';
import { Card } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import { separatorDocument } from '../../utils/documentUtil';

const SignatureTypeCard = ({values}) => {

  return (
    <Card className="mb-4 custom-card">

      <div className="card-body px-4 pb-4">

        <Card.Subtitle className="mb-2 text-muted py-1 card-subtitle h6">
          <h5 className="m-a-0 text-uppercase light mt-1 mb-0"><FaInfoCircle size={20} color="#06c" style={{ verticalAlign: "unset", marginRight: "5px" }} /> Informazione</h5>
        </Card.Subtitle>

        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocument()}`} />

        <div className="row">
          <div className="col-xs-12">
            <div className="data-show">
              <p className="data-text">Tipologia di firma selezionata:</p>
              <p className="data-value pt-2" style={{ whiteSpace: "nowrap" }}>{values.tipologiaFirma}</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <div className="data-show">
              <p className="data-value" style={{
                background: "#efe",
                padding: "10px",
                fontSize: "medium"
              }}>La tipologia di firma <strong>singolo firmatario</strong> prevede un solo firmatario per documento. Tuttavia è possibile specificare più firmatari per effettuare un <i>invio massivo</i>. In questo caso ogni firmatario riceverà il proprio documento separatamente.</p>
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
              }}>La tipologia di firma <strong>multi firmatario</strong> prevede più firmatari per documento. I firmatari devono essere almeno 2 e lo stesso documento verrà inviato ad ognuno di essi. </p>
            </div>
          </div>
        </div>

      </div>

    </Card>
  );
};

export default SignatureTypeCard;
