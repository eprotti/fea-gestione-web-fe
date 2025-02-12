import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TemplateEditor from '../components/templates/TemplateEditor';


const TemplatePage = () => {

  const navigate = useNavigate();

  return (
    <Container fluid className="main-container pt-5 pb-5">
      <h3 className='mb-0 py-2 h3'>Gestione template</h3>

      <hr />
      <TemplateEditor />
    </Container>
  );
};

export default TemplatePage;
