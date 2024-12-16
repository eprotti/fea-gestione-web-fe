import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addContact, updateContact } from '../actions/RubricaActions';

const RubricaFormCard = ({ contactToEdit, onCancel }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setSurname(contactToEdit.surname);
      setPhone(contactToEdit.phone);
    }
  }, [contactToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: contactToEdit ? contactToEdit.id : Date.now(),
      name,
      surname,
      phone,
    };

    if (contactToEdit) {
      dispatch(updateContact(newContact));
    } else {
      dispatch(addContact(newContact));
    }

    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Surname</label>
        <input
          type="text"
          className="form-control"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          className="form-control"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default RubricaFormCard;
