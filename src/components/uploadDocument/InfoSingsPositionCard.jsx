import React from 'react';
import { Card } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';
import { separatorDocumento } from '../../utils/documentUtil';

const InfoSingsPositionCard = () => {

  return (
    <Card className="mb-4 custom-card">

      <div className="card-body px-4 pb-4">

        <Card.Subtitle className="mb-2 text-muted py-1 card-subtitle h6">
          <h5 className="m-a-0 text-uppercase light mt-1 mb-0"><FaInfoCircle size={20} color="#06c" style={{ verticalAlign: "unset", marginRight: "5px" }} /> Informazione</h5>
        </Card.Subtitle>

        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

        <div className="row">
          <div className="col-xs-12">
            <div className="data-show">
              <p className="data-value" style={{
                background: "#efe",
                padding: "10px",
                fontSize: "medium"
              }}><strong>Posizionamento firma grafiche</strong><br/><br/>Specificando <strong>manuale</strong> E' possibile decidere la posizione specifica di ogni firma attraverso un editor grafico. In alternativa selezionando <strong>automatico</strong> il sistema collocherà le firme a fine documento in una o più pagine aggiuntive al file PDF caricato.</p>
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
              }}>Il <strong>titolo firma</strong> è precompilato con il nome del firmatario. Tuttavia è possibile modificarli in qualsiasi momento sostituendo il testo.</p>
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
              }}>Almeno una firma deve essere <strong>obbligatoria</strong>.</p>
            </div>
          </div>
        </div>

      </div>

    </Card>
  );
};

export default InfoSingsPositionCard;
