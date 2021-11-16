import React, { useEffect, useState } from 'react'
const axios = require('axios')

function ViewClassification() {
    const [collections, setCollections] = useState([])
    useEffect(() => {
        axios.get('/admin/api/view-classification').then(response => {
            setCollections(response.data)
        })
    })
    return (
        <div className="mx-auto bg-gray-100 p-2 pb-20 ">
            <div className="w-75 mx-auto">
                <table className="divide-y divide-gray-200 mt-36 mx-auto shadow-md rounded">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Classification Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Classification Name
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {
                            collections.map((classification) => {
                                return( 
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {classification.classificationNumber}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900 capitalize">{classification.classificationName}</div>
                                    </td>
                                </tr>
                                 )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewClassification
