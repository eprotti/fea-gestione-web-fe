import React from 'react';
import Draggable from 'react-draggable';
import { useDispatch } from 'react-redux';
import { moveSignature, removeSignature } from '../../slices/signatureSlice';
import { FaTrash } from 'react-icons/fa';
import { FaArrowsSplitUpAndLeft } from 'react-icons/fa6';
import { addNotification } from '../../actions/notificationAction';

const WIDTH = 200;
const HEIGHT = 70;

const SignatureDraggable = ({ signature, canvas }) => {
    const dispatch = useDispatch();

    // Impostiamo i vincoli per impedire che la firma esca dalla pagina del PDF
    const bounds = {
        left: 0,
        top: 0,
        right: 952 - WIDTH,  // Limite destro (100px è la larghezza della firma)
        bottom: 1347 - HEIGHT,  // Limite inferiore (50px è l'altezza della firma)
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
        dispatch(addNotification("Firma rimossa dalla pagina", "info"));
    };

    return (
        <Draggable
            position={{ x: signature.x, y: signature.y }}
            onStop={handleStop}
            bounds={bounds}
        // Impostiamo i limiti di movimento
        >
            <div style={{ position: "absolute", top: "0" }}>
                <div className='shadow'
                    style={{
                        color: "#333",
                        fontWeight: "bold",
                        cursor: "move",
                        padding: "10px",
                        border: "1px solid #666",
                        textAlign: "center",
                        width: `${WIDTH}px`, // Usa il formato camelCase per 'width'
                        height: `${HEIGHT}px`, // Usa il formato camelCase per 'height'
                        background: "#e6f2ff"
                    }}
                >
                    <strong>{signature.title}</strong>
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
