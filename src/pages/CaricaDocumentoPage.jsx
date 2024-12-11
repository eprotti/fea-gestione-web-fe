import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CaricaDocumento from '../components/CaricaDocumento.jsx';

const CaricaDocumentoPage = () => {

  const navigate = useNavigate();

  return (
    <Container className="main-container pt-5 pb-5">
      <h1 className='mb-0 pt-2'>Carica documento</h1>
      <Row>
        {/* Colonna principale per il contenuto */}
        <Col xs={12} md={12}>

          <CaricaDocumento />

          <div className="text-end mt-3">
            <a onClick={() => navigate(-1)} rel="noopener noreferrer" style={{ cursor: "pointer", fontSize: "large" }} className="mt-3 text-primary">
              <FaChevronLeft /> Torna alla lista
            </a>
          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default CaricaDocumentoPage;
