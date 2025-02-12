import React from 'react';

const ObjectList = ({ objects, onSelectObject }) => {
  return (
    <div className="object-list">
      <h3>Available Objects</h3>
      <div>
        {objects.map((object) => (
          <div
            key={object.key}
            className="object-item"
            onClick={() => onSelectObject(object)} // Aggiungi l'oggetto al template
          >
            <label>{object.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObjectList;
