import React, { useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import PdfViewer from './PdfViewer.jsx';

const PdfWithDrop = ({ fileUrl }) => {
    const [signatures, setSignatures] = useState([]);

    // Funzione per aggiornare la posizione di una firma esistente
    const updateSignaturePosition = (id, top, left, pageIndex) => {
        setSignatures((prev) =>
            prev.map((sig) =>
                sig.id === id ? { ...sig, top, left, pageIndex } : sig
            )
        );
    };

    // Configurazione del drop sul PDF
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ['SIGNATURE', 'PLACED_SIGNATURE'],
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            const pageElement = document
                .elementFromPoint(offset.x, offset.y)
                .closest('.rpv-core__page-layer');
            if (pageElement) {
                const pageRect = pageElement.getBoundingClientRect();
                const pageIndex = parseInt(pageElement.getAttribute('data-page-number'), 10);
                const top = offset.y - pageRect.top;
                const left = offset.x - pageRect.left;

                if (item.type === 'SIGNATURE') {
                    // Nuova firma posizionata
                    setSignatures((prev) => [
                        ...prev,
                        {
                            ...item.signature,
                            id: item.signature.id,
                            top,
                            left,
                            pageIndex,
                        },
                    ]);
                } else if (item.type === 'PLACED_SIGNATURE') {
                    // Firma già posizionata trascinata
                    updateSignaturePosition(item.id, top, left, pageIndex);
                }
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop} style={{ position: 'relative', height: '100%', width: '100%' }}>
            <PdfViewer fileUrl={fileUrl}/>
            {signatures.map((sig, index) => (
                <DraggableSignature
                    key={sig.id}
                    signature={sig}
                    updatePosition={updateSignaturePosition}
                />
            ))}
        </div>
    );
};

// Componente per le firme draggabili
const DraggableSignature = ({ signature }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'PLACED_SIGNATURE',
        item: { id: signature.id, type: 'PLACED_SIGNATURE' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            style={{
                position: 'absolute',
                top: `${signature.top}px`,
                left: `${signature.left}px`,
                backgroundColor: isDragging ? '#f0c' : '#ff0',
                padding: '5px',
                borderRadius: '3px',
                cursor: 'move',
            }}
        >
            {signature.name}
        </div>
    );
};

export default PdfWithDrop;
