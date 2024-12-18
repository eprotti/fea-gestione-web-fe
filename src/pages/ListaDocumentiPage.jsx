import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDocuments } from '../actions/DocumentActions';
import FiltroDocumentiCard from '../components/FiltroDocumentiCard';
import { Container } from 'react-bootstrap';
import ListaDocumentoItemCard from '../components/LIstaDocumentoItemCard';

const ListaDocumentiPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDocuments());
    }, [dispatch]);

    return (
        <Container className="main-container pt-5 pb-5">
            <h3 className='mb-0 py-2 h3'>Archivio Documenti</h3>

            <hr />

            <FiltroDocumentiCard />

            <ListaDocumentoItemCard />

        </Container>
    );
};

export default ListaDocumentiPage;
