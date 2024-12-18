import React from 'react';
import { ToastContainer } from 'react-toastify'; // Importa ToastContainer da React-Toastify
import NotificationListener from './listeners/NotificationListener';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header'; // Importa il componente Header
import SidebarNavigation from './components/SidebarNavigation';
import DocumentListener from './listeners/DocumentListener';
import DettaglioDocumentoPage from './pages/DettaglioDocumentoPage';
import HomePage from './pages/HomePage';
import NotifichePage from './pages/NotifichePage';
import CaricaDocumentoPage from './pages/CaricaDocumentoPage';
import ListaContattiPage from './pages/ListaContattiPage';
import ListaDocumentiPage from './pages/ListaDocumentiPage';

const App = () => {

  const containerApp = () => {
    return <div className="container-app" >
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/gestione-documento/carica" element={<CaricaDocumentoPage />} />
        <Route path="/rubrica/lista-contatti" element={<ListaContattiPage />} />
        <Route path="/archivio-documenti/lista-documenti" element={<ListaDocumentiPage />} />

        <Route path="/archivio/dettaglio-documento/:codiceDocumento" element={<DettaglioDocumentoPage />} />

        <Route path="/notifiche" element={<NotifichePage />} />
      </Routes>

    </div>
  }

  return (
    <Router>
      <Header />

      {/* Menu di navigazione laterale: rimuovere se attivo il componente HorizontalbarNavigation */}
      <SidebarNavigation>
        {containerApp()}
      </SidebarNavigation>

      {/* Menu di navigazione orizzontale */}
      {/* {containerApp()} */}

      {/* Contenitore per i toast */}
      <ToastContainer />

      {/* Aggiungi il componente NotificationListener per gestire la visualizzazione delle notifiche */}
      <NotificationListener />

      {/* Aggiungi il componente DocumentListener per gestire le notifiche per l'aggiornamento dei documenti' */}
      <DocumentListener />

      {/* Footer visibile su tutte le pagine */}
      < Footer />

    </Router >
  );
};

export default App;
