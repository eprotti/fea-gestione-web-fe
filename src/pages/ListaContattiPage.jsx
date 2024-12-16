import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';
import ListaContattiCard from '../components/ListaContattiCard.jsx';

const ListaContattiPage = () => {

  return (
    <Container className="main-container pt-5 pb-5">
      <h3 className='mb-0 pt-2'>Lista contatti</h3>
      <Row>
        {/* Colonna principale per il contenuto */}
        <Col xs={12} md={12}>
          <ListaContattiCard />

          <div className="text-end mt-3">
            <a onClick={() => navigate(-1)} rel="noopener noreferrer" style={{ cursor: "pointer", fontSize: "large" }} className="mt-3 text-primary">
              <FaChevronLeft /> Torna alla lista
            </a>
          </div>
        </Col>

        {/* Colonna laterale (opzionale, visibile su schermi più grandi) */}
        {/* <Col xs={12} md={4}>
          <ScaricaDocumentoCard documento={documento} />
        </Col> */}
      </Row>
    </Container>
  );
};

export default ListaContattiPage;
