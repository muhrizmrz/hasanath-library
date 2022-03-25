import React, { useEffect, useState } from 'react'
import '../../styles/output.css'
import NewArrivalsForm from './FormNewArrivals'
import SuccessfullMsg from './SuccessfullMsg'
import axios from 'axios'
import { GrClose } from 'react-icons/gr'
import { IconContext } from 'react-icons'
import UploadNewArrivals from './UploadNewArrivals'

function NewArrivals(props) {
    const [IsShowForm, setIsShowForm] = useState(false)
    const [success, setSuccess] = useState(false)
    const [newArrivals, setNewArrivals] = useState([])
    function showForm() {
        setIsShowForm(true)
    }
    useEffect(() => {
        axios.get('/admin/api/get-new-arrivals').then((res) => {      
            setNewArrivals(res.data)
        })     
    },[])
    return (
        <div className="col-span-2">
            <div className="flex p-2 w-3/4 mx-auto">
                <h1 className="text-2xl text-gray-600 font-bold flex-1">New Arrivals</h1>
                {props.isAdmin && <div className="flex-1 text-right">
                    <button className="p-1 px-6 rounded text-white" style={{ backgroundColor: "#40514E" }} onClick={showForm}>Add</button>
                </div>}
            </div>
            <div className="arrivals mt-1">
                {newArrivals &&
                    newArrivals.map((book) => {
                        return (
                            <div className="w-3/4 mx-auto grid grid-cols-4 mb-4 bg-white rounded-3xl shadow-lg border">
                                <div className="col-span-3 p-4 pl-6">
                                    <p className="font-bold text-lg text-blue-600 cursor-pointer hover:text-blue-800 capitalize" onClick={() => window.open(`http://192.168.1.10:81/cgi-bin/koha/opac-search.pl?idx=ti&q=${book.title}&weight_search=1`)}>{book.title}</p>
                                    <p className="text-md font-bold text-gray-600"><span className="italic">By: </span>{book.author}</p>
                                    <p className="text-gray-400 text-sm mt-2">Publication: <span className="text-gray-500 font-medium">{book.publication}</span></p>
                                    <p className="text-gray-400 text-sm ">Classification: <span className="text-gray-500 capitalize font-medium">{book.classificationDetails.classificationName}</span></p>
                                </div>
                                <div className="bg-blue-500 font-bold text-center shadow-md py-4 p-2 text-white rounded-r-3xl">
                                    <p className='uppercase'>{book.collection}</p>
                                    <p>{book.classificationNumber}</p>
                                    <p className='uppercase'>{book.itemNumber}</p>
                                    <p>{book.barcode}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {IsShowForm && <UploadNewArrivals showForm={setIsShowForm} setSuccess={setSuccess} />}
            {IsShowForm && <div onClick={() => setIsShowForm(false)} className="fixed top-12  right-12 z-50">
                <IconContext.Provider value={{ color: 'white', className: 'bg-white p-2 w-12 h-12 cursor-pointer rounded-full' }}>
                    <GrClose />
                </IconContext.Provider>
            </div>}
            {success && <SuccessfullMsg />}
        </div>
    )
}

export default NewArrivals
