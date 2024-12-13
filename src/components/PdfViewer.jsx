import React, { useEffect, useRef } from 'react';
import PSPDFKit from 'pspdfkit';

const PdfViewer = ({ fileUrl }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let pspdfkitInstance = null;

    // Carica PSPDFKit quando il componente è montato
    const loadPdf = async () => {
      try {
        pspdfkitInstance = await PSPDFKit.load({
          container: containerRef.current,
          document: fileUrl,  // URL o Blob del PDF
          baseUrl: window.location.origin + '/pspdfkit-lib/',  // Percorso base per le librerie
        });
        console.log("PSPDFKit caricato con successo!");
      } catch (error) {
        console.error("Errore durante il caricamento di PSPDFKit:", error);
      }
    };

    loadPdf();

    // Smonta PSPDFKit quando il componente viene smontato
    return () => {
      if (pspdfkitInstance) {
        pspdfkitInstance.unload().then(() => {
          console.log("PSPDFKit smontato correttamente");
        }).catch((error) => {
          console.error("Errore durante lo smontaggio di PSPDFKit:", error);
        });
      }
    };
  }, [fileUrl]); // Ricarica quando fileUrl cambia

  return (<div ref={containerRef} style={{ width: '100%', height: '600px' }} />);
};

export default PdfViewer;
