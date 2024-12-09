import React, { useEffect } from 'react';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Card, ProgressBar } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocuments } from '../actions/DocumentActions'; // Azione per caricare i documenti
import { addNotification } from '../actions/NotificationActions';

// Registra i componenti necessari per il grafico
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Definiamo l'anno corrente
const currentYear = new Date().getFullYear();

const BarChart = () => {
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
          <h5 className='text-uppercase' style={{ color: "#5a6772" }}>Totale documenti anno {currentYear}</h5>
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

  // Inizializza un oggetto per contare i documenti per stato (solo per l'anno corrente)
  const counts = {
    'DA_COMPILARE': 0,
    'DA_FIRMARE': 0,
    'FIRMATO': 0,
    'SCADUTO': 0,
    'IN_ATTESA': 0,
  };

  // Conta i documenti per ciascun stato, ma solo per l'anno corrente
  documents.forEach((doc) => {
    const docYear = new Date(doc.dataInserimento).getFullYear();
    if (docYear === currentYear && counts.hasOwnProperty(doc.stato)) {
      counts[doc.stato]++;
    }
  });

  // Prepara i dati per il grafico
  const chartData = {
    labels: ['Da Compilare', 'Da Firmare', 'Firmati', 'Scaduti', 'In Attesa'],
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
      duration: 1000, // Durata animazione
      easing: 'easeInOutQuad',
    },
    plugins: {
      title: {
        display: false,
        text: `Conteggio Documenti per Stato (${currentYear})`,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} documenti`;
          },
        },
      },
      legend: {
        display: false, // Mantieni abilitata la legenda (opzionale)
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card className="mb-3 custom-card">
      <Card.Title className="px-3 my-0">
        <h5 className='text-uppercase' style={{ color: "#5a6772" }}>Totale documenti anno {currentYear}</h5>
      </Card.Title>
      <Card.Body className='my-0 pt-0'>
        <Bar data={chartData} options={options} />
      </Card.Body>
    </Card>
  );
};

export default BarChart;
