import React, { useState } from 'react';
import { Badge, Collapse } from 'react-bootstrap';
import { FaAddressBook, FaBars, FaBell, FaChartLine, FaChevronDown, FaChevronUp, FaCog, FaCogs, FaFileAlt, FaFolder, FaHome, FaUpload } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const SidebarNavigation = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null); // Memorizza quale submenu è aperto

  const location = useLocation(); // Ottieni la posizione corrente della pagina

  // Funzione per determinare se un link è attivo
  const isActive = (path) => location.pathname === path;

  const notifications = useSelector(state => state.notifications);
  const unreadNotifications = notifications.filter(notification => !notification.isRead).length

  const toggleSidebar = () => {
    setOpenSubmenu(null);
    setCollapsed(!collapsed);
  }

  const toggleSubmenu = (submenuIndex) => {
    if (collapsed) {
      toggleSidebar();
    }

    setOpenSubmenu((prev) => (prev === submenuIndex ? null : submenuIndex));
  };

  return (
    <div className={`d-flex ${collapsed ? 'sidebar-collapsed' : ''}`} style={{ backgroundColor: "#00264D" }}>
      {/* Sidebar */}
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center">
          <button className="btn btn-dark" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>

        {/* Menu Items */}
        <ul className={`list-unstyled ${collapsed ? 'collapsed' : ''}`}>
          <li>
            <a href="/" className={`menu-item ${isActive('/') ? 'active' : ''}`} >
              <FaHome size={26} className="menu-icon" />
              {!collapsed && <span className="menu-text">Homepage</span>}
            </a>
          </li>



          <li>
            <a href="#" onClick={() => toggleSubmenu(1)} className="menu-item">
              <FaUpload size={26} className="menu-icon" />
              {!collapsed && <span className="menu-text">Gestione documento</span>}
              {!collapsed && <span style={{ float: "right" }}>{openSubmenu === 1 ? <FaChevronUp /> : <FaChevronDown />}</span>}
            </a>
            <Collapse in={openSubmenu === 1}>
              <ul className="submenu">
                <li><a href="/gestione-documento/carica">Carica</a></li>
                <li><a href="/gestione-documento/bozze">Bozze</a></li>
              </ul>
            </Collapse>
          </li>

          <li>
            <a href="#" onClick={() => toggleSubmenu(2)} className="menu-item">
              <FaCogs size={26} className="menu-icon" />
              {!collapsed && <span className="menu-text">Gestione templates</span>}
              {!collapsed && <span style={{ float: "right" }}>{openSubmenu === 2 ? <FaChevronUp /> : <FaChevronDown />}</span>}
            </a>
            <Collapse in={openSubmenu === 2}>
              <ul className="submenu">
                <li><a href="#">Categorie</a></li>
                <li><a href="#">Templates</a></li>
                <li><a href="#">Crea template</a></li>
                <li><a href="#">Pubblicazioni</a></li>
              </ul>
            </Collapse>
          </li>

          <li>
            <a href="#" onClick={() => toggleSubmenu(3)} className="menu-item">
              <FaFolder size={26} className="menu-icon" />
              {!collapsed && <span className="menu-text">Archivio</span>}
              {!collapsed && <span style={{ float: "right" }}>{openSubmenu === 3 ? <FaChevronUp /> : <FaChevronDown />}</span>}
            </a>
            <Collapse in={openSubmenu === 3}>
              <ul className="submenu">
                <li><a href="#">Ricerca per utente</a></li>
                <li><a href="#">Ricerca per documento</a></li>
                <li><a href="#">Ricerca per invio massivo</a></li>
                <li><a href="#">Ricerca per pubblicazione</a></li>
              </ul>
            </Collapse>
          </li>

          <li>
            <a href="#" onClick={() => toggleSubmenu(4)} className="menu-item">
              <FaAddressBook size={26} className="menu-icon" />
              {!collapsed && <span className="menu-text">Rubrica</span>}
              {!collapsed && <span style={{ float: "right" }}>{openSubmenu === 4 ? <FaChevronUp /> : <FaChevronDown />}</span>}
            </a>
            <Collapse in={openSubmenu === 4}>
              <ul className="submenu">
                <li><a href="#">Aggiungi contatto</a></li>
                <li><a href="#">Lista contatti</a></li>
                <li><a href="#">Crea gruppo</a></li>
                <li><a href="#">Lista gruppi</a></li>
              </ul>
            </Collapse>
          </li>

          <li>
            <a href="#" className="menu-item">
              <FaChartLine size={26} className="menu-icon" />
              {!collapsed && <span className="menu-text">Monitoraggio</span>}
            </a>
          </li>
        </ul>

        {/* Separatore */}
        <hr />

        {/* Link Notifiche */}
        <ul className={`list-unstyled ${collapsed ? 'collapsed' : ''}`}>
          <li className="mt-auto"> {/* mt-auto per spingere questo elemento alla fine */}
            <a href="/notifiche" className="menu-item">
              <FaBell size={26} className="menu-icon" />

              {(collapsed && unreadNotifications > 0) && (
                <Badge size={8} pill bg="danger" className="ml-2 pulse-notify-animation" style={{ fontSize: '12px', verticalAlign: 'baseline', marginLeft: "-8px" }}>
                  {unreadNotifications}
                </Badge>)}

              {(!collapsed && unreadNotifications > 0) && (<>
                <span className="menu-text">Notifiche </span>
                <Badge size={8} pill bg="danger" className="ml-2 pulse-notify-animation" style={{ fontSize: '12px', verticalAlign: 'baseline', marginLeft: "8px" }}>
                  {unreadNotifications}
                </Badge></>)}

              {(!collapsed && unreadNotifications <= 0) && (
                <span className="menu-text">Notifiche </span>
              )}

            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default SidebarNavigation;
