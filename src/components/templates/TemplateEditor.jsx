import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ObjectList from './ObjectList.jsx';
import Template from './Template.jsx';

const TemplateEditor = () => {

  const [template, setTemplate] = useState([[[]]]); // Un array con una riga iniziale

  const objects = [
    { key: 'input', label: 'Input Field', value: '' },
    { key: 'textarea', label: 'Text Area', value: '' },
    { key: 'text', label: 'Text', value: 'Sample text' },
  ];

  const handleSelectObject = (object) => {
    const updatedTemplate = [...template];
    updatedTemplate[0][0].push(object);
    setTemplate(updatedTemplate);
  };


  // Funzione per aggiungere una nuova riga
  const addNewRow = () => {
    const updatedTemplate = [...template, [[]]]; // Aggiungi una nuova riga con 3 colonne vuote
    setTemplate(updatedTemplate);
  };

  // Funzione per aggiungere una colonna a una riga (limite massimo di 12 colonne)
  const addNewColumn = (rowIndex) => {
    if (template[rowIndex][0].length < 8) {
      const updatedTemplate = [...template];
      updatedTemplate[rowIndex].push([]);
      setTemplate(updatedTemplate);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Row>
        <Col md={10}>
          <Template template={template} setTemplate={setTemplate} addNewRow={addNewRow} addNewColumn={addNewColumn} />
        </Col>
        <Col md={2}>
          <ObjectList objects={objects} onSelectObject={handleSelectObject} />
        </Col>
      </Row>
    </DndProvider>
  );
};

export default TemplateEditor;
