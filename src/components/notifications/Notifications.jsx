import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { FaCheckCircle, FaEnvelope, FaEnvelopeOpen, FaInfo, FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead, removeNotification } from '../../actions/notificationAction';
import { truncateVeryShortMessage } from '../../utils/notificationUtil';

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
    <>
      {
        notifications.map((notification, index) => (
          <Card className='mb-1 mt-1 py-1 shadow' key={notification.id} style={{ background: notification.isRead ? '#fff' : '#ffd' }}>
            <Card.Body className=' pt-1 pb-1'>

              <div
                style={{
                  margin: '5px 0',
                  borderRadius: '5px',
                }}
                onClick={() => toggleNotification(index)} // Gestione clic per aprire/chiudere
              >
                <div className='header-notify'>
                  <h5 style={{ margin: "0px", marginRight: "5px", whiteSpace: "nowrap" }}>
                    {notification.isRead && <FaEnvelopeOpen size={20} style={{ color: '#999', marginRight: '5px' }} />}
                    {!notification.isRead && <FaEnvelope size={20} style={{ color: '#06c', marginRight: '5px' }} />}
                    {notification.type === "success" && <FaCheckCircle size={18} style={{ marginRight: "5px", verticalAlign: "middle", color: "#0a5" }} />}
                    {notification.type === "info" && <FaInfo size={18} style={{ marginRight: "5px", verticalAlign: "middle", color: "#06c" }} />}
                    {notification.type === "error" && <FaTimesCircle size={18} style={{ marginRight: "5px", verticalAlign: "middle", color: "#cc0000" }} />}
                    <strong className='d-none' style={{ fontSize: "medium", textTransform: "uppercase", color: notification.type === "success" ? '#0a5' : notification.type === "info" ? '#06c' : "#cc0000" }}>
                      {notification.type}
                    </strong>
                  </h5>
                  <span style={{ paddingRight: "5px" }} className={`${openNotificationIndex === index ? 'hidden' : ''}`}>
                    <span style={{ color: "#333" }}>{notification.isRead ? truncateVeryShortMessage(notification.message) : <strong>{truncateVeryShortMessage(notification.message)}</strong>}</span>
                  </span>
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
            </Card.Body>
          </Card>
        ))
      }
    </>
  );
};

export default Notifications;
