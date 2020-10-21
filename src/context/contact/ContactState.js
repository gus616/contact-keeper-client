import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id:1,
                name: 'Gus Vc',
                email: 'guzz.vc@gmail.com',
                phone: '618222',
                type: 'personal'
            },
            {
                id:2,
                name: 'Fito Vc',
                email: 'fito.vc@gmail.com',
                phone: '618222',
                type: 'personal'
            },
            {
                id:3,
                name: 'Mario',
                email: 'mario@gmail.com',
                phone: '618222',
                type: 'professional'
            }
        ]
    }

 const [state, dispatch] = useReducer(contactReducer, initialState);
 //Add contact

 //Delete contact

 //Set Current contact

 //Clear Current Contact

 //Update Contact

 //Filter Contact

 //Clear Filter


 return (
     <ContactContext.Provider
     value ={{
         contacts: state.contacts
     }}>
         {props.children}
     </ContactContext.Provider>
 )
};

export default ContactState;