import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'; // Importa React-Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importa i CSS di React-Toastify
import { fetchDocuments } from '../actions/documentAction';

const DocumentListener = () => {
    const dispatch = useDispatch();

    // Otteniamo lo stato dal Redux store
    const { hasChanges } = useSelector((state) => state.documents);

    // Mostra la notifica quando `hasChanges` è vero
    useEffect(() => {
        if (hasChanges) {
            toast.info("Alcuni documenti sono stati aggiornati", {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        }
    }, [hasChanges]);  // Esegui l'effetto ogni volta che `hasChanges` cambia

    useEffect(() => {
        // Funzione di polling che recupera i documenti ogni 10 secondi
        const intervalId = setInterval(() => {
            dispatch(fetchDocuments());
        }, 60000);

        // Primo caricamento dei documenti
        dispatch(fetchDocuments());

        // Pulizia al momento dello smontaggio del componente
        return () => clearInterval(intervalId);
    }, [dispatch]); // L'array delle dipendenze include solo dispatch, per eseguire il debounced solo una volta

    return null;  // Non renderizzare nulla
};

export default DocumentListener;
