const getFormattedDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // i mesi partono da 0
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getFormattedTimestamp = () => {
  const now = new Date(); // Ottieni la data e l'ora corrente
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // I mesi in JavaScript partono da 0, quindi aggiungiamo 1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  // Formatta il timestamp nel formato richiesto
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const simulateApiCall = () => {

  const today = getFormattedDate();
  const now = getFormattedTimestamp();

  return new Promise((resolve, reject) => {

    setTimeout(() => {
      // Simuliamo una risposta fittizia dell'API
      const data = [
        {
          codiceDocumento: "de0ad9e3-15d8-4895-badc-4a34e7bb5971",
          hash: "e387655d-d1cf-4e31-848b-3931a3279a7e",
          titolo: "Documento 1",
          stato: "DA_FIRMARE",
          dataInserimento: "2024-11-11",
          dataScadenza: "2024-12-19",
          dataFirma: now,
          predispostoDa: "RMIC83100G - IC VIA DELLE ALZAVOLE",
          descrizione: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. ",
          tipologia: "Non specificata",
          applicazioneRichiedente: "Sigillo Gestione",
          firme : [
                {
                    id: 1,
                    titolo: "Titolo firma 1",
                    pagina: "1",
                    obbligatoria: "true"
                },
                {
                    id: 2,
                    titolo: "Titolo firma 2",
                    pagina: "1",
                    obbligatoria: "false"
                }
            ],
          identityProviderSpid: "Poste ID - https://posteid.poste.it",
          idAutenticazioneSpid: "_FEA_e387655d-d1cf-4e31-848b-3931a3279a7e"
        },
        {
          codiceDocumento: "de0ad9e3-15d8-4895-badc-4a34e7bb5972",
          hash: "e387655d-d1cf-4e31-848b-3931a3279a7e",
          titolo: "Documento 2",
          stato: "DA_COMPILARE",
          dataInserimento: "2024-11-11",
          dataScadenza: "2024-12-11",
          predispostoDa: "RMIC83100G - IC VIA DELLE ALZAVOLE",
          descrizione: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. ",
          tipologia: "Non specificata",
          applicazioneRichiedente: "Sigillo Gestione",
          firme : [
                {
                    id: 1,
                    titolo: "Titolo firma 1",
                    pagina: "1",
                    obbligatoria: "true"
                },
                {
                    id: 2,
                    titolo: "Titolo firma 2",
                    pagina: "1",
                    obbligatoria: "false"
                }
            ],
            identityProviderSpid: "Poste ID - https://posteid.poste.it",
            idAutenticazioneSpid: "_FEA_e387655d-d1cf-4e31-848b-3931a3279a7e"
        },
        {
          codiceDocumento: "de0ad9e3-15d8-4895-badc-4a34e7bb5973",
          hash: "e387655d-d1cf-4e31-848b-3931a3279a7e",
          titolo: "Documento 3",
          stato: "FIRMATO",
          dataInserimento: "2024-11-11",
          dataScadenza: "2024-12-11",
          predispostoDa: "RMIC83100G - IC VIA DELLE ALZAVOLE",
          descrizione: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. ",
          tipologia: "Non specificata",
          applicazioneRichiedente: "Sigillo Gestione",
          firme : [
                {
                    id: 1,
                    titolo: "Titolo firma 1",
                    pagina: "1",
                    obbligatoria: "true"
                },
                {
                    id: 2,
                    titolo: "Titolo firma 2",
                    pagina: "1",
                    obbligatoria: "false"
                }
            ],
            identityProviderSpid: "Poste ID - https://posteid.poste.it",
            idAutenticazioneSpid: "_FEA_e387655d-d1cf-4e31-848b-3931a3279a7e"
        },
        {
          codiceDocumento: "de0ad9e3-15d8-4895-badc-4a34e7bb5974",
          hash: "e387655d-d1cf-4e31-848b-3931a3279a7e",
          titolo: "Documento 4",
          stato: "SCADUTO",
          dataInserimento: "2024-11-11",
          dataScadenza: "2024-10-11",
          predispostoDa: "RMIC83100G - IC VIA DELLE ALZAVOLE",
          descrizione: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. ",
          tipologia: "Non specificata",
          applicazioneRichiedente: "Sigillo Gestione",
          firme : [
                {
                    id: 1,
                    titolo: "Titolo firma 1",
                    pagina: "1",
                    obbligatoria: "true"
                },
                {
                    id: 2,
                    titolo: "Titolo firma 2",
                    pagina: "1",
                    obbligatoria: "false"
                }
            ],
            identityProviderSpid: "Poste ID - https://posteid.poste.it",
            idAutenticazioneSpid: "_FEA_e387655d-d1cf-4e31-848b-3931a3279a7e"
        },
        {
          codiceDocumento: "de0ad9e3-15d8-4895-badc-4a34e7bb5975",
          hash: "e387655d-d1cf-4e31-848b-3931a3279a7e",
          titolo: "Documento 5",
          stato: "FIRMATO",
          dataInserimento: "2024-11-11",
          dataScadenza: "2024-12-11",
          predispostoDa: "RMIC83100G - IC VIA DELLE ALZAVOLE",
          descrizione: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. ",
          tipologia: "Non specificata",
          applicazioneRichiedente: "Sigillo Gestione",
          firme : [
                {
                    id: 1,
                    titolo: "Titolo firma 1",
                    pagina: "1",
                    obbligatoria: "true"
                },
                {
                    id: 2,
                    titolo: "Titolo firma 2",
                    pagina: "1",
                    obbligatoria: "false"
                }
            ],
            identityProviderSpid: "Poste ID - https://posteid.poste.it",
            idAutenticazioneSpid: "_FEA_e387655d-d1cf-4e31-848b-3931a3279a7e"
        },
        {
          codiceDocumento: "de0ad9e3-15d8-4895-badc-4a34e7bb5976",
          hash: "e387655d-d1cf-4e31-848b-3931a3279a7e",
          titolo: "Documento 6",
          stato: "IN_ATTESA",
          dataInserimento: "2024-11-11",
          dataScadenza: "2024-12-11",
          predispostoDa: "RMIC83100G - IC VIA DELLE ALZAVOLE",
          descrizione: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. ",
          tipologia: "Non specificata",
          applicazioneRichiedente: "Sigillo Gestione",
          firme : [
                {
                    id: 1,
                    titolo: "Titolo firma 1",
                    pagina: "1",
                    obbligatoria: "true"
                },
                {
                    id: 2,
                    titolo: "Titolo firma 2",
                    pagina: "1",
                    obbligatoria: "false"
                }
            ],
            identityProviderSpid: "Poste ID - https://posteid.poste.it",
            idAutenticazioneSpid: "_FEA_e387655d-d1cf-4e31-848b-3931a3279a7e"
        },
        {
          codiceDocumento: "de0ad9e3-15d8-4895-badc-4a34e7bb5977",
          hash: "e387655d-d1cf-4e31-848b-3931a3279a7e",
          titolo: "Documento 7",
          stato: "SCADUTO",
          dataInserimento: "2024-11-11",
          dataScadenza: "2024-12-11",
          predispostoDa: "RMIC83100G - IC VIA DELLE ALZAVOLE",
          descrizione: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. ",
          tipologia: "Non specificata",
          applicazioneRichiedente: "Sigillo Gestione",
          firme : [
                {
                    id: 1,
                    titolo: "Titolo firma 1",
                    pagina: "1",
                    obbligatoria: "true"
                },
                {
                    id: 2,
                    titolo: "Titolo firma 2",
                    pagina: "1",
                    obbligatoria: "false"
                }
            ],
            identityProviderSpid: "Poste ID - https://posteid.poste.it",
            idAutenticazioneSpid: "_FEA_e387655d-d1cf-4e31-848b-3931a3279a7e"
        },
        {
          codiceDocumento: "de0ad9e3-15d8-4895-badc-4a34e7bb5978",
          hash: "e387655d-d1cf-4e31-848b-3931a3279a7e",
          titolo: "Documento 8",
          stato: "ANNULLATO",
          dataInserimento: "2024-11-11",
          dataScadenza: "2024-12-11",
          predispostoDa: "RMIC83100G - IC VIA DELLE ALZAVOLE",
          descrizione: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat diam sed scelerisque tincidunt. ",
          tipologia: "Non specificata",
          applicazioneRichiedente: "Sigillo Gestione",
          firme : [
                {
                    id: 1,
                    titolo: "Titolo firma 1",
                    pagina: "1",
                    obbligatoria: "true"
                },
                {
                    id: 2,
                    titolo: "Titolo firma 2",
                    pagina: "1",
                    obbligatoria: "false"
                }
            ],
            identityProviderSpid: "Poste ID - https://posteid.poste.it",
            idAutenticazioneSpid: "_FEA_e387655d-d1cf-4e31-848b-3931a3279a7e"
        }
      ];

      // Simuliamo un'errore casuale del 10% di probabilità
      /* const isError = Math.random() < 0.1; */
      /* const isError = false;

      if (isError) {
        reject('Errore nel recupero dei dati');
      } else { */
        resolve(data);
      /* } */

      console.log("simulateApiCall")
    }, 0); // 2 secondi di ritardo per simulare una chiamata asincrona
  });
};
