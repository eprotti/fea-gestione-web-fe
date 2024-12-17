import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';
import TabellaContattiCard from '../components/TabellaContattiCard.jsx';
import InfoRubricaCard from '../components/InfoRubricaCard.jsx';
import { useDispatch } from 'react-redux';

const ListaContattiPage = () => {


  const dispatch = useDispatch();



  return (
    <Container className="main-container pt-5 pb-5">
      <h3 className='mb-0 py-2 h3'>Rubrica</h3>

      <hr />
      <Row>
        {/* Colonna principale per il contenuto */}
        <Col xs={12} md={8}>
          {/* <ListaContattiCard /> */}

          <TabellaContattiCard />

          <div className="mt-3">
            <a onClick={() => navigate(-1)} rel="noopener noreferrer" style={{ cursor: "pointer", fontSize: "large" }} className="mt-3 text-primary">
              <FaChevronLeft /> Torna alla homepage
            </a>
          </div>
        </Col>

        {/* Colonna laterale (opzionale, visibile su schermi più grandi) */}
        <Col xs={12} md={4}>
          <InfoRubricaCard />
        </Col>
      </Row>
    </Container>
  );
};

export default ListaContattiPage;
