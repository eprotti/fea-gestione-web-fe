import React from 'react';
import { useDrag } from 'react-dnd';

const SignatureItem = ({ signature, onDragStart }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'SIGNATURE',
        item: { signature },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            style={{
                padding: '8px',
                margin: '4px',
                backgroundColor: isDragging ? '#ddd' : '#fff',
                border: '1px solid #ccc',
                cursor: 'move',
            }}
        >
            {signature.name}
        </div>
    );
};

const SignatureList = ({ signatures }) => {
    return (
        <div style={{ padding: '10px', borderRight: '1px solid #ddd' }}>
            {signatures.map((sig) => (
                <SignatureItem key={sig.id} signature={sig} />
            ))}
        </div>
    );
};

export default SignatureList;
