import React, { useState } from 'react'
import SuccessfullMsg from './SuccessfullMsg'
import '../../styles/output.css'
import ErrorMsg from './ErrorMsg'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
const axios = require('axios')

function AddClassification() {
    const [classificationNumber, setClassificationNumber] = useState()
    const [classificationName, setClassificationName] = useState()
    const [isAddingSuccess, setIsAddingSuccess] = useState()
    const [isErrorInAdding, setIsErrorInAdding] = useState()
    const [loading, setLoading] = useState()
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        setIsErrorInAdding(false)
        setLoading(true)
        e.preventDefault()

        function handleLoading(responseData){
            setLoading(false)
            if (!responseData.error) {
                setIsAddingSuccess(true)
                setIsErrorInAdding(false)
                setTimeout(() => {
                    setIsAddingSuccess(false)
                }, 4000);
            } else {
                setIsAddingSuccess(false)
                setErrorMsg(responseData.msg)
                setIsErrorInAdding(true)
            }
            setClassificationName('')
        }

        const headers = {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem('token')
        }
        axios.post('/admin/api/add-classification', {
            classification_number: classificationNumber,
            classification_name: classificationName.toLowerCase()
        }, {
            headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem('token')
        }}).then((response) => {
            if(!response.data.admin){
                navigate('/admin')
            }else{
                handleLoading(response.data)
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    return (
        <div>
            <div class="w-3/4 grid grid-cols-1 mx-auto lg:mt-24 mb-10 border-2 border-gray-200 p-8">
                <div class="grid grid-cols-1 space-y-6">
                    <p class="text-gray-400 text-3xl font-bold text-center border-b pb-2">Add Classification</p>
                    <p class="text-red-600 font-bold mb-8 hidden" id="duplicate_barcode">Barcode must be Unique</p>
                    <form action="/staff/add-book" onSubmit={(e) => handleSubmit(e)} class="grid lg:grid-cols-2 grid-cols-1 gap-3" id="add-book-form" method="POST">
                        <div class="grid grid-cols-1 space-y-2">
                            <label for="classification-number" class="font-bold text-lg text-gray-500">Classification Number</label>
                            <input type="text" value={classificationNumber} onChange={(e) => setClassificationNumber(e.target.value)} id="classification-number" name="classification_number" placeholder="Classification Number" class="text-gray-700 p-2 bg-gray-200 rounded border-gray-300 focus:outline-none focus:bg-blue-100" />
                        </div>
                        <div class="grid grid-cols-1 space-y-2">
                            <label for="classification-name" class="font-bold text-lg text-gray-500">Classification Name</label>
                            <input type="text" value={classificationName} onChange={(e) => setClassificationName(e.target.value)} id="classification-name" name="classification_name" placeholder="Classification Name" class="text-gray-700 p-2 bg-gray-200 rounded border-gray-300 focus:outline-none focus:bg-blue-100" />
                        </div>
                        <button type="submit" class="p-2 rounded-lg  bg-blue-600  text-white w-1/5 hover:bg-blue-800 justify-self-end col-span-2 mt-3">
                            <div className="flex justify-center">
                                <p className=""><span>Save </span></p>
                                {loading && 
                                    <Loader
                                        type="Oval"
                                        color="white"
                                        height={20}
                                        width={60}
                                    />
                                }
                            </div>
                        </button>
                    </form>
                </div>
            </div>
            {isAddingSuccess ? <SuccessfullMsg /> : ""}
            {isErrorInAdding ? <ErrorMsg msg={errorMsg} /> : ""}
        </div >
    )
}

export default AddClassification
