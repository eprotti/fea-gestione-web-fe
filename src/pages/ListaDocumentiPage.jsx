import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDocuments } from '../actions/DocumentActions';
import FiltroDocumentiCard from '../components/FiltroDocumentiCard';
import { Container } from 'react-bootstrap';
import ListaDocumentoItemCard from '../components/ListaDocumentoItemCard';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

const ListaDocumentiPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchDocuments());
    }, [dispatch]);

    return (
        <Container className="main-container pt-5 pb-5">
            <h3 className='mb-0 py-2 h3'>Archivio Documenti</h3>

            <hr />

            <FiltroDocumentiCard />

            <ListaDocumentoItemCard />

            <div className="mt-3">
                <a onClick={() => navigate(-1)} rel="noopener noreferrer" style={{ cursor: "pointer", fontSize: "large" }} className="mt-3 text-primary">
                    <FaChevronLeft /> Torna indietro
                </a>
            </div>

        </Container>
    );
};

export default ListaDocumentiPage;
