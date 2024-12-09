import React, { useEffect } from 'react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Card, ProgressBar } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocuments } from '../actions/DocumentActions'; // Azione per caricare i documenti
import { addNotification } from '../actions/NotificationActions';

// Registra i componenti necessari per il grafico
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {

  const dispatch = useDispatch();

  // Otteniamo lo stato dal Redux store
  const { documents, loading, error } = useSelector((state) => state.documents);

  // Effettua la chiamata per recuperare i documenti quando il componente è montato
  useEffect(() => {
    dispatch(fetchDocuments()); // Dispatciamo l'azione per ottenere i documenti
  }, [dispatch]);

  // Se i dati sono in caricamento, mostriamo lo spinner
  if (loading) {
    return (
      <Card className="mb-3 custom-card">
        <Card.Title className="px-3 my-0">
          <h5 className='text-uppercase' style={{ color: "#5a6772" }}>Riepilogo documenti anno 2024</h5>
        </Card.Title>
        <Card.Body className='my-0 pt-0'>
          <div className="d-flex justify-content-center align-items-center" >
            <div style={{ width: '80%', padding: '20px' }}>
              <ProgressBar animated now={60} label="Caricamento..." />
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  // Se c'è un errore, mostriamo un messaggio
  if (error) {
    dispatch(addNotification("Si è verificato un errore: " + error, "error"));
  }

  // Inizializza un oggetto per contare i documenti per stato
  const counts = {
    'DA_COMPILARE': 0,
    'DA_FIRMARE': 0,
    'FIRMATO': 0,
    'SCADUTO': 0,
    'IN_ATTESA': 0,
  };

  // Conta i documenti per ciascun stato
  documents.forEach((doc) => {
    if (counts.hasOwnProperty(doc.stato)) {
      counts[doc.stato]++;
    }
  });

  // Prepara i dati per il grafico
  const chartData = {
    labels: ['Da compilare', 'Da firmare', 'Firmati', 'Scaduti', 'In attesa'],
    datasets: [
      {
        data: [
          counts['DA_COMPILARE'],
          counts['DA_FIRMARE'],
          counts['FIRMATO'],
          counts['SCADUTO'],
          counts['IN_ATTESA'],
        ],
        backgroundColor: ['#b06cec', '#2fc3c8', '#75d495', '#f98586', '#f3d757'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <Card className="mb-3 custom-card">
      <Card.Title className="px-3 my-0">
        <h5 className='text-uppercase' style={{ color: "#5a6772" }}>Riepilogo documenti anno 2024</h5>
      </Card.Title>
      <Card.Body className='my-0 pt-0'>
        <Doughnut data={chartData} options={options} />
      </Card.Body>
    </Card>
  );
};

export default PieChart;
