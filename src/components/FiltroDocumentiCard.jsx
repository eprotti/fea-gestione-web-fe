import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { filterDocuments } from '../actions/DocumentActions';
import { Form, Button, InputGroup, FormControl, Card, Row, Col } from 'react-bootstrap';
import { separatorDocumento } from '../utils/DocumentoUtil';
import { BsExclamationCircle } from 'react-icons/bs';
import { FaChevronDown, FaChevronUp, FaFilter } from 'react-icons/fa';

const validationSchema = Yup.object({
    titolo: Yup.string().nullable(),
    descrizione: Yup.string().nullable(),
    dataInserimento: Yup.array().of(Yup.date()).nullable(),
    dataScadenza: Yup.array().of(Yup.date()).nullable(),
    stato: Yup.array().of(Yup.string()).nullable(), // Stato come array
});

const FiltroDocumentiCard = () => {
    const dispatch = useDispatch();

    // Stato per gestire l'apertura/chiusura
        const [isOpen, setIsOpen] = useState(false);
    
        // Funzione per toggle dell'accordion
        const toggleCard = () => setIsOpen(!isOpen);

    const formik = useFormik({
        initialValues: {
            titolo: '',
            descrizione: '',
            dataInserimento: ['', ''],
            dataScadenza: ['', ''],
            stato: [], // Stato è ora un array di valori selezionati
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(filterDocuments(values));
        },
    });

    // Funzione per gestire il cambiamento delle checkbox
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const updatedStates = checked
            ? [...formik.values.stato, value] // Aggiungi lo stato selezionato
            : formik.values.stato.filter((stato) => stato !== value); // Rimuovi lo stato deselezionato
        formik.setFieldValue('stato', updatedStates); // Imposta il nuovo array degli stati
    };

    return (
        <Card className="mb-1 custom-card">

            <div className={`card-dati-tecnici-header ${isOpen ? 'opened' : ''}`} onClick={toggleCard} style={{background: "#00264D", color: "white", padding: "12px", paddingLeft: "20px"}}>
                <Card.Subtitle className="mb-0 text-muted py-1">
                    <h5 className="m-a-0 text-uppercase light mt-0 mb-0" style={{color: "white"}}><FaFilter size={20} color='#ccc' style={{marginRight: "6px"}} /> Ricerca</h5>
                </Card.Subtitle>
                <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                {/* Icona per indicare se è aperta o chiusa */}
            </div>

            <div className={`card-body ${isOpen ? 'open' : 'hidden'}`} style={{ paddingTop: "20px", paddingLeft: "30px", paddingRight: "30px", paddingBottom: "30px" }}>

                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col xs={12} md={6} className='pt-2'>
                            <Form.Group>
                                <Form.Label><strong>Titolo</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="titolo"
                                    value={formik.values.titolo}
                                    onChange={formik.handleChange}
                                    className={`input-group`}

                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} className='pt-2'>
                            <Form.Group>
                                <Form.Label><strong>Descrizione</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="descrizione"
                                    value={formik.values.descrizione}
                                    onChange={formik.handleChange}
                                    className={`input-group`}

                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={6} className='pt-2'>
                            <Form.Group>
                                <Form.Label><strong>Data Inserimento</strong></Form.Label>
                                <InputGroup className='input-group'>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <div className='px-1 py-1'>Da</div>
                                            <FormControl
                                                type="date"
                                                name="dataInserimento[0]"
                                                value={formik.values.dataInserimento[0]}
                                                onChange={formik.handleChange}
                                                className={`input-group`}
                                                style={{ width: "100%" }}
                                            />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <div className='px-1 py-1'>a</div>
                                            <FormControl
                                                type="date"
                                                name="dataInserimento[1]"
                                                value={formik.values.dataInserimento[1]}
                                                onChange={formik.handleChange}
                                                className={`input-group`}
                                                style={{ width: "100%" }}
                                            />
                                        </Col>
                                    </Row>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6} className='pt-2'>
                            <Form.Group>
                                <Form.Label><strong>Data Scadenza</strong></Form.Label>
                                <InputGroup className='input-group'>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <div className='px-1 py-1'>Da</div>
                                            <FormControl
                                                type="date"
                                                name="dataScadenza[0]"
                                                value={formik.values.dataScadenza[0]}
                                                onChange={formik.handleChange}
                                                className={`input-group`}
                                                style={{ width: "100%" }}
                                            />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <div className='px-1 py-1'>a</div>
                                            <FormControl
                                                type="date"
                                                name="dataScadenza[1]"
                                                value={formik.values.dataScadenza[1]}
                                                onChange={formik.handleChange}
                                                className={`input-group`}
                                                style={{ width: "100%" }}
                                            />
                                        </Col>
                                    </Row>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mb-5'>
                        <Col xs={12} md={12} className='pt-2'>
                            <Form.Group>
                                <Form.Label><strong>Stato</strong></Form.Label>
                                <Row className='input-group' style={{ display: "flex", marginLeft: "0px" }}>
                                    <Col xs={12} md={2}>
                                        {/* Checkbox per selezionare gli stati */}
                                        <Form.Check
                                            type="checkbox"
                                            label="Da Firmare"
                                            value="da firmare"
                                            checked={formik.values.stato.includes("da firmare")}
                                            onChange={handleCheckboxChange}
                                        />
                                    </Col>
                                    <Col xs={12} md={2}>
                                        <Form.Check
                                            type="checkbox"
                                            label="Firmato"
                                            value="firmato"
                                            checked={formik.values.stato.includes("firmato")}
                                            onChange={handleCheckboxChange}
                                        />
                                    </Col>
                                    <Col xs={12} md={3}>
                                        <Form.Check
                                            type="checkbox"
                                            label="Parzialmente Firmato"
                                            value="parzialmente firmato"
                                            checked={formik.values.stato.includes("parzialmente firmato")}
                                            onChange={handleCheckboxChange}
                                        />
                                    </Col>
                                    <Col xs={12} md={2}>
                                        <Form.Check
                                            type="checkbox"
                                            label="Annullato"
                                            value="annullato"
                                            checked={formik.values.stato.includes("annullato")}
                                            onChange={handleCheckboxChange}
                                        />
                                    </Col>
                                    <Col xs={12} md={2}>
                                        <Form.Check
                                            type="checkbox"
                                            label="Scaduto"
                                            value="scaduto"
                                            checked={formik.values.stato.includes("scaduto")}
                                            onChange={handleCheckboxChange}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit">Filtra</Button>
                </Form>
            </div>
        </Card>
    );
};

export default FiltroDocumentiCard;
