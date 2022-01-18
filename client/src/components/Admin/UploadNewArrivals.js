import React, { useState } from 'react'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function UploadNewArrivals(props) {
    const [selectedCover, setSelectedCover] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const uploadCover = (e) => {

        setLoading(true)
        e.preventDefault()

        const formData = new FormData()
        formData.append(
            "cover",
            selectedCover,
            selectedCover.name
        )

        const headers = {
            "Content-Type": "application/json"
        }

        console.log(selectedCover)

        axios.post('/admin/api/add-new-arrivals',formData).then((response)=>{
            console.log(response)
            if(!response.data.admin){
                navigate('/admin/login')
            }else{
                setLoading(false)
                props.showForm(false)
                props.setSuccess(true)
                setTimeout(() => {
                    props.setSuccess(false)
                }, 4000);
            }
        })
    }
    return (
        <div className="w-full">
            <div className="fixed w-full opacity-25 top-0 bottom-0 left-0 right-100 h-screen bg-black text-white z-30">

            </div>
            <div className="fixed py-2 w-full mx-auto inset-0 h-screen z-40">
                <form onSubmit={(e) => uploadCover(e)} action="/staff/add-book" class="grid lg:grid-cols-2 grid-cols-1 gap-3 w-1/2 bg-white p-8 mx-auto rounded-2xl" id="add-book-form" method="POST">
                    <p className="text-gray-700 font-bold text-xl text-center col-span-2">Add Book</p>
                    <div class="grid grid-cols-1 space-y-2 col-span-2">
                        <label for="title" class="font-bold text-lg text-gray-500">Book Cover</label>
                        <input type="file" onChange={(e) => setSelectedCover(e.target.files[0])} id="cover" name="cover" placeholder="Cover" class="text-gray-700 p-2 bg-gray-200 rounded border-gray-300 focus:outline-none focus:bg-blue-100" />
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

export default UploadNewArrivals
