import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addObjectToTemplate } from '../../actions/templateAction'; // Importa la tua azione Redux

const ObjectItem = ({ key, label }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    key: key || '',  // Selezione predefinita, puoi anche usarlo come valore di default
    value: '',
    label: label || ''
  });
  
  const dispatch = useDispatch();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDrop = () => {
    if (formData.key && formData.value && formData.label) {
      dispatch(addObjectToTemplate(formData.key, formData.label, formData.value));
      setShowForm(false); // Chiudi il modulo di input dopo aver aggiunto l'oggetto
    }
  };

  return (
    <div className="object-item">
      {showForm ? (
        <div className="object-form">
          <input
            type="text"
            name="key"
            value={formData.key}
            onChange={handleInputChange}
            placeholder="Enter key"
          />
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleInputChange}
            placeholder="Enter label"
          />
          <input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleInputChange}
            placeholder="Enter value"
          />
          <button onClick={handleDrop}>Conferma</button>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)}>
          Aggiungi
        </button>
      )}
    </div>
  );
};

export default ObjectItem;
