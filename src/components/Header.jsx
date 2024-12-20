import React from 'react';
import Authentication from './Authentication';
import HorizontalbarNavigation from './HorizontalbarNavigation';

const Header = () => {

  return (
    <header className="text-white shadow-lg page-header">
      <div id="header-wrapper">
        <div id="top-nav" className="container d-flex justify-content-between align-items-center">

          <div id="top-nav-wrapper">

            <a className="text-white" href="http://www.mim.gov.it">Ministero dell'Istruzione</a>

          </div>

          <Authentication />

        </div>
        <div id="head-lead" className="container d-flex justify-content-between align-items-center">
          <div>
            <div className="logo">
              <a href="/">
                <img src="/logo-sigillo.svg" alt="Logo MIM" height="60" />
              </a>
            </div>
            <h1>
              <a href="/">SIGILLO GESTIONE</a>
              <div className="">Firma Elettronica Avanzata</div>
            </h1>
          </div>
        </div>
      </div>

      {/* Menu di navigazione orizzontale: rimuovere se attivo il componente SidebarNavigation */}
      {/* <HorizontalbarNavigation /> */}

    </header>
  );
};

export default Header;
