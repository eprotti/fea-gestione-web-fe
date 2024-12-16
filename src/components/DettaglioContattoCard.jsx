import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../actions/RubricaActions';

const DettaglioContattoCard = ({ contact, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div className="contact-item">
      <h5>{contact.name} {contact.surname}</h5>
      <p>{contact.phone}</p>
      <button className="btn btn-warning" onClick={() => onEdit(contact)}>Edit</button>
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DettaglioContattoCard;
