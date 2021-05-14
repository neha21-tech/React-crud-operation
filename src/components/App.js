import React,{useState, useEffect} from "react";
import './App.css';
import { uuid } from 'uuidv4';

import AddContact from './AddContact';
import Header from './Header';
import ContactList from './ContactList';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts , setContacts] = useState([]);
  
  /*
  const contacts = [
    {
      id: "1",
      name: "ram",
      email: "ram@gmail.com"
    },
    {
      id: "2",
      name: "ravi",
      email: "ravi@gmail.com"
    }

  ]  */

  const addContactHandler = (contact)=>{
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  }

  const removeContactHandler = (id) =>{
    const newContactList = contacts.filter((contact)=>{
      return contact.id !== id;
    });

    setContacts(newContactList);
  }

  useEffect(()=>{
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retriveContacts) setContacts(retriveContacts);
  },[]);

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  },[contacts]);

  return (
    <div className="ui container">
        <Header />
        <AddContact  addContactHandler={addContactHandler}/>
        <ContactList  contacts={contacts} getContactId={removeContactHandler}/> 
    </div>
  );
}

export default App;



