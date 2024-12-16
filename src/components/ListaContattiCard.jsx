import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DettaglioContattoCard from './DettaglioContattoCard';
import RubricaFormCard from './RubricaFormCard';
import { Card } from 'react-bootstrap';
import { separatorDocumento } from '../utils/DocumentoUtil';

const ListaContattiCard = () => {
    const contacts = useSelector((state) => state.contacts);
    const [contactToEdit, setContactToEdit] = useState(null);

    const groupedContacts = contacts.reduce((acc, contact) => {
        const initial = contact.surname[0].toUpperCase();
        if (!acc[initial]) acc[initial] = [];
        acc[initial].push(contact);
        return acc;
    }, {});

    const handleEdit = (contact) => {
        setContactToEdit(contact);
    };

    const handleCancelEdit = () => {
        setContactToEdit(null);
    };

    return (
        <Card className="mb-4 custom-card">

            <div className="card-body px-4 pb-4">

                <Card.Subtitle className="mb-2 text-muted py-1 card-subtitle h6">
                    <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Informazione</h5>
                </Card.Subtitle>

                <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />
                {Object.keys(groupedContacts).map((letter) => (
                    <div key={letter}>
                        <h2>{letter}</h2>
                        <div>
                            {groupedContacts[letter].map((contact) => (
                                <DettaglioContattoCard key={contact.id} contact={contact} onEdit={handleEdit} />
                            ))}
                        </div>
                    </div>
                ))}
                {contactToEdit && (
                    <RubricaFormCard contactToEdit={contactToEdit} onCancel={handleCancelEdit} />
                )}
                {!contactToEdit && <RubricaFormCard onCancel={handleCancelEdit} />}
            </div>
        </Card>
    );
};

export default ListaContattiCard;
