import React from 'react';
import { Card } from 'react-bootstrap';
import { FaEnvelope, FaIdCard, FaUser } from 'react-icons/fa';
import { separatorDocumento } from '../utils/DocumentoUtil';

const ListaFirmatariCard = () => {

  return (
    <Card className="mb-4 custom-card">

      <div className="card-body px-4 pb-4">

        <Card.Subtitle className="mb-2 text-muted py-1 card-subtitle h6">
          <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Firmatari</h5>
        </Card.Subtitle>

        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

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
            <h5 className="px-3 pt-1" style={{ margin: "0", fontSize: "large" }}>Emiliano Protti</h5>
            <span style={{ paddingLeft: "15px" }}>emiliano.protti@gmail.com</span>
          </div>

        </div>

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
            <h5 className="px-3 pt-1" style={{ margin: "0", fontSize: "large" }}>Emiliano Protti</h5>
            <span style={{ paddingLeft: "15px" }}>emiliano.protti@gmail.com</span>
          </div>

        </div>

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
            <h5 className="px-3 pt-1" style={{ margin: "0", fontSize: "large" }}>Emiliano Protti</h5>
            <span style={{ paddingLeft: "15px" }}>emiliano.protti@gmail.com</span>
          </div>

        </div>

      </div>

    </Card>
  );
};

export default ListaFirmatariCard;
