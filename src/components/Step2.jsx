import { ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import { Form as BootstrapForm, Button, Card, Col, Row, Table } from 'react-bootstrap';
import { BsExclamationCircle } from 'react-icons/bs'; // Icona di errore
import { separatorDocumento, truncateEmail } from '../utils/DocumentoUtil';
import { useDispatch, useSelector } from 'react-redux';
import { addFirmatario } from '../slices/caricaDocumentoSlice';
import { FaTrash } from 'react-icons/fa';

const Step2 = ({ touched, errors, setFieldValue }) => {

    const dispatch = useDispatch();

    /* Documento da caricare */
    const document = useSelector((state) => state.document);

    // Stato per memorizzare la larghezza della finestra
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Funzione per aggiornare la larghezza della finestra
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const isWindowSmall = windowWidth < 768;

    // Uso di useEffect per aggiungere e rimuovere il listener
    useEffect(() => {
        // Aggiungi il listener all'evento resize
        window.addEventListener('resize', handleResize);

        // Rimuovi il listener quando il componente viene smontato
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Card className="mb-4 custom-card">
                <div className="card-body px-4 pb-4">
                    <Card.Subtitle className="mb-2 text-muted py-1">
                        <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Ricerca firmatari</h5>
                    </Card.Subtitle>
                    <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />

                    <BootstrapForm.Group>
                        <input
                            type="text"
                            placeholder="Cerca un firmatario..."
                            className="form-control mb-4"
                            onChange={(e) => setFieldValue('search', e.target.value)}
                        />
                        <Button
                            variant="secondary"
                            onClick={() => {
                                // Aggiungi logica per cercare e aggiungere i firmatari alla lista
                                const newFirmatario = { "codiceFiscale": "PRTMLN88C17H501D", "nomeCompleto": "Emiliano Protti", "email": "emiliano.protti@gmail.com" }; // Simulazione
                                dispatch(addFirmatario(newFirmatario));
                                setFieldValue('firmatari', document.firmatari);
                            }}
                        >
                            Aggiungi Firmatario
                        </Button>
                    </BootstrapForm.Group>
                </div>
            </Card>

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
                                    <th className='col-5 '>Email</th>
                                    <th className='col-2 text-center' >Azioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {document.firmatari.map((firmatario, index) => (
                                    <tr key={index}>
                                        <td style={{ whiteSpace: "nowrap" }}>
                                            {firmatario.nomeCompleto}
                                        </td>
                                        <td className=''>{isWindowSmall ? truncateEmail(firmatario.email) : firmatario.email}</td>
                                        <td className='text-center' style={{ whiteSpace: "nowrap" }}>
                                            <a rel="noopener noreferrer" style={{ marginRight: "10px", cursor: "pointer" }}>
                                                <FaTrash size={20} />
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
        </>
    );
};

export default Step2;
