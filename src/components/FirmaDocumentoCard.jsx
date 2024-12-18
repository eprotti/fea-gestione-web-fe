import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { separatorDocumento } from '../utils/DocumentoUtil';

const FirmaDocumentoCard = ({ documento }) => {

    return (
        <Card className="mb-4 custom-card">

            <div className="card-body px-4 py-4">

                <Card.Subtitle className="mb-2 text-muted py-1">
                    <h5 className="m-a-0 text-uppercase light mt-0 mb-0">
                        Riepilogo firme
                    </h5>
                </Card.Subtitle>

                <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento(documento.stato)}`} />

                <Table borderless>
                    <thead >
                        <tr>
                            <th className='col-7'>Descrizione</th>
                            <th className='d-none d-md-table-cell col-2 text-center'>Pagina</th>
                            <th className='col-2 text-center' >Obbligatoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documento.firme.map((firma) => (
                            <tr key={firma.id}>
                                <td>{firma.titolo}</td>
                                <td className='d-none d-md-table-cell text-center'>{firma.pagina}</td>
                                <td className='text-center'>{firma.obbligatoria ? "Si" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>

        </Card >
    );
};

export default FirmaDocumentoCard;
