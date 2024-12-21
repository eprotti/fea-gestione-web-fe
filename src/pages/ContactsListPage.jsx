import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import InfoContactCard from '../components/contact/InfoContactCard';
import ContactsTableCard from '../components/contact/ContactsTableCard';

const ContactsListPage = () => {

  const navigate = useNavigate();

  return (
    <Container className="main-container pt-5 pb-5">
      <h3 className='mb-0 py-2 h3'>Rubrica</h3>

      <hr />

      <Row>
        <Col xs={12} md={8}>
          <ContactsTableCard />
        </Col>

        <Col xs={12} md={4}>
          <InfoContactCard />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={8}>
          <div className="mt-3">
            <a onClick={() => navigate(-1)} rel="noopener noreferrer" style={{ cursor: "pointer", fontSize: "large" }} className="mt-3 text-primary">
              <FaChevronLeft /> Torna indietro
            </a>
          </div>
        </Col>

        <Col xs={12} md={4}>
        </Col>
      </Row>

    </Container>
  );
};

export default ContactsListPage;
