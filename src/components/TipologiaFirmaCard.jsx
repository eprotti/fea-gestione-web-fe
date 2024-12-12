import React from 'react';
import { Card } from 'react-bootstrap';
import { FaBuilding, FaCircle, FaEnvelope, FaFileSignature, FaPen, FaPenAlt, FaSchool, FaSign, FaSignature } from 'react-icons/fa';
import { separatorDocumento } from '../utils/DocumentoUtil';
import { useSelector } from 'react-redux';
import { FaPencil } from 'react-icons/fa6';

const TipologiaFirmaCard = () => {

  /* Documento da caricare */
  const document = useSelector((state) => state.document);

  return (
    <Card className="mb-4 custom-card">

      <div className="card-body px-4 pb-4">

        <Card.Subtitle className="mb-2 text-muted py-1 card-subtitle h6">
          <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Tipologia firma</h5>
        </Card.Subtitle>

        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

        <div className="row">
          <div className="col-xs-12">
            <div className="data-show">
              <p className="data-text"><FaFileSignature size={24} style={{ color: "#06c", verticalAlign: "bottom", marginRight: "10px" }} /> Tipologia di firma selezionata:</p>
              <p className="data-value pt-2" style={{whiteSpace: "nowrap"}}>{document.documentDetails.tipologiaFirma}</p>
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

export default TipologiaFirmaCard;
