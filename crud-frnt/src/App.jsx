import { useState, useEffect } from 'react'
import './App.css'
import ModalForm from './components/ModalForm'
import NavBar from './components/Navbar'
import TableList from './components/TableList'

import axios from 'axios'; 

function App() {
  const[isOpen, setIsOpen] = useState(false);
  const[modalMode, setmodalMode] = useState(false);
  const[searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);


    const fetchClients = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/clients');
            setTableData(response.data.sort((a, b) => a.id - b.id));
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchClients();
    } , []);

    const handleOpen = (mode, client) => {
    setClientData(client);
    setIsOpen(true);
    setmodalMode(mode);
  }

  const handleSubmit = async (newClientData) => {
    if (modalMode === 'add'){
      try{
        const response = await axios.post('http://localhost:3000/api/clients', newClientData);
        console.log("Client added:", response.data);
        setTableData((prevData) => [...prevData, response.data].sort((a, b) => a.id - b.id));
      } catch (err) {
        console.error("Error adding client:", err);
      }
      console.log('modal mode Add');
    } else {
      console.log('Updating client with ID:', clientData.id);
      try {
        const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
        console.log("Client updated:", response.data);
        setTableData((prevData) => 
          prevData.map(client => client.id === response.data.id ? response.data : client).sort((a, b) => a.id - b.id)
        );
      } catch (err) {
        console.error("Error updating client:", err);
      }
    }
  }

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm("Are you sure? This will delete ALL clients. This action cannot be undone.");
    if (confirmDelete) {
      try {
        for (const client of tableData) {
          await axios.delete(`http://localhost:3000/api/clients/${client.id}`);
        }
        setTableData([]);
        console.log("All clients deleted");
      } catch (err) {
        console.error("Error deleting all clients:", err);
      }
    }
  }

  return (
    <>
      <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} onDeleteAll={handleDeleteAll} /> {/* update button */}
      <TableList setTableData={setTableData} tableData={tableData}
      handleOpen={handleOpen} searchTerm={searchTerm}/>
      <ModalForm 
      isOpen={isOpen} onSubmit={handleSubmit}
      onClose={() => setIsOpen(false)}
      mode={modalMode} clientData={clientData}
      />
    </>
  )
  }



export default App
