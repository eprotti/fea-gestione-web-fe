import React from 'react';
import { Card } from 'react-bootstrap';
import { useDrag } from 'react-dnd';
import { separatorDocumento } from '../utils/DocumentoUtil';

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
        <Card className="mb-4 custom-card">

            <div className="card-body px-4 pb-4">

                <Card.Subtitle className="mb-2 text-muted py-1 card-subtitle h6">
                    <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Firme</h5>
                </Card.Subtitle>

                <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />
                {signatures.map((sig) => (
                    <SignatureItem key={sig.id} signature={sig} />
                ))}
            </div>
        </Card>
    );
};

export default SignatureList;
