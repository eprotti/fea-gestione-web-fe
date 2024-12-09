import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead, removeNotification } from '../actions/NotificationActions';
import { truncateVeryShortMessage } from '../utils/NotificationUtil';
import { FaCheck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);  // Ottieni lo stato delle notifiche

  // Stato per gestire le notifiche aperte (null indica che nessuna notifica è aperta)
  const [openNotificationIndex, setOpenNotificationIndex] = useState(null);

  // Funzione per aprire/chiudere la notifica
  const toggleNotification = (index) => {
    // Se la notifica è già aperta, la chiudiamo, altrimenti la apriamo
    setOpenNotificationIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleRemove = (id) => {
    dispatch(removeNotification(id));  // Rimuovi la notifica dallo storico
  };

  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));  // Segna la notifica come letta
  };

  return (
    <Card>
      <Card.Body>
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            style={{
              backgroundColor: notification.isRead ? '#efefef' : '#ddeeff',  // Colore diverso per le notifiche lette e non lette
              padding: '10px',
              margin: '5px 0',
              borderRadius: '5px',
            }}
            onClick={() => toggleNotification(index)} // Gestione clic per aprire/chiudere
          >
            <div className='header-notify'>
              <h5 style={{ margin: "0px", marginRight: "5px", whiteSpace: "nowrap" }}>
                {notification.type === "success" && <FaCheckCircle size={16} style={{marginRight: "5px", verticalAlign: "unset", color: "#0a5"}} />}
                {notification.type === "error" && <FaTimesCircle size={16} style={{marginRight: "5px", verticalAlign: "unset", color: "#cc0000"}} />}
                <strong style={{ fontSize: "medium", textTransform: "uppercase", color: notification.type === "success" ? '#0a5' : '#cc0000' }}>
                  {notification.type}
                </strong>
              </h5>
              <span style={{ paddingRight: "5px" }} className={`${openNotificationIndex === index ? 'hidden' : ''}`}><small style={{ color: "#333" }}>{truncateVeryShortMessage(notification.message)}</small></span>
              <span><small style={{ whiteSpace: "nowrap" }}>{new Date(notification.timestamp).toLocaleString()}</small></span>
            </div>

            <div className={openNotificationIndex === index ? 'open' : 'hidden'} >
              <p className='pt-2'>{notification.message}</p>
              <div>
                <button style={{ padding: "5px", paddingRight: "10px", paddingLeft: "10px", margin: "3px", backgroundColor: "#0d6efd", color: "white" }} onClick={() => handleMarkAsRead(notification.id)}>
                  Segna come letta
                </button>
                <button style={{ padding: "5px", paddingRight: "10px", paddingLeft: "10px", margin: "3px", backgroundColor: "#666666 ", color: "white" }} onClick={() => handleRemove(notification.id)}>
                  Rimuovi
                </button>
              </div>
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default Notifications;
