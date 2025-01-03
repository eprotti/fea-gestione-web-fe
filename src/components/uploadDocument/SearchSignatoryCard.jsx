import { ErrorMessage, Field, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { Button, Card, Col, Form, ListGroup, Nav, Row, Tab } from 'react-bootstrap';
import { BsExclamationCircle } from 'react-icons/bs';
import { FaUser, FaUsers } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addNotification } from '../../actions/notificationAction';
import { separatorDocumento } from '../../utils/documentUtil';
import { scrollToBottom } from '../../utils/uploadDocumentUtil';

const SearchSignatoryCard = ({ values, setFieldValue }) => {
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

  const formikRef = useRef(null);  // Riferimento a Formik per accedere alle sue funzioni
  const [formStatus, setFormStatus] = useState(null); // Stato per mostrare lo stato di validazione

  // Schema di validazione per il form
  const validationSchema = Yup.object({
    nome: Yup.string()
      .required('Il nome è obbligatorio'),
    cognome: Yup.string()
      .required('Il cognome è obbligatorio'),
    email: Yup.string()
      .email('Formato email non valido')
      .required('L\'email è obbligatoria'),
    codiceFiscale: Yup.string()
      .matches(/^[A-Z0-9]{16}$/, 'Il codice fiscale deve essere composto da 16 caratteri alfanumerici')
      .required('Il codice fiscale è obbligatorio'),
  });

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

  const handleButtonClick = async () => {
    if (key === "manual") {
      if (formikRef.current) {
        const errors = await formikRef.current.validateForm();  // Esegui la validazione
        console.log('Errori di validazione:', errors);

        // Impostiamo manualmente i campi come "toccati" per evidenziare gli errori
        formikRef.current.setTouched({
          nome: true,
          cognome: true,
          email: true,
          codiceFiscale: true,
        });

        if (Object.keys(errors).length === 0) {
          const formValues = formikRef.current.values;
          const newFirmatario = { "codiceFiscale": formValues.codiceFiscale, "nomeCompleto": formValues.nome + ' ' + formValues.cognome, "email": formValues.email };
          setFieldValue('firmatari', ([...values.firmatari, newFirmatario]));
          dispatch(addNotification("Nuovo firmatario aggiunto", "info"));
          formikRef.current.resetForm()
          scrollToBottom();
        } else {
          setFormStatus('Form contiene errori.');
        }
      }
    }
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
            <Nav.Item style={{ background: "#efefef" }}>
              <Nav.Link eventKey="manual">Manuale</Nav.Link>
            </Nav.Item>
            <Nav.Item style={{ background: "#efefef" }}>
              <Nav.Link eventKey="iam">IAM</Nav.Link>
            </Nav.Item>
            <Nav.Item style={{ background: "#efefef" }}>
              <Nav.Link eventKey="rubrica">Rubrica</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content className="mt-3">
            {/* Tab 1: Aggiungi Manualmente */}
            <Tab.Pane eventKey="manual">

              <Formik
                innerRef={formikRef}  // Assegna il riferimento a Formik
                initialValues={{
                  nome: '',
                  cognome: '',
                  email: '',
                  codiceFiscale: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log('Form inviato:', values);  // Questo viene chiamato solo al submit
                }}
              >
                {({ values, handleSubmit, errors, touched, validateForm }) => (
                  <Form noValidate onSubmit={handleSubmit}>

                    <Row className='mb-2'>
                      <Col md={6} className='mt-2'>
                        <Form.Group controlId="formName">
                          <Form.Label><strong>Nome</strong></Form.Label>
                          <Field
                            name="nome"
                            as={Form.Control}
                            type="text"
                            value={values.nome}
                          />
                          <ErrorMessage name="nome">
                            {(msg) => (
                              <div className="invalid-feedback d-block">
                                <BsExclamationCircle /> {msg}
                              </div>
                            )}
                          </ErrorMessage>
                          {/* <Form.Control type="text" ref={nomeRef} placeholder="Inserisci il nome" className='input-group' /> */}
                        </Form.Group>
                      </Col>
                      <Col md={6} className='mt-2'>
                        <Form.Group controlId="formCognome">
                          <Form.Label><strong>Cognome</strong></Form.Label>
                          <Field
                            name="cognome"
                            as={Form.Control}
                            type="text"
                            value={values.cognome}
                          />
                          <ErrorMessage name="cognome">
                            {(msg) => (
                              <div className="invalid-feedback d-block">
                                <BsExclamationCircle /> {msg}
                              </div>
                            )}
                          </ErrorMessage>
                          {/* <Form.Control type="text" ref={cognomeRef} placeholder="Inserisci il cognome" className='input-group' /> */}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Form.Group controlId="formEmail">
                        <Form.Label><strong>Email</strong></Form.Label>
                        <Field
                          name="email"
                          as={Form.Control}
                          type="email"
                          value={values.email}
                        />
                        <ErrorMessage name="email">
                          {(msg) => (
                            <div className="invalid-feedback d-block">
                              <BsExclamationCircle /> {msg}
                            </div>
                          )}
                        </ErrorMessage>
                        {/* <Form.Control type="email" ref={emailRef} placeholder="Inserisci l'email" className='input-group' /> */}
                      </Form.Group>
                    </Row>

                    <Row className='mb-2'>
                      <Form.Group controlId="formCodiceFiscale">
                        <Form.Label><strong>Codice fiscale</strong></Form.Label>
                        <Field
                          name="codiceFiscale"
                          as={Form.Control}
                          type="codiceFiscale"
                          value={values.codiceFiscale}
                        />
                        <ErrorMessage name="codiceFiscale">
                          {(msg) => (
                            <div className="invalid-feedback d-block">
                              <BsExclamationCircle /> {msg}
                            </div>
                          )}
                        </ErrorMessage>
                        {/* <Form.Control type="text" ref={codiceFiscaleRef} placeholder="Inserisci il codice fiscale" className='input-group' /> */}
                      </Form.Group>
                    </Row>

                  </Form>
                )}
              </Formik>

              <Button
                variant="secondary"
                className='mt-4'
                onClick={handleButtonClick}
              >
                Aggiungi Firmatario
              </Button>
            </Tab.Pane>

            {/* Tab 2: Aggiungi da IAM */}
            <Tab.Pane eventKey="iam">
              <Row className='mb-2'>
                <Form.Group controlId="formCodiceFiscale">
                  <Form.Label><strong>Inserisci il codice fiscale</strong></Form.Label>
                  <Form.Control type="text" placeholder="Inserisci il codice fiscale" className='input-group' />
                </Form.Group>
              </Row>

              <Button
                variant="secondary"
                className='mt-4'
                onClick={handleButtonClick}
              >
                Aggiungi Firmatario
              </Button>
            </Tab.Pane>

            {/* Tab 3: Aggiungi da Rubrica */}
            <Tab.Pane eventKey="rubrica">
              <div>
                <div className='d-flex mt-4'>
                  {/* Bottoni per selezionare "Cerca contatto" o "Cerca gruppo" */}
                  <Button variant={showSearchContacts ? 'selected' : 'unselected'} onClick={() => { setShowSearchContacts(true); setShowSearchGroups(false); }}>
                    Cerca Contatto <FaUser style={{ marginLeft: "8px", verticalAlign: "unset" }} />
                  </Button>
                  <Button variant={showSearchGroups ? 'selected' : 'unselected'} onClick={() => { setShowSearchGroups(true); setShowSearchContacts(false); }}>
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
                          className='input-group'
                        />
                      </Form.Group>
                    </Row>


                    <ListGroup>
                      <Form.Label style={{
                        background: "#efefef",
                        marginBottom: "0",
                        padding: "4px",
                        paddingLeft: "16px",
                        color: "#444",
                        marginTop: "15px",
                        fontSize: "medium",
                        textTransform: "uppercase"
                      }}><strong>Contatti</strong></Form.Label>
                      {filteredContacts.length > 0 ? (
                        filteredContacts.map(contact => (
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
                          className='input-group'
                        />
                      </Form.Group>
                    </Row>

                    <ListGroup>
                      <Form.Label style={{
                        background: "#efefef",
                        marginBottom: "0",
                        padding: "4px",
                        paddingLeft: "16px",
                        color: "#444",
                        marginTop: "15px",
                        fontSize: "medium",
                        textTransform: "uppercase"
                      }}><strong>Gruppi</strong></Form.Label>
                      {filteredGroups.length > 0 ? (
                        filteredGroups.map(group => (
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
                onClick={handleButtonClick}
              >
                Aggiungi contatti selezionati
              </Button>) : ""}

              {showSearchGroups && selectedGroups.length > 0 ? (<Button
                variant="secondary"
                className='mt-4'
                onClick={handleButtonClick}
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

export default SearchSignatoryCard;
