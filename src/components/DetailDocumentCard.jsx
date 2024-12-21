import React from 'react';
import { Card } from 'react-bootstrap';
import { isExpiring, separatorDocumento } from '../utils/documentUtil';

const DetailDocumentCard = ({ documento }) => {

    return (
        <Card className="mb-4 custom-card">
            {/* Aggiungi il badge in alto a destra se il documento è in scadenza */}
            {isExpiring(documento.dataScadenza, documento.stato) && (
                <div className="expiring-badge pulse-expire-animation">In scadenza</div>
            )}

            <div className="card-body px-4 py-4">

                <Card.Subtitle className="mb-2 text-muted py-1">
                    <h5 className="m-a-0 text-uppercase light mt-0 mb-0">Scheda documento</h5>
                </Card.Subtitle>

                <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento(documento.stato)}`} />

                <div className="row">
                    <div className="col-xs-12 col-md-4">
                        <div className="data-show">
                            <p className="data-text">Stato:</p>
                            <p className="data-value">{documento.stato}</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-4">
                        <div className="data-show">
                            <p className="data-text">Inserimento:</p>
                            <p className="data-value">{documento.dataInserimento}</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-4">
                        <div className="data-show">
                            <p className="data-text">Scadenza:</p>
                            <p className="data-value">{documento.dataScadenza}</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="data-show">
                            <p className="data-text">Predisposto da:</p>
                            <p className="data-value">{documento.predispostoDa}</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="data-show">
                            <p className="data-text">Titolo:</p>
                            <p className="data-value">{documento.titolo}</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="data-show">
                            <p className="data-text">Descrizione:</p>
                            <p className="data-value">{documento.descrizione}</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <div className="data-show">
                            <p className="data-text">Applicazione richiedente:</p>
                            <p className="data-value">{documento.applicazioneRichiedente}</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="data-show">
                            <p className="data-text">Tipologia documento:</p>
                            <p className="data-value">{documento.tipologia}</p>
                        </div>
                    </div>
                </div>

            </div>

        </Card >
    );
};

export default DetailDocumentCard;
