import React from 'react';
import { Container } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UploadDocument from '../components/uploadDocument/UploadDocument';

const UploadDocumentPage = () => {

  const navigate = useNavigate();

  return (
    <Container className="main-container pt-5 pb-5">
      <h3 className='mb-0 py-2 h3'>Carica documento</h3>

      <hr />

      <UploadDocument />

      <div className="mt-2">
        <a onClick={() => navigate(-1)} rel="noopener noreferrer" style={{ cursor: "pointer", fontSize: "large" }} className="mt-3 text-primary">
          <FaChevronLeft /> Torna indietro
        </a>
      </div>
    </Container>
  );
};

export default UploadDocumentPage;
