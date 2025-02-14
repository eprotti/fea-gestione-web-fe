import React from 'react';
import { Col } from 'react-bootstrap';
import { useDrag, useDrop } from 'react-dnd';
import { FaPlusCircle } from 'react-icons/fa';

// Funzione per spostare un oggetto tra righe e colonne
const moveObject = (object, sourceRowIndex, sourceColumnIndex, targetRowIndex, targetColumnIndex, template, setTemplate) => {
  const updatedTemplate = [...template];

  // Rimuovi l'oggetto dalla riga e colonna di origine
  const [removedObject] = updatedTemplate[sourceRowIndex][sourceColumnIndex].splice(object.index, 1);

  // Aggiungi l'oggetto alla riga e colonna di destinazione
  updatedTemplate[targetRowIndex][targetColumnIndex].push(removedObject);

  // Aggiorna il template
  setTemplate(updatedTemplate);
};

const Template = ({ template, setTemplate, addNewRow, addNewColumn }) => {
  return (
    <>
    <div className="template">
      {template.map((row, rowIndex) => (
        <div key={rowIndex} className="row-container">
          <div className="row-content">
            <Row rowIndex={rowIndex} row={row} template={template} setTemplate={setTemplate} />
          </div>
          <button
            className="add-column-button"
            onClick={() => addNewColumn(rowIndex)}
            disabled={row.length >= 8} // Controlla il numero di colonne
          >
            <FaPlusCircle /> Aggiungi colonna
          </button>
        </div>
      ))}
    </div>
    <button onClick={addNewRow} className="add-row-button"><FaPlusCircle /> Aggiungi riga</button>
    </>
  );
};

const Row = ({ rowIndex, row, template, setTemplate }) => {
  return (
    <div className="row">
      {row.map((column, columnIndex) => (
        <Column
          key={columnIndex}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          column={column}
          template={template}
          setTemplate={setTemplate}
        />
      ))}
    </div>
  );
};

const Column = ({ rowIndex, columnIndex, column, template, setTemplate }) => {
  const [, drop] = useDrop({
    accept: 'OBJECT',
    drop: (item) => {
      if (item.sourceRowIndex !== rowIndex || item.sourceColumnIndex !== columnIndex) {
        moveObject(item.object, item.sourceRowIndex, item.sourceColumnIndex, rowIndex, columnIndex, template, setTemplate);
      }
    },
  });

  return (
    <Col ref={drop} className="column">
      {column.map((object, index) => (
        <DraggableObject
          key={object.key}
          object={object}
          index={index}
          sourceRowIndex={rowIndex}
          sourceColumnIndex={columnIndex}
          moveObject={(object, sourceRowIndex, sourceColumnIndex, targetRowIndex, targetColumnIndex) =>
            moveObject(object, sourceRowIndex, sourceColumnIndex, targetRowIndex, targetColumnIndex, template, setTemplate)
          }
        />
      ))}
    </Col>
  );
};

const DraggableObject = ({ object, index, sourceRowIndex, sourceColumnIndex, moveObject }) => {
  const [, drag] = useDrag({
    type: 'OBJECT',
    item: { object, index, sourceRowIndex, sourceColumnIndex },
  });

  return (
    <div ref={drag} className="template-object">
      <label>{object.label}</label>
      {object.key === 'text' && <p>{object.value}</p>}
      {object.key === 'input' && <p><input type="text" value={object.value} /></p>}
      {object.key === 'textarea' && <p><textarea value={object.value} /></p>}
    </div>
  );
};

export default Template;
