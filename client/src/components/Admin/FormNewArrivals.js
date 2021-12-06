import React, { useState } from 'react'
import '../../styles/output.css'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import ErrorMsg from './ErrorMsg'

function NewArrivalsForm(props) {
    const [title, setTitle] = useState()
    const [author, setAuthor] = useState()
    const [publication, setPublication] = useState()
    const [classificationNumber, setClassificationNumber] = useState()
    const [itemNumber, setItemNumber] = useState()
    const [barcode, setBarcode] = useState()
    const [collection, setCollection] = useState()
    const [loading, setLoading] = useState(false)
    function handleSubmit(e){
        setLoading(true)
        e.preventDefault()
        const headers = {
            "Content-Type": "application/json"
        }
        axios.post('/admin/api/add-new-arrivals',{
            title,
            author,
            publication,
            classificationNumber,
            itemNumber,
            barcode,
            collection
        },headers).then((response)=>{
            setLoading(false)
            props.showForm(false)
            props.setSuccess(true)
            setTimeout(() => {
                props.setSuccess(false)
            }, 4000);
        })
    }
    return (
        <div className="w-full">
            <div className="fixed w-full opacity-25 top-0 bottom-0 left-0 right-100 h-screen bg-black text-white z-30">

            </div>
            <div className="fixed py-2 w-full mx-auto inset-0 h-screen z-40">
                <form onSubmit={(e)=>handleSubmit(e)} action="/staff/add-book" class="grid lg:grid-cols-2 grid-cols-1 gap-3 w-1/2 bg-white p-8 mx-auto rounded-2xl" id="add-book-form" method="POST">
                    <p className="text-gray-700 font-bold text-xl text-center col-span-2">Add Book</p>
                    <div class="grid grid-cols-1 space-y-2 col-span-2">
                        <label for="title" class="font-bold text-lg text-gray-500">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" name="title" placeholder="Title" class="text-gray-700 p-2 bg-gray-200 rounded border-gray-300 focus:outline-none focus:bg-blue-100" />
                    </div>
                    <div class="grid grid-cols-1 space-y-2">
                        <label for="author" class="font-bold text-lg text-gray-500">Author</label>
                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} id="author" name="author" placeholder="Author" class="text-gray-700 p-2 bg-gray-200 rounded border-gray-300 focus:outline-none focus:bg-blue-100" />
                    </div>
                    <div class="grid grid-cols-1 space-y-2">
                        <label for="publication" class="font-bold text-lg text-gray-500">Publication</label>
                        <input type="text" value={publication} onChange={(e) => setPublication(e.target.value)} id="publication" name="publication" placeholder="Publication" class="text-gray-700 p-2 bg-gray-200 rounded border-gray-300 focus:outline-none focus:bg-blue-100" />
                    </div>
                    <div class="grid grid-cols-1 space-y-2">
                        <label for="classification_number" class="font-bold text-lg text-gray-500">Classification Number</label>
                        <input type="text" value={classificationNumber} onChange={(e) => setClassificationNumber(e.target.value)} id="classification_number" name="classification_number" placeholder="Classification Number" class="text-gray-700 p-2 bg-gray-200 rounded border-gray-300 focus:outline-none focus:bg-blue-100" />
                    </div>
                    <div class="grid grid-cols-1 space-y-2">
                        <label for="item_number" class="font-bold text-lg text-gray-500">Item Number</label>
                        <input type="text" value={itemNumber} onChange={(e) => setItemNumber(e.target.value)} id="item_number" name="item_number" placeholder="Item NUmber" class="text-gray-700 p-2 bg-gray-200 rounded border-gray-300 focus:outline-none focus:bg-blue-100" />
                    </div>
                    <div class="grid grid-cols-1 space-y-2">
                        <label for="barcode" class="font-bold text-lg text-gray-500">Barcode</label>
                        <input type="text" value={barcode} onChange={(e) => setBarcode(e.target.value)} id="barcode" name="barcode" placeholder="Barcode" class="text-gray-700 p-2 bg-gray-200 rounded border-gray-300 focus:outline-none focus:bg-blue-100" />
                    </div>
                    <div class="grid grid-cols-1 space-y-2">
                        <label for="collection" class="font-bold text-lg text-gray-500">Collection</label>
                        <select  onChange={(e) => setCollection(e.target.value)} id="collection" name="collection" placeholder="Collection" class="text-gray-700 p-2 bg-gray-200 rounded border-gray-300 focus:outline-none focus:bg-blue-100">
                            <option value="G/M">G/M</option>
                            <option value="R/M">R/M</option>
                            <option value="G/E">G/E</option>
                            <option value="R/E">R/E</option>
                            <option value="G/A">G/A</option>
                            <option value="R/A">R/A</option>
                            <option value="G/U">G/U</option>
                            <option value="R/U">R/U</option>
                        </select>
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
    )
}

export default NewArrivalsForm
