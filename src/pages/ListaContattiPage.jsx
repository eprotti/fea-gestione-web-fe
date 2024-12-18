import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';
import TabellaContattiCard from '../components/TabellaContattiCard.jsx';
import InfoRubricaCard from '../components/InfoRubricaCard.jsx';

const ListaContattiPage = () => {

  return (
    <Container className="main-container pt-5 pb-5">
      <h3 className='mb-0 py-2 h3'>Rubrica</h3>

      <hr />

      <Row>
        <Col xs={12} md={8}>
          <TabellaContattiCard />
        </Col>

        <Col xs={12} md={4}>
          <InfoRubricaCard />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={8}>
          <div className="mt-3">
            <a onClick={() => navigate(-1)} rel="noopener noreferrer" style={{ cursor: "pointer", fontSize: "large" }} className="mt-3 text-primary">
              <FaChevronLeft /> Torna alla homepage
            </a>
          </div>
        </Col>

        <Col xs={12} md={4}>
        </Col>
      </Row>

    </Container>
  );
};

export default ListaContattiPage;
