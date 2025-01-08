import React, { useEffect, useRef } from 'react';
import { FaInfoCircle, FaPlusCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../actions/notificationAction';
import { addSignature } from '../../reducers/signatureReducer';
import { useFormikContext } from 'formik';  // Importa useFormikContext per lavorare con Formik

const SignatureList = ({ signatures }) => {
    const dispatch = useDispatch();

    const { setFieldValue, values } = useFormikContext();  // Ottieni setFieldValue da Formik
    const prevSignaturesLength = useRef(signatures.length);  // Ref per tenere traccia della lunghezza precedente

    const handleAddSignature = signature => {
        dispatch(addSignature({ ...signature, x: 0, y: 0 })); // Aggiungi la firma nella posizione iniziale
        dispatch(addNotification("Firma aggiunta sulla pagina", "info"));
    };

    const checkSignPosition = () => {
        // Verifica la lunghezza delle firme e aggiorna solo se necessario
        const currentLength = signatures.length;

        // Confronta con il valore precedente
        if (currentLength !== prevSignaturesLength.current) {
            // Se la lunghezza è cambiata, aggiorna lo stato
            if (currentLength === 0 && values.checkPosizionamentoFirme !== true) {
                setFieldValue('checkPosizionamentoFirme', true);
            } else if (currentLength > 0 && values.checkPosizionamentoFirme !== false) {
                setFieldValue('checkPosizionamentoFirme', false);
            }

            // Memorizza il nuovo valore
            prevSignaturesLength.current = currentLength;
        }
    };

    useEffect(() => {
        checkSignPosition();  // Esegui il controllo della posizione solo quando necessario
    }, [signatures, setFieldValue, values.checkPosizionamentoFirme]);  // Aggiungi dipendenze correttamente

    return (<>

        {Array.isArray(signatures) && signatures.length > 0 ? (
            signatures.map(signature => (
                <div key={signature.id}
                    className='d-flex'
                    style={{
                        color: "#333",
                        fontWeight: "bold",
                        padding: "20px",
                        background: "#e6f2ff",
                        marginTop: "10px"
                    }}
                >
                    <div style={{ width: "100%" }}><strong>{signature.title}</strong></div>
                    <a
                        className='text-end'
                        style={{
                            cursor: 'pointer',
                            whiteSpace: "nowrap"
                        }}
                        onClick={() => handleAddSignature(signature)} >
                        <FaPlusCircle /> Aggiungi
                    </a>
                </div>
            ))
        ) : (
            <p style={{
                borderRadius: "8px",
                backgroundColor: "#fff",
                marginTop: "20px",
                textAlign: "center",
                padding: "10px",
                fontSize: "large"
            }}><FaInfoCircle size={24} color='#06c' style={{ marginRight: "10px" }} /><span>Hai posizionato tutte le firme disponibili</span></p >
        )}
    </>
    )

}

export default SignatureList;
