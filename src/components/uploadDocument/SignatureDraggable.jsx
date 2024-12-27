import React from 'react';
import Draggable from 'react-draggable';
import { useDispatch } from 'react-redux';
import { moveSignature, removeSignature } from '../../slices/signatureSlice';
import { FaTrash } from 'react-icons/fa';

const SignatureDraggable = ({ signature, canvas }) => {
    const dispatch = useDispatch();

    // Impostiamo i vincoli per impedire che la firma esca dalla pagina del PDF
    const bounds = {
        left: 0,
        top: -1100,
        right: 604,  // Limite destro (100px è la larghezza della firma)
        bottom: -70,  // Limite inferiore (50px è l'altezza della firma)
    };

    // Gestiamo il termine del movimento
    const handleStop = (e, data) => {
        // Posizione finale (dopo il movimento)
        const { x, y } = data;

        // Impediamo alla firma di uscire dai confini (il valore di x e y è già limitato dai bounds)
        dispatch(moveSignature({ id: signature.id, x, y }));
    };

    const handleRemove = () => {
        dispatch(removeSignature(signature.id));  // Rimuovi la firma usando l'id
    };

    return (
        <Draggable
            position={{ x: signature.x, y: signature.y }}
            onStop={handleStop}
            bounds={bounds}
        // Impostiamo i limiti di movimento
        >
            <div style={{ position: "absolute" }}>
                <div className='shadow'
                    style={{
                        color: "#333",
                        fontWeight: "bold",
                        cursor: "move",
                        padding: "10px",
                        border: "4px solid #ccc",
                        textAlign: "center",
                        width: "200px",
                        height: "70px",
                        background: "#fff"
                    }}
                >
                    {signature.title}
                </div>
                <button
                    style={{
                        position: "absolute",
                        bottom: "0px",
                        right: "-5px",
                        fontSize: "small",
                        background: "none",
                        color: "#dd0000",
                        border: "none",
                        cursor: "pointer",
                    }}
                    onClick={handleRemove}
                >
                    <FaTrash /> Rimuovi
                </button>
            </div>
        </Draggable >
    );
};

export default SignatureDraggable;
