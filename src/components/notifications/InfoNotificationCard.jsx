import React from 'react';
import { Card } from 'react-bootstrap';
import { separatorDocument } from '../../utils/documentUtil';
import { FaCheckCircle, FaEnvelope, FaInfo, FaTimesCircle } from 'react-icons/fa';

const InfoNotificationCard = () => {

  return (
    <Card className="mb-4 mt-1 custom-card shadow">

      <div className="card-body px-4 pb-4">

        <Card.Subtitle className="mb-2 text-muted py-1 card-subtitle h6">
          <h5 className="m-a-0 text-uppercase light mt-1 mb-0"><FaEnvelope size={20} color="#06c" style={{ verticalAlign: "sub", marginRight: "5px" }} /> Benvenuto nel log notifiche</h5>
        </Card.Subtitle>

        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocument()}`} />

        <div className="row">
          <div className="col-xs-12">
            <div className="data-show">
              <p className="data-value" style={{
                background: "#efe",
                padding: "10px",
                fontSize: "medium"
              }}>In questa sezione potrai consultare tutte le notifiche che hai generato durante l'utilizzo dell'applicazione. <br/>
              Le notifiche sono di tipo:<br/>
              <button style={{ color: "#0a5", fontSize: "large", padding: "5px", margin: "5px", marginLeft: "0"}}><FaCheckCircle size={20} style={{ marginRight: "", verticalAlign: "sub", color: "#0a5" }} /> SUCCESS</button>
              <button style={{ color: "#06c", fontSize: "large", padding: "5px", margin: "5px"}}><FaInfo size={16} style={{ marginRight: "", verticalAlign: "middle", color: "#06c" }} /> INFO</button>
              <button style={{ color: "#c00", fontSize: "large", padding: "5px", margin: "5px"}}><FaTimesCircle size={20} style={{ marginRight: "", verticalAlign: "sub", color: "#cc0000" }} /> ERROR</button>
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
              }}>Dopo averle consultate puoi <strong>marcarle come lette</strong> o <strong>eliminarle</strong> dalla lista.</p>
            </div>
          </div>
        </div>

      </div>

    </Card>
  );
};

export default InfoNotificationCard;
