import React from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../actions/NotificationActions';
import Notifications from '../components/Notifications';
import { Container, Row, Col, Card } from 'react-bootstrap';

const App = () => {
  const dispatch = useDispatch();

  const addNotificationHandler = (message, type) => {
    dispatch(addNotification(message, type));  // Aggiungi la notifica allo stato Redux
  };

  return (
    <Container className="main-container pt-5 pb-5">
      <h3 className='mb-0 py-2 h3'>Notifiche</h3>

      <hr />
      <Row>
        {/* Colonna principale per il contenuto */}
        <Col xs={12} md={8}>
          <Notifications /> {/* Mostra le notifiche */}

          <Card>
            <Card.Body className='px-5 pt-1 pb-1'>
              <button className='pt-2 btn btn-primary my-2' onClick={() => addNotificationHandler('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. Nunc cursus nisl a dui blandit sagittis sit amet in nisi. Etiam quis diam sit amet sapien fermentum euismod vitae ac dolor. Nunc eu eleifend mi. Sed auctor, felis sed rhoncus vulputate, risus leo fermentum mauris, vitae dignissim lectus magna ullamcorper nibh. Nunc quis lectus pulvinar, consequat ante a, convallis enim. Vestibulum blandit fermentum porttitor. Donec quis accumsan nibh, in tristique ante. Fusce auctor arcu in turpis pulvinar, non tempus justo malesuada. Pellentesque bibendum ante ac tempus eleifend. Proin vitae arcu id dui fringilla ornare. Donec non augue rhoncus, consectetur sapien nec, suscipit libero. Nullam ac enim quis ex elementum blandit. In a nunc convallis, auctor nunc et, volutpat diam. Pellentesque blandit pretium orci id dictum. Mauris placerat tempus placerat.', 'success')}>
                <span style={{ whiteSpace: "nowrap" }}>Aggiungi notifica success</span>
              </button>
              <button className='pt-2 btn btn-error my-2' onClick={() => addNotificationHandler('Notifica di esempio (errore)', 'error')}>
                <span style={{ whiteSpace: "nowrap" }}>Aggiungi notifica errore</span>
              </button>
            </Card.Body>
          </Card>
        </Col>

        {/* Colonna laterale (opzionale, visibile su schermi più grandi) */}
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Card</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. Nunc cursus nisl a dui blandit sagittis sit amet in nisi. Etiam quis diam sit amet sapien fermentum euismod vitae ac dolor. Nunc eu eleifend mi. Sed auctor, felis sed rhoncus vulputate, risus leo fermentum mauris, vitae dignissim lectus magna ullamcorper nibh. Nunc quis lectus pulvinar, consequat ante a, convallis enim. Vestibulum blandit fermentum porttitor. Donec quis accumsan nibh, in tristique ante. Fusce auctor arcu in turpis pulvinar, non tempus justo malesuada. Pellentesque bibendum ante ac tempus eleifend. Proin vitae arcu id dui fringilla ornare. Donec non augue rhoncus, consectetur sapien nec, suscipit libero. Nullam ac enim quis ex elementum blandit. In a nunc convallis, auctor nunc et, volutpat diam. Pellentesque blandit pretium orci id dictum. Mauris placerat tempus placerat.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container >
  );
};

export default App;
