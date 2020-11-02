import React, { useReducer } from 'react';
import {v4 as uuidv4}  from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER, 
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };

 const [state, dispatch] = useReducer(contactReducer, initialState);
 //Get Contacts
 const getContacts = async() => {
     const url = 'http://localhost:5000/api/contacts';
     try{
        const res = await axios.get(url);
        dispatch({
            type: GET_CONTACTS,
            payload: res.data
        });
     } catch(err){
         dispatch({
             type: CONTACT_ERROR,
             payload: err.response.msg
         });
     }
 };
 //Add contact
  const addContact = async contact =>{
      //contact.id = uuidv4();
      const url = 'http://localhost:5000/api/contacts';
      const config = {
          headers: {
              "Content-Type": "application/json"
          }
      };

      try{
          const res = await axios.post(url, contact, config);          
          dispatch({type: ADD_CONTACT, payload: res.data});
      } catch(err){
          dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
      }      
  };
 //Delete contact
 const deleteContact = async id =>{
     const url = `http://localhost:5000/api/contacts/${id}`;
     try{
       await axios.delete(url);
       dispatch({type: DELETE_CONTACT, payload: id});
     } catch(err){
       dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
     }
 };
 //Set Current contact
const setCurrent = contact =>{
    dispatch({type: SET_CURRENT, payload: contact});
};
 //Clear Current Contact
const clearCurrent = () =>{
    dispatch({type: CLEAR_CURRENT});
};
 //Update Contact
const updateContact = async contact =>{
    try{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };
        const url = `http://localhost:5000/api/contacts/${contact._id}`;
        const res = await axios.put(url, contact, config);
        dispatch({type: UPDATE_CONTACT, payload: res.data});
    } catch(err){
        dispatch({type: CONTACT_ERROR, payload: err.response.msg});
    }
};

 //Filter Contact
const filterContacts = text => {
    dispatch({type: FILTER_CONTACTS, payload: text});
};

 //Clear Filter
const clearFilter = () =>{
    dispatch({ type: CLEAR_FILTER});
};

//Clear Contacts
const clearContacts = () =>{
    dispatch({ type: CLEAR_CONTACTS })
};

 return (
     <ContactContext.Provider
     value ={{
         contacts: state.contacts,
         current: state.current,
         filtered: state.filtered,
         error: state.error,
         getContacts,
         addContact,
         deleteContact,
         setCurrent,
         clearCurrent,
         updateContact,
         filterContacts,
         clearFilter,
         clearContacts
     }}>
         {props.children}
     </ContactContext.Provider>
 )
};

export default ContactState;