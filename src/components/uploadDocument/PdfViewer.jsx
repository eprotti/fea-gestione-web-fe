import * as pdfjsLib from 'pdfjs-dist';
import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'react-bootstrap';
import { separatorDocumento } from '../../utils/documentUtil';
import SignatureDraggable from './SignatureDraggable';
import { changePage } from '../../slices/signatureSlice';
import { useDispatch, useSelector } from 'react-redux';

const PdfViewer = ({ file }) => {
  const dispatch = useDispatch();

  const [pdf, setPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const canvasRef = useRef(null);
  const divRef = useRef(null);
  const [scale, setScale] = useState(1.6);  // Scala per il PDF

  const placedSignatures = useSelector(state => state.signatures.placedSignatures);
  const currentPage = useSelector(state => state.signatures.currentPage);

  // Filtra le firme per la pagina corrente
  const signaturesForCurrentPage = placedSignatures.filter(
    signature => signature.page === currentPage
  );

  // Imposta pdf.js worker
  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
  }, []);

  // Carica il PDF
  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(file);
      try {
        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
        renderPage(1, pdfDoc);  // Renderizza la prima pagina
      } catch (error) {
        console.error('Errore nel caricamento del PDF:', error);
      }
    };

    loadPdf();
  }, [file]);

  // Funzione per renderizzare la pagina PDF
  const renderPage = (pageNum, pdfDoc) => {
    pdfDoc.getPage(pageNum).then((page) => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const viewport = page.getViewport({ scale });

      // Imposta le dimensioni del canvas
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Impostare le dimensioni del div
      const div = divRef.current;
      if (div) {
        div.style.width = `${canvas.width}px`;
        div.style.height = `${canvas.height}px`;
      }

      // Rende la pagina PDF sul canvas
      page.render({
        canvasContext: context,
        viewport: viewport,
      });
    });
  };

  // Funzione per cambiare pagina
  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
      renderPage(pageNumber + 1, pdf);
      dispatch(changePage(pageNumber + 1));
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      renderPage(pageNumber - 1, pdf);
      dispatch(changePage(pageNumber - 1));
    }
  };

  return (
    <Card className="mb-4 custom-card">
      <div className="card-body px-4 pb-4">
        <Card.Subtitle className="mb-2 text-muted py-1">
          <h5 className="m-a-0 text-uppercase light mt-1 mb-0">Documento PDF</h5>
        </Card.Subtitle>
        <hr className={`thin-color-separator pb-2 mt-2 ${separatorDocumento()}`} />
        <div style={{ textAlign: "center" }}>
          <button onClick={goToPreviousPage} disabled={pageNumber <= 1}>
            Precedente
          </button>
          <span>
            {pageNumber} di {numPages}
          </span>
          <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
            Successivo
          </button>
        </div>
        <div className="mt-2" ref={divRef} style={{ position: 'relative', textAlign: "center", margin: "0 auto" }}>
          <canvas ref={canvasRef} style={{ border: "1px solid #ccc" }}></canvas>
          {signaturesForCurrentPage.map(signature => (
            <SignatureDraggable key={signature.id} signature={signature} canvas={canvasRef.current} />
          ))}
        </div>
      </div>
    </Card>

  );
};

export default PdfViewer;
