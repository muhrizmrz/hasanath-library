import React, { useEffect, useState } from 'react'
import axios from 'axios'

function DdcClassification() {
    const [classification, setClassification] = useState()
    useEffect(() => {
        axios.get('/admin/api/get-main-classification').then((res) => {
            setClassification(res.data)
        })
    })
    return (
        <div className="mt-8 p-2 py-4 bg-white shadow-lg">
            <p className="p-2 text-2xl text-gray-700 fond-extrabold mb-2">DDC Classification</p>
            <div className="px-2 w-full">
                {classification &&
                    classification.map((obj) => {
                        return (
                            <div className="text-gray-600 bg-blue-100 font-bold capitalize bg-white hover:bg-blue-300 w-full flex justify-between p-1 px-3 cursor-pointer hover:border-2 border-2 border-white rounded-md">
                                <td className="p-1 w-1/4">{obj.classificationNumber}</td>
                                <td className="p-1 w-3/4">{obj.classificationName}</td>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default DdcClassification
