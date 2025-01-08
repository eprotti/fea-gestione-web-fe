import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { separatorDocument } from '../../utils/documentUtil';
import { setAvailableSignatures } from '../../reducers/signatureReducer';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import PdfViewer from './PdfViewer';
import SignatureList from './SignatureList';

const Step4 = ({ values, setFieldValue }) => {

    const dispatch = useDispatch();

    const availableSignatures = useSelector(state => state.signatures.availableSignatures);
    // Filtra le firme per la pagina corrente
    const availableSignaturesNotPlaced = availableSignatures.filter(
        signature => signature.placed == false
    );

    useEffect(() => {
        // Impostiamo la lista delle firme disponibili all'inizio
        dispatch(setAvailableSignatures(convertiFirmeInFirmeGrafiche(values.firme)));
    }, [dispatch]);

    function convertiFirmeInFirmeGrafiche(firme) {
        return firme.map((firma, index) => ({
            id: index + 1,            // Aggiungi 1 all'indice per avere un id univoco
            title: firma.titolo,      // Imposta il titolo della firma
            mandatory: firma.obbligatoria, // Imposta l'obbligatorietà della firma
            placed: false,            // Inizialmente, la firma non è posizionata
            page: undefined           // La pagina è inizialmente indefinita
        }));
    }

    // Stato per gestire la visibilità della colonna destra
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // Stato per monitorare la larghezza della finestra
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const handleResize = () => {
        if (window.innerWidth < 1300) {
            setIsSmallScreen(true);  // Mostra il div se la larghezza è inferiore a 1300px
        } else {
            setIsSmallScreen(false);  // Nascondi il div se la larghezza è maggiore o uguale a 1300px
        }
    };

    // Aggiungi un listener per l'evento di resize
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        // Chiamata iniziale per settare il valore all'avvio
        handleResize();
        // Pulizia del listener al termine del ciclo di vita del componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Row>
            <Col xs={12} md={12} className="pdf-area">
                {isSmallScreen ? (
                    <div style={{ backgroundColor: 'lightblue', padding: '20px', marginTop: "20px", marginBottom: "20px" }}>
                        <h3>La funzionalità non è supportata su dispositivi con larghezza inferiore a 1300px.</h3>
                    </div>
                ) : (
                    <PdfViewer file={URL.createObjectURL(values.pdfFile)} />
                )}
            </Col>


            {/* Colonna destra fissa che si sovrappone */}
            <div style={{
                position: "relative",
                display: isSmallScreen ? 'none' : '',
            }}>
                <a className={`btn btn-primary mb-4 ${isSidebarVisible ? 'd-none' : ''}`}
                    style={{
                        position: "fixed",
                        width: "80px",
                        height: "60px",
                        right: "0px",
                        top: "200px"
                    }} onClick={toggleSidebar}>
                    <FaChevronCircleLeft size={32} className='text-white' style={{ marginTop: "8px" }} />
                </a>
                <div
                    className={`signature-area col-2 p-0 ${isSidebarVisible ? '' : 'd-none'}`}
                    style={{
                        position: 'fixed',
                        top: "200px",
                        right: 0,
                        zIndex: 1000, // Assicura che la sidebar stia sopra il contenuto
                        transition: 'transform 0.3s ease',
                        transform: isSidebarVisible ? 'translateX(0)' : 'translateX(-100%)', // Anima la comparsa/nascita della sidebar
                    }}
                >
                    <Card className="mb-4 custom-card mt-0">
                        <div className="card-body px-4 pb-4">
                            <Card.Subtitle className="mb-2 text-muted py-1 d-flex">
                                <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Firme</h5>
                                <a className={`mb-4 ${isSidebarVisible ? '' : 'd-none'}`} style={{ position: "absolute", width: "50px", top: "20px", right: "0px", cursor: "pointer" }} onClick={toggleSidebar}>
                                    <FaChevronCircleRight size={24} />
                                </a>
                            </Card.Subtitle>
                            <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocument()}`} />

                            <SignatureList signatures={availableSignaturesNotPlaced} />
                        </div>
                    </Card>
                </div>
            </div>

        </Row >
    );
};

export default Step4;
