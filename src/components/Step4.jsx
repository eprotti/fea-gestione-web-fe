import React from 'react';
import SignatureList from './SignatureList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Step4 = () => {
    const signatures = [
        { id: 1, name: 'Firma 1' },
        { id: 2, name: 'Firma 2' },
        { id: 3, name: 'Firma 3' },
    ];

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <SignatureList signatures={signatures} />
                    </div>
                    <div className="col-md-9">
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default Step4;
