import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { addNotification } from '../actions/notificationAction';

// Funzione simulata per ottenere un JWT (può essere sostituita con una vera API)
const fakeAuthAPI = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibm9tZSI6Ikxlb25hcmRvIiwiY29nbm9tZSI6IlRlc3QiLCJ1c2VybmFtZSI6Imxlb25hcmRvLnRlc3QiLCJjb2RpY2VGaXNjYWxlIjoiVFNUTFJEODBBMDFINTAxRSIsImlhdCI6MTUxNjIzOTAyMn0.E-2b37gjwpNMZVGzzaLGimWYCAErxYhDDDsyhdgypdc', // Simula un token JWT
        user: { username: 'leonardo.test', nome: 'Leonardo', cognome: 'Test', nomeCompleto: 'Leonardo Test', codiceFiscale: 'TSTLRD80A01H501E', role: 'admin' },
      });
    }, 1000);
  });
};

const Authentication = () => {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Stato per il dropdown

  const dropdownRef = useRef(null);

  const handleLogin = async () => {
    try {
      // Invia la richiesta di login
      const response = await fakeAuthAPI();
      // Salva il token JWT nel localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      setUser(response.user);
      setIsLoggedIn(true);

      let message = "Benvenuto " + response.user.nomeCompleto + ", ci sono 2 documenti da firmare in scadenza";
      dispatch(addNotification(message, "success"));
    } catch (err) {
      console.log(err);
      dispatch(addNotification("Si è verificato un errore!" + err, "error"));
    }
  };

  const handleLogout = () => {
    // Rimuovi il token JWT dal localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setDropdownOpen(false); // Chiudi il dropdown quando esci
  };

  // Funzione per aprire e chiudere il dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Effettua un controllo per ripristinare lo stato all'avvio
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      setIsLoggedIn(true);
      setUser(user);
    }
  }, []);

  // Gestione click fuori dal dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Chiudi il dropdown quando clicchi fuori
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (

    <div className="App">
      {isLoggedIn ? (
        <>
          <button onClick={toggleDropdown} className="btn btn-primary" style={{ backgroundColor: "#06c", padding: "1px", marginRight: "20px" }}>
            <FaUser style={{verticalAlign: "unset"}}/> {user?.username} <span>&#9660;</span> {/* Freccia verso il basso */}
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu-user">
              <li onClick={() => alert('Vai al profilo')}>Profilo</li>
              <li onClick={() => alert('Impostazioni')}>Impostazioni</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}

        </>
      ) : (
        <button onClick={handleLogin} className="btn btn-primary" style={{ backgroundColor: "#06c", padding: "1px", marginRight: "20px", width: "100px" }}>
          Login
        </button>
      )}
    </div>

  );
};

export default Authentication;
