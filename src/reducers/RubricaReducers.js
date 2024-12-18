import { ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } from '../actions/RubricaActions';

const initialState = {
    contacts: [
        
        {
            id: 1,
            nome: 'Luca',
            cognome: 'Bianchi',
            email: 'lbianchi@gmail.com',
            codiceFiscale: 'BNCLCA88C17H501F'
        },
        {
            id: 2,
            nome: 'Maria',
            cognome: 'Bianchi',
            email: 'mbianchi@gmail.com',
            codiceFiscale: 'BNCMRA88C17H501C'
        },
        {
            id: 3,
            nome: 'Sandro',
            cognome: 'Brunello',
            email: 'sbrunello@gmail.com',
            codiceFiscale: 'BRNSND88C17H501K'
        },
        {
            id: 4,
            nome: 'Roberto',
            cognome: 'Maionese',
            email: 'rmaionese@gmail.com',
            codiceFiscale: 'MNSRBR88C17H501C'
        },
        {
            id: 5,
            nome: 'Carlo',
            cognome: 'Marini',
            email: 'cmarini@gmail.com',
            codiceFiscale: 'MRNCRL88C17H501D'
        },
        {
            id: 6,
            nome: 'Anna',
            cognome: 'Reali',
            email: 'areali@gmail.com',
            codiceFiscale: 'RLENNA88C17H501V'
        },
        {
            id: 7,
            nome: 'Mario',
            cognome: 'Rossi',
            email: 'mrossi@gmail.com',
            codiceFiscale: 'RSSMRA88C17H501R'
        },
        {
            id: 8,
            nome: 'Giulia',
            cognome: 'Verdi',
            email: 'gverdi@gmail.com',
            codiceFiscale: 'VRDGLI88C17H501T'
        },
        {
            id: 9,
            nome: 'Edoardo',
            cognome: 'Venditti',
            email: 'evenditti@gmail.com',
            codiceFiscale: 'VNDEDR88C17H501X'
        },
        {
            id: 10,
            nome: 'Federico',
            cognome: 'Zappa',
            email: 'fzappa@gmail.com',
            codiceFiscale: 'ZPPFDR88C17H501G'
        },
    ]
};

const RubricaReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                    contact.id === action.payload.id
                        ? { ...contact, nome: action.payload.nome, cognome: action.payload.cognome, email: action.payload.email, codiceFiscale: action.payload.codiceFiscale }
                        : contact
                ),
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter((contact) => contact.id !== action.payload),
            };
        default:
            return state;
    }
};

export default RubricaReducers;
