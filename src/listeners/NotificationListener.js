import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'; // Importa React-Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importa i CSS di React-Toastify
import { markAsDisplayed } from '../actions/NotificationActions';
import { truncateMessage } from '../utils/NotificationUtil';

const NotificationListener = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications);

  const handleMarkAsDisplayed = (id) => {
    dispatch(markAsDisplayed(id));  // Segna la notifica come letta
  };

  useEffect(() => {

    notifications.forEach(notification => {
      if (notification.message && notification.type && !notification.isDisplayed) {
        // Mostra il toast usando React-Toastify

        if (notification.type === 'success') {
          toast.success(truncateMessage(notification.message), {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
        } else if (notification.type === 'error') {
          toast.error(truncateMessage(notification.message), {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
        }

        handleMarkAsDisplayed(notification.id);
      }
    });
  }, [notifications, dispatch]);

  return null;  // Non renderizzare nulla
};

export default NotificationListener;
