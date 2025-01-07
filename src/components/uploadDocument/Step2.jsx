import { ErrorMessage } from 'formik';
import React from 'react';
import { Form as BootstrapForm, Card, Col, Row, Table } from 'react-bootstrap';
import { BsExclamationCircle } from 'react-icons/bs'; // Icona di errore
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../actions/notificationAction';
import { addFirmatario, removeFirmatario } from '../../slices/uploadDocumentSlice';
import { separatorDocumento } from '../../utils/documentUtil';
import RicercaFirmatariCard from './SearchSignatoryCard';
import TipologiaFirmaCard from './InfoSignatureTypeCard';

const Step2 = ({ values, touched, errors, setFieldValue, isSubmitting }) => {

    const dispatch = useDispatch();

    const handleRemoveFirmatario = (firmatarioToRemove) => {
        const updatedFirmatari = values.firmatari.filter((f) => f.codiceFiscale !== firmatarioToRemove.codiceFiscale);
        setFieldValue('firmatari', updatedFirmatari);
        dispatch(addNotification("Firmatario rimosso", "info"));
    };

    return (
        <Row>
            <Col xs={12} md={8}>

                <RicercaFirmatariCard values={values} addFirmatario={addFirmatario} removeFirmatario={removeFirmatario} setFieldValue={setFieldValue} />

                <Card className="mb-4 custom-card">
                    <div className="card-body px-4 pb-4">
                        <Card.Subtitle className="mb-2 text-muted py-1">
                            <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Firmatari Aggiunti</h5>
                        </Card.Subtitle>
                        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />
                        <BootstrapForm.Group>

                            <Table borderless>
                                <thead >
                                    <tr>
                                        <th className='col-5 '>Nome E Cognome</th>
                                        <th className='col-5 d-none d-sm-table-cell'>Email</th>
                                        <th className='col-2 text-center' >Azioni</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {values.firmatari.map((firmatario) => (
                                        <tr key={firmatario.codiceFiscale}>
                                            <td style={{ whiteSpace: "nowrap" }}>
                                                {firmatario.nomeCompleto}
                                            </td>
                                            <td className='d-none d-sm-table-cell'>{firmatario.email}</td>
                                            <td className='text-center' style={{ whiteSpace: "nowrap" }}>
                                                <a rel="noopener noreferrer" style={{ marginRight: "10px", cursor: "pointer" }}>
                                                    <FaTrash size={20} onClick={() => handleRemoveFirmatario(firmatario)} />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <ErrorMessage name="firmatari">
                                {(msg) => (
                                    <div className="invalid-feedback d-block">
                                        <BsExclamationCircle /> {msg}
                                    </div>
                                )}
                            </ErrorMessage>
                        </BootstrapForm.Group>
                    </div>
                </Card>

            </Col>

            <Col xs={12} md={4}>
                <TipologiaFirmaCard />
            </Col>

        </Row>
    );
};

export default Step2;
