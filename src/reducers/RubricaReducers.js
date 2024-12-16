import { ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } from '../actions/RubricaActions';

const initialState = [
    {
        id: 1,
        name: 'Mario',
        surname: 'Rossi',
        phone: '123-4567890',
    },
    {
        id: 2,
        name: 'Luca',
        surname: 'Bianchi',
        phone: '234-5678901',
    },
    {
        id: 3,
        name: 'Giulia',
        surname: 'Verdi',
        phone: '345-6789012',
    },
    {
        id: 4,
        name: 'Anna',
        surname: 'Neri',
        phone: '456-7890123',
    },
    {
        id: 5,
        name: 'Federico',
        surname: 'Zappa',
        phone: '567-8901234',
    },
    {
        id: 6,
        name: 'Maria',
        surname: 'Bianchi',
        phone: '678-9012345',
    },
    {
        id: 7,
        name: 'Carlo',
        surname: 'Marini',
        phone: '789-0123456',
    },
];

const RubricaReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state, action.payload],
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.map((contact) =>
                    contact.id === action.payload.id ? action.payload : contact
                ),
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.filter((contact) => contact.id !== action.payload),
            };
        default:
            return state;
    }
};

export default RubricaReducers;
