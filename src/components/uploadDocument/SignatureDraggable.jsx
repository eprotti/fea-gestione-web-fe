import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { useDispatch } from 'react-redux';
import { moveSignature, removeSignature } from '../../reducers/signatureReducer';
import { FaTrash } from 'react-icons/fa';
import { addNotification } from '../../actions/notificationAction';

const WIDTH = 200;
const HEIGHT = 70;

const SignatureDraggable = ({ signature, canvas }) => {
    const dispatch = useDispatch();

    const [bounds, setBounds] = useState(null);

    useEffect(() => {
        // Verifica se canvas è disponibile e se lo è, aggiorna i vincoli
        if (canvas) {
          const newBounds = {
            left: 0,
            top: 0,
            right: canvas.width - WIDTH,  // Limite destro (100px è la larghezza della firma)
            bottom: canvas.height - HEIGHT,  // Limite inferiore (50px è l'altezza della firma)
          };
          setBounds(newBounds);
        }
      }, [canvas]);  // Dipende da canvas, esegue quando canvas cambia

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
