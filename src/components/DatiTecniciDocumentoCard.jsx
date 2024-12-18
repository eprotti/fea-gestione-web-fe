import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { separatorDocumento } from '../utils/DocumentoUtil';

const DatiTecniciDocumentoCard = ({ documento }) => {
    // Stato per gestire l'apertura/chiusura
    const [isOpen, setIsOpen] = useState(false);

    // Funzione per toggle dell'accordion
    const toggleCard = () => setIsOpen(!isOpen);

    return (
        <Card className="mb-2 custom-card">

            <div className={`card-dati-tecnici-header ${isOpen ? 'opened' : ''}`} onClick={toggleCard}>
                <h5 className="m-a-0 text-uppercase light mt-0 mb-0">Dati tecnici </h5>
                <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
                {/* Icona per indicare se è aperta o chiusa */}
            </div>

            <div className={`card-body card-dati-tecnici-body ${isOpen ? 'open' : 'hidden'}`} style={{ paddingTop: "5px", paddingLeft: "20px", paddingRight: "20px" }}>

                <hr className={`thin-color-separator pb-2 ${separatorDocumento(documento.stato)}`} />

                <div className="row">
                    <div className="col-xs-12">
                        <div className="data-show">
                            <p className="data-text">ID Documento:</p>
                            <p className="data-value">{documento.codiceDocumento}</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="data-show">
                            <p className="data-text">Hash Documento:</p>
                            <p className="data-value">{documento.hash}</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="data-show">
                            <p className="data-text">Identity Provider SPID:</p>
                            <p className="data-value">{documento.identityProviderSpid}</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="data-show">
                            <p className="data-text">ID autenticazione SPID:</p>
                            <p className="data-value">{documento.idAutenticazioneSpid}</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="data-show">
                            <p className="data-text">Authentication Request SPID:</p>
                            <p className="data-value">
                                <textarea id="readonly-textarea" rows="4" cols="50" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. Nunc cursus nisl a dui blandit sagittis sit amet in nisi. Etiam quis diam sit amet sapien fermentum euismod vitae ac dolor. Nunc eu eleifend mi. Sed auctor, felis sed rhoncus vulputate, risus leo fermentum mauris, vitae dignissim lectus magna ullamcorper nibh. Nunc quis lectus pulvinar, consequat ante a, convallis enim. Vestibulum blandit fermentum porttitor. Donec quis accumsan nibh, in tristique ante. Fusce auctor arcu in turpis pulvinar, non tempus justo malesuada. Pellentesque bibendum ante ac tempus eleifend. Proin vitae arcu id dui fringilla ornare. Donec non augue rhoncus, consectetur sapien nec, suscipit libero. Nullam ac enim quis ex elementum blandit. In a nunc convallis, auctor nunc et, volutpat diam. Pellentesque blandit pretium orci id dictum. Mauris placerat tempus placerat." readOnly style={{ width: "100%" }} />
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="data-show">
                            <p className="data-text">Authentication Response SPID:</p>
                            <p className="data-value">
                                <textarea id="readonly-textarea" rows="4" cols="50" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. Nunc cursus nisl a dui blandit sagittis sit amet in nisi. Etiam quis diam sit amet sapien fermentum euismod vitae ac dolor. Nunc eu eleifend mi. Sed auctor, felis sed rhoncus vulputate, risus leo fermentum mauris, vitae dignissim lectus magna ullamcorper nibh. Nunc quis lectus pulvinar, consequat ante a, convallis enim. Vestibulum blandit fermentum porttitor. Donec quis accumsan nibh, in tristique ante. Fusce auctor arcu in turpis pulvinar, non tempus justo malesuada. Pellentesque bibendum ante ac tempus eleifend. Proin vitae arcu id dui fringilla ornare. Donec non augue rhoncus, consectetur sapien nec, suscipit libero. Nullam ac enim quis ex elementum blandit. In a nunc convallis, auctor nunc et, volutpat diam. Pellentesque blandit pretium orci id dictum. Mauris placerat tempus placerat." readOnly style={{ width: "100%" }} />
                            </p>
                        </div>
                    </div>
                </div>

            </div>

        </Card>
    );
};

export default DatiTecniciDocumentoCard;
