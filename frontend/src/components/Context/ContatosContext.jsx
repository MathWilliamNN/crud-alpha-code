import React, { createContext, useState } from 'react';

export const ContatoContext = createContext();

export const ContatoProvider = ({ children }) => {
  const [contatos, setContatos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editContato, setEditContato] = useState(null);


  return (
    <ContatoContext.Provider value={{ contatos, setContatos, editMode, setEditMode, editContato, setEditContato}}>
      {children}
    </ContatoContext.Provider>
  );
};