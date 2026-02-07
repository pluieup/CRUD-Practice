import { useEffect, useState } from 'react';

export default function ModalForm({isOpen, onClose, mode, onSubmit, clientData}){
    const [rate, setRate] = useState('');
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const [color, setColor] = useState('');
    const [status, setStatus] = useState(false);

    const handleStatusCHange = (e) => {
        setStatus(e.target.value === 'Active');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const clientData={name,job,color,rate: Number(rate) ,isactive: status}
            await onSubmit(clientData)
        } catch (err){
            console.error("Error adding client", err);
        }
        onClose();        
    }

    useEffect(() => {
        if (mode === 'edit' && clientData) {
            setName(clientData.name);
            setJob(clientData.job);
            setColor(clientData.color);
            setRate(clientData.rate);
            setStatus(clientData.isactive);
        } else {
            setName('');
            setJob('');
            setColor('');
            setRate('');
            setStatus(false);
        }
    }, [mode, clientData]);

    const handleClose = () => {
        setRate('');
        setName('');
        setJob('');
        setColor('');
        setStatus(false);
        onClose();
    }

    return(


        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_4" className="modal" open={isOpen}>
            <div className="modal-box w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 max-w-3xl">
                <h3 className="font-bold text-lg p-4">
                    {mode === 'edit' ? 'Edit Client' : 'Client Details'}
                </h3>
                <form method ="dialog" onSubmit={handleSubmit}>
                <p className="py-4 flex flex-col gap-2 items-center">
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        <span className="mr-5">Name</span>
                        <input type = "text" className="grow" value={name} onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        <span className="mr-5">Job</span>
                        <input type = "text" className="grow" value={job} onChange={(e) => setJob(e.target.value)}/>
                    </label>
                    <label className="input input-bordered flex items-center my-2 gap-2">
                        <span className="mr-5">Color</span>
                        <input type = "text" className="grow" value={color} onChange={(e) => setColor(e.target.value)}/>
                    </label>

                    <div className="flex items-center gap-10">
                        <label className="input input-bordered flex items-center my-2 gap-2">
                            <span className="mr-5">Rate</span>
                            <input type = "number" className="grow" value={rate} onChange={(e) => setRate(e.target.value)}/>
                        </label>

                        <select value={status ? 'Active': 'Inactive'} className="select select-bordered mt-4 max-w xs" onChange={handleStatusCHange}>
                        <option>Active</option>
                        <option>Inactive</option>
                        </select>  
                                         
                    </div>
                    
                </p>
                </form>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                                    
                    <button 
                    onClick={handleClose}
                    className="m-2 btn">
                        Close
                    </button>
                    
                    <button
                        onClick={() => {
                            onSubmit({name, job, color, rate: Number(rate), isactive: status});
                            handleClose();
                        }}
                        className="btn btn-success">
                        {mode === 'edit' ? 'Save Changes' : 'Add Client'}
                    </button>
                </form>
                </div>
            </div>
            </dialog>        
        </>
    )
}