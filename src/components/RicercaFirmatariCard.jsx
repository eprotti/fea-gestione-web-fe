import React, { useState } from 'react';
import { Tab, Nav, Card, Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { separatorDocumento } from '../utils/DocumentoUtil';
import { addFirmatario } from '../slices/caricaDocumentoSlice';
import { useDispatch } from 'react-redux';
import { FaUser, FaUsers } from 'react-icons/fa';

const RicercaFirmatariCard = () => {
  const dispatch = useDispatch();

  const [key, setKey] = useState('manual');  // Stato per la tab attiva
  const [showSearchContacts, setShowSearchContacts] = useState(false);  // Stato per mostrare la ricerca contatti
  const [showSearchGroups, setShowSearchGroups] = useState(false);  // Stato per mostrare la ricerca gruppi
  const [contactFilter, setContactFilter] = useState('');  // Filtro per contatti
  const [groupFilter, setGroupFilter] = useState('');  // Filtro per gruppi
  const [selectedContacts, setSelectedContacts] = useState([]);  // Stato per tracciare i contatti selezionati
  const [selectedGroups, setSelectedGroups] = useState([]);  // Stato per tracciare i gruppi selezionati

  // Dati di esempio per i contatti e gruppi
  const contacts = [
    { id: 1, name: 'Mario', surname: 'Rossi' },
    { id: 2, name: 'Luigi', surname: 'Bianchi' },
    { id: 3, name: 'Giovanni', surname: 'Verdi' },
    { id: 4, name: 'Anna', surname: 'Neri' },
  ];

  const groups = [
    { id: 1, name: 'Sviluppo' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'HR' },
  ];

  // Funzione per filtrare contatti
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(contactFilter.toLowerCase()) ||
    contact.surname.toLowerCase().includes(contactFilter.toLowerCase())
  );

  // Funzione per filtrare gruppi
  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(groupFilter.toLowerCase())
  );

  // Funzione per gestire la selezione dei contatti
  const handleContactSelect = (contactId) => {
    setSelectedContacts((prevSelected) =>
      prevSelected.includes(contactId)
        ? prevSelected.filter(id => id !== contactId)  // Deseleziona se già selezionato
        : [...prevSelected, contactId]  // Aggiungi se non selezionato
    );
  };

  // Funzione per gestire la selezione dei gruppi
  const handleGroupSelect = (groupId) => {
    setSelectedGroups((prevSelected) =>
      prevSelected.includes(groupId)
        ? prevSelected.filter(id => id !== groupId)  // Deseleziona se già selezionato
        : [...prevSelected, groupId]  // Aggiungi se non selezionato
    );
  };

  return (
    <Card className="mb-4 custom-card">
      <div className="card-body px-4 pb-4">
        <Card.Subtitle className="mb-2 text-muted py-1">
          <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Ricerca firmatari</h5>
        </Card.Subtitle>
        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

        {/* NavTabs per il cambio di tab */}
        <Tab.Container id="add-contact-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="manual">Manuale</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="iam">IAM</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="rubrica">Rubrica</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content className="mt-3">
            {/* Tab 1: Aggiungi Manualmente */}
            <Tab.Pane eventKey="manual">
              <Form>
                <Row className='mb-2'>
                  <Col md={6} className='mt-2'>
                    <Form.Group controlId="formName">
                      <Form.Label><strong>Nome</strong></Form.Label>
                      <Form.Control type="text" placeholder="Inserisci il nome" />
                    </Form.Group>
                  </Col>
                  <Col md={6} className='mt-2'>
                    <Form.Group controlId="formCognome">
                      <Form.Label><strong>Cognome</strong></Form.Label>
                      <Form.Control type="text" placeholder="Inserisci il cognome" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='mb-2'>
                  <Form.Group controlId="formEmail">
                    <Form.Label><strong>Email</strong></Form.Label>
                    <Form.Control type="email" placeholder="Inserisci l'email" />
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                  <Form.Group controlId="formCodiceFiscale">
                    <Form.Label><strong>Codice fiscale</strong></Form.Label>
                    <Form.Control type="text" placeholder="Inserisci il codice fiscale" />
                  </Form.Group>
                </Row>

                <Button
                  variant="secondary"
                  className='mt-4'
                  onClick={() => {
                    // Aggiungi logica per cercare e aggiungere i firmatari alla lista
                    const newFirmatario = { "codiceFiscale": "PRTMLN88C17H501D", "nomeCompleto": "Emiliano Protti", "email": "emiliano.protti@gmail.com" }; // Simulazione
                    dispatch(addFirmatario(newFirmatario));
                    setFieldValue('firmatari', ([...document.firmatari, newFirmatario]));
                  }}
                >
                  Aggiungi Firmatario
                </Button>
              </Form>
            </Tab.Pane>

            {/* Tab 2: Aggiungi da IAM */}
            <Tab.Pane eventKey="iam">
              <Form>
                <Row className='mb-2'>
                  <Form.Group controlId="formCodiceFiscale">
                    <Form.Label><strong>Inserisci il codice fiscale</strong></Form.Label>
                    <Form.Control type="text" placeholder="Inserisci il codice fiscale" />
                  </Form.Group>
                </Row>

                <Button
                  variant="secondary"
                  className='mt-4'
                  onClick={() => {
                    // Aggiungi logica per cercare e aggiungere i firmatari alla lista
                    const newFirmatario = { "codiceFiscale": "PRTMLN88C17H501D", "nomeCompleto": "Emiliano Protti", "email": "emiliano.protti@gmail.com" }; // Simulazione
                    dispatch(addFirmatario(newFirmatario));
                    setFieldValue('firmatari', ([...document.firmatari, newFirmatario]));
                  }}
                >
                  Aggiungi Firmatario
                </Button>
              </Form>
            </Tab.Pane>

            {/* Tab 3: Aggiungi da Rubrica */}
            <Tab.Pane eventKey="rubrica">
              <div>
                <div className='d-flex'>
                  {/* Bottoni per selezionare "Cerca contatto" o "Cerca gruppo" */}
                  <Button variant={showSearchContacts ? 'primary' : 'secondary'} onClick={() => { setShowSearchContacts(true); setShowSearchGroups(false); }}>
                    Cerca Contatto <FaUser style={{ marginLeft: "8px", verticalAlign: "unset" }} />
                  </Button>
                  <Button variant={showSearchGroups ? 'primary' : 'secondary'} onClick={() => { setShowSearchGroups(true); setShowSearchContacts(false); }}>
                    Cerca Gruppo <FaUsers size={24} style={{ marginLeft: "8px", verticalAlign: "sub" }} />
                  </Button>
                </div>

                {/* Sezione per cercare i contatti */}
                {showSearchContacts && (
                  <div className="mt-3">
                    <Row className='mb-2'>
                      <Form.Group controlId="formCodiceFiscale">
                        <Form.Label><strong>Cerca contatto per nome o cognome</strong></Form.Label>
                        <Form.Control
                          placeholder="nome o cognome"
                          value={contactFilter}
                          onChange={(e) => setContactFilter(e.target.value)}
                        />
                      </Form.Group>
                    </Row>


                    <ListGroup>
                    <Form.Label style={{
                        background: "#efefef",
                        marginBottom: "0",
                        padding: "4px",
                        paddingLeft: "10px",
                        color: "#444",
                        marginTop: "15px",
                        fontSize: "medium",
                        textTransform: "uppercase"
                      }}><strong>Contatti</strong></Form.Label>
                      {filteredContacts.length > 0 ? (
                        filteredContacts.map(contact => (
                          <>
                            <ListGroup.Item
                              key={contact.id}
                              onClick={() => handleContactSelect(contact.id)}
                              style={{
                                cursor: 'pointer',
                                backgroundColor: selectedContacts.includes(contact.id) ? '#cfe2f3' : 'transparent'
                              }}
                            >
                              {contact.name} {contact.surname}
                            </ListGroup.Item>
                          </>
                        ))
                      ) : (
                        <ListGroup.Item>Nessun contatto trovato</ListGroup.Item>
                      )}
                    </ListGroup>
                  </div>
                )}

                {/* Sezione per cercare i gruppi */}
                {showSearchGroups && (
                  <div className="mt-3">
                    <Row className='mb-2'>
                      <Form.Group controlId="formNomeGruppo">
                        <Form.Label><strong>Cerca gruppo per nome</strong></Form.Label>
                        <Form.Control
                          placeholder="nome gruppo"
                          value={groupFilter}
                          onChange={(e) => setGroupFilter(e.target.value)}
                        />
                      </Form.Group>
                    </Row>

                    <ListGroup>
                      <Form.Label style={{
                        background: "#efefef",
                        marginBottom: "0",
                        padding: "4px",
                        paddingLeft: "10px",
                        color: "#444",
                        marginTop: "15px",
                        fontSize: "medium",
                        textTransform: "uppercase"
                      }}><strong>Gruppi</strong></Form.Label>
                      {filteredGroups.length > 0 ? (
                        filteredGroups.map(group => (
                          <>
                            <ListGroup.Item
                              key={group.id}
                              onClick={() => handleGroupSelect(group.id)}
                              style={{
                                cursor: 'pointer',
                                backgroundColor: selectedGroups.includes(group.id) ? '#cfe2f3' : 'transparent'
                              }}
                            >
                              {group.name}
                            </ListGroup.Item>
                          </>
                        ))
                      ) : (
                        <ListGroup.Item>No gruppi trovati</ListGroup.Item>
                      )}
                    </ListGroup>
                  </div>
                )}
              </div>

              {showSearchContacts && selectedContacts.length > 0 ? (<Button
                variant="secondary"
                className='mt-4'
                onClick={() => {
                  // Aggiungi logica per cercare e aggiungere i firmatari alla lista
                  const newFirmatario = { "codiceFiscale": "PRTMLN88C17H501D", "nomeCompleto": "Emiliano Protti", "email": "emiliano.protti@gmail.com" }; // Simulazione
                  dispatch(addFirmatario(newFirmatario));
                  setFieldValue('firmatari', ([...document.firmatari, newFirmatario]));
                }}
              >
                Aggiungi contatti selezionati
              </Button>) : ""}

              {showSearchGroups && selectedGroups.length > 0 ? (<Button
                variant="secondary"
                className='mt-4'
                onClick={() => {
                  // Aggiungi logica per cercare e aggiungere i firmatari alla lista
                  const newFirmatario = { "codiceFiscale": "PRTMLN88C17H501D", "nomeCompleto": "Emiliano Protti", "email": "emiliano.protti@gmail.com" }; // Simulazione
                  dispatch(addFirmatario(newFirmatario));
                  setFieldValue('firmatari', ([...document.firmatari, newFirmatario]));
                }}
              >
                Aggiungi gruppi selezionati
              </Button>) : ""}

            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </Card >
  );
};

export default RicercaFirmatariCard;
