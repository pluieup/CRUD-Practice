import axios from 'axios';
import {useState} from 'react';

export default function TableList({handleOpen, tableData, searchTerm, setTableData}){
    const [error, setError] = useState(null);

    const filteredData = tableData.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.color.toLowerCase().includes(searchTerm.toLowerCase())
    );    

    const handleDelete = async(id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this client?");
        if (confirmDelete){
            try{
                await axios.delete(`http://localhost:3000/api/clients/${id}`);
                setTableData((prevData) => prevData.filter(client => client.id !== id));
            } catch (err){
                setError(err.message);
            }
        }
    };

    return(
        <>

            {error && <p className="alert alert-error">{error}</p>}

            <div className="overflow-x-auto mt-10">
            <table className="table">
                {/* head */}
                <thead >
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th>Rate</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody className="hover:bg-base-300">
                {/* row 1 */}
                

                {/* Instead of using client.id for the number, use the index from the map */}
                {filteredData.map((client, index) => (
                    <tr key={client.id}>
                        {/* Show sequential index, not the database ID */}
                        <th>{index + 1}</th> 
                        <td>{client.name}</td>                        
                        <td>{client.job}</td>
                        <td>{client.color}</td>
                        <td>{client.rate}</td>
                        <td>
                            <button className={`btn rounded-full w-20 ${client.isactive ? `btn-primary text-white` : `btn-outline btn-primary`}`}>
                                {client.isactive ? "Active" : "Inactive"}
                            </button>
                        </td>
                        <td>
                            <button 
                            onClick={() => handleOpen('edit', client)}
                            className="text-white btn btn-secondary">
                                Update
                            </button>
                        </td>
                        <td>
                            <button className="text-white btn btn-error" onClick={() => handleDelete(client.id)}>
                                Delete
                            </button>
                        </td>

                    </tr>
                ))}

                </tbody>
            </table>
            </div>
        </>
    )
}