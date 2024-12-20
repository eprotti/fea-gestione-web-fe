import React, { useState } from 'react';
import { Table, Button, Form, Card, Modal } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaEnvelope, FaIdCard } from 'react-icons/fa';
import { separatorDocumento } from '../utils/DocumentoUtil';
import DettaglioContattoModale from './DettaglioContattoModale';
import ModificaContattoModale from './ModificaContattoModale';
import { truncateVeryShortNominativo } from '../utils/RubricaUtil';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, updateContact } from '../actions/RubricaActions';
import ConfermaAzioneModale from './ConfermaAzioneModale';
import { addNotification } from '../actions/NotificationActions';

// Componente per visualizzare l'icona circolare con le iniziali
const InitialsIcon = ({ nome, cognome }) => {
    const initials = `${nome.charAt(0)}${cognome.charAt(0)}`.toUpperCase();

    return (
        <div
            style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#06c',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                textTransform: 'uppercase',
            }}
        >
            {initials}
        </div>
    );
};

const TabellaContattiCard = () => {

    const dispatch = useDispatch();

    const contacts = useSelector((state) => state.contacts.contacts);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedContact, setSelectedContact] = useState(null); // Contatto selezionato
    const [showDetailsModal, setShowDetailsModal] = useState(false); // Modal per dettagli
    const [showEditModal, setShowEditModal] = useState(false); // Modal per modifica
    const [showConfirmModal, setShowConfirmModal] = useState(false);


    // Funzione per filtrare i contatti in base alla ricerca
    const filterContacts = () => {
        return contacts.filter(contact =>
            contact.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.cognome.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.codiceFiscale.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // Funzione per raggruppare i contatti per iniziale del cognome
    const groupContactsByInitial = (contacts) => {
        return contacts.reduce((groups, contact) => {
            const initial = contact.cognome.charAt(0).toUpperCase(); // Prima lettera del cognome
            if (!groups[initial]) {
                groups[initial] = [];
            }
            groups[initial].push(contact);
            return groups;
        }, {});
    };

    const groupedContacts = groupContactsByInitial(filterContacts());

    // Funzione per mostrare il modal con i dettagli del contatto
    const handleShowDetails = (contact) => {
        setSelectedContact(contact);
        setShowDetailsModal(true);
    };

    // Funzione per mostrare il modal per la modifica
    const handleShowEdit = (contact) => {
        setSelectedContact(contact);
        setShowEditModal(true);
    };

    // Funzione per aprire la modale di conferma
    const handleShowConfirm = (contact) => {
        setSelectedContact(contact);
        setShowConfirmModal(true);
    };

    // Funzione per salvare le modifiche al contatto
    const handleSaveEdit = (editedContact) => {
        dispatch(updateContact(editedContact));
        setShowEditModal(false); // Chiudi la modale
        dispatch(addNotification("Contatto modificato correttamente", "info"));
    };

    // Funzione per salvare le modifiche al contatto
    const handleConfirmDelete = (contact) => {
        dispatch(deleteContact(contact.id));
        setShowConfirmModal(false); // Chiudi la modale
        dispatch(addNotification("Contatto eliminato correttamente", "info"));
    };

    // Funzione per chiudere il modal dei dettagli
    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
        setSelectedContact(null);
    };

    // Funzione per chiudere il modal della modifica
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedContact(null);
    };

    // Funzione per chiudere il modal della modifica
    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
        setSelectedContact(null);
    };

    return (
        <Card className="mb-4 custom-card">

            <div className="card-body px-4 pb-4">

                <Card.Subtitle className="mb-2 text-muted py-1 card-subtitle h6">
                    <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Contatti</h5>
                </Card.Subtitle>

                <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />
                <Form.Control
                    type="text"
                    placeholder="Cerca contatti..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Table striped bordered responsive className="table-no-inner-borders mt-4">
                    <tbody>
                        {Object.keys(groupedContacts).map(initial => (
                            <React.Fragment key={initial}>
                                <tr>
                                    <td colSpan="6" style={{ backgroundColor: '#999', color: "white", fontWeight: 'bold', textAlign: "center", fontSize: "larger", padding: "0" }}>
                                        <strong>{initial}</strong>
                                    </td>
                                </tr>
                                {groupedContacts[initial].map((contact) => (
                                    <tr key={contact.codiceFiscale}>
                                        <td>
                                            {/* Visualizza l'icona circolare con le iniziali del contatto */}
                                            <InitialsIcon nome={contact.nome} cognome={contact.cognome} />
                                        </td>
                                        <td>{truncateVeryShortNominativo(contact.nome + " " + contact.cognome)}</td>
                                        <td className='d-none d-md-block'>
                                            <div><FaEnvelope color='#888' /> {contact.email}</div>
                                            <div><FaIdCard color='#888' /> {contact.codiceFiscale}</div>
                                        </td>
                                        <td className='text-end d-xs-table-cell'>
                                            <Button variant="link" onClick={() => handleShowDetails(contact)} style={{ padding: "6px", verticalAlign: "sub" }}>
                                                <FaEye size={24} />
                                            </Button>
                                            <Button variant="link" onClick={() => handleShowEdit(contact)} style={{ padding: "6px", verticalAlign: "sub" }}>
                                                <FaEdit size={22} />
                                            </Button>
                                            <Button variant="link" onClick={() => handleShowConfirm(contact)} style={{ padding: "6px", verticalAlign: "sub" }}>
                                                <FaTrash size={22} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </Table>

                {/* Modal per visualizzare i dettagli del contatto */}
                <DettaglioContattoModale
                    show={showDetailsModal}
                    contact={selectedContact}
                    onHide={handleCloseDetailsModal}
                />

                {/* Modale per modificare il contatto */}
                <ModificaContattoModale
                    show={showEditModal}
                    contact={selectedContact}
                    onHide={handleCloseEditModal}
                    onSave={handleSaveEdit}
                />

                <ConfermaAzioneModale show={showConfirmModal}
                    payload={selectedContact}
                    onHide={handleCloseConfirmModal}
                    action={handleConfirmDelete} 
                    title="Elimina contatto"
                    message="Sei sicuro di voler eliminare questo contatto?" />

            </div>
        </Card >
    );
};

export default TabellaContattiCard;
