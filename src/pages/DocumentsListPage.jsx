import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDocuments } from '../actions/documentAction';
import FilterDocumentsListCard from '../components/archiveDocuments/FilterDocumentsListCard';
import DocumentItemListCard from '../components/archiveDocuments/DocumentItemListCard';

const DocumentsListPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchDocuments());
    }, [dispatch]);

    return (
        <Container className="main-container pt-5 pb-5">
            <h3 className='mb-0 py-2 h3'>Archivio Documenti</h3>

            <hr />

            <FilterDocumentsListCard />

            <DocumentItemListCard />

            <div className="mt-3">
                <a onClick={() => navigate(-1)} rel="noopener noreferrer" style={{ cursor: "pointer", fontSize: "large" }} className="mt-3 text-primary">
                    <FaChevronLeft /> Torna indietro
                </a>
            </div>

        </Container>
    );
};

export default DocumentsListPage;
