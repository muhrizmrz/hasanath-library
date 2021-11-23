import React, { useState } from 'react'
import SuccessfullMsg from './SuccessfullMsg'
import '../../styles/output.css'
import ErrorMsg from './ErrorMsg'
//import Rolling  from ''
import UseAnimations from 'react-useanimations'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'
const axios = require('axios')

function AddClassification() {
    const [classificationNumber, setClassificationNumber] = useState()
    const [classificationName, setClassificationName] = useState()
    const [success, setSuccess] = useState()
    const [error, setError] = useState()
    const [valueZero, setValueZero] = useState()
    const [loading, setLoading] = useState()
    const [errorMsg, setErrorMsg] = useState('')
    const handleSubmit = (e) => {
        setError(false)
        setLoading(true)
        e.preventDefault()
        const headers = {
            "Content-Type": "application/json"
        }
        axios.post('/admin/api/add-classification', {
            classification_number: classificationNumber,
            classification_name: classificationName
        }, headers).then((response) => {
            setLoading(false)
            if (!response.data.error) {
                setSuccess(true)
                setError(false)
                setTimeout(() => {
                    setSuccess(false)
                }, 4000);
            } else {
                setSuccess(false)
                setErrorMsg(response.data.msg)
                setError(true)
            }
            setClassificationName('')
            setClassificationNumber('')
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
                            <input type="text" value={valueZero ? "" : classificationNumber} onChange={(e) => setClassificationNumber(e.target.value)} id="classification-number" name="classification_number" placeholder="Classification Number" class="text-gray-700 p-2 bg-gray-200 rounded border-gray-300 focus:outline-none focus:bg-blue-100" />
                        </div>
                        <div class="grid grid-cols-1 space-y-2">
                            <label for="classification-name" class="font-bold text-lg text-gray-500">Classification Name</label>
                            <input type="text" value={valueZero ? "" : classificationName} onChange={(e) => setClassificationName(e.target.value)} id="classification-name" name="classification_name" placeholder="Classification Name" class="text-gray-700 p-2 bg-gray-200 rounded border-gray-300 focus:outline-none focus:bg-blue-100" />
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
            {success ? <SuccessfullMsg /> : ""}
            {error ? <ErrorMsg msg={errorMsg} /> : ""}
        </div >
    )
}

export default AddClassification
