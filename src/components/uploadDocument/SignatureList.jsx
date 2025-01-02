import React from 'react';
import { useDispatch } from 'react-redux';
import { addSignature } from '../../slices/signatureSlice';
import { FaCheckCircle, FaInfoCircle, FaPlusCircle } from 'react-icons/fa';
import { addNotification } from '../../actions/notificationAction';

const SignatureList = ({ signatures }) => {
    const dispatch = useDispatch();

    const handleAddSignature = signature => {
        dispatch(addSignature({ ...signature, x: 0, y: 0 })); // Aggiungi la firma nella posizione iniziale
        dispatch(addNotification("Firma aggiunta sulla pagina", "info"));
    };

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
