import React from 'react'
import {useNavigate} from 'react-router-dom'

function DdcClassification(props) {
    const navigate = useNavigate()

    function goToDetails(){
        if(props.isAdmin){
            navigate('/admin/view-classification')
        }else {
            navigate('/view-classification')
        }
        
    }
    return (
        <div className="mt-8 p-4 py-4 bg-white shadow-lg border rounded-3xl">
            <p className="p-2 text-2xl text-gray-700 fond-extrabold mb-2 ml-4">DDC Classification</p>
            <div className="px-2 w-full">
                {props.data &&
                    props.data.map((obj) => {
                        if(obj.summary === 'first summary') {
                            return (
                                <div onClick={goToDetails} className="text-gray-600 capitalize bg-white w-full flex justify-between px-3 cursor-pointer hover:border-2 border-2 border-white rounded-md">
                                    <td className="p-1 w-1/4">{obj.classificationNumber}</td>
                                    <td className="p-1 w-3/4">{obj.classificationName}</td>
                                </div>
                            )
                        }
                    })
                }
                <p onClick={goToDetails} className='text-blue-500 text-right mt-2 cursor-pointer hover:text-blue-600'>View Details</p>
            </div>
        </div>
    )
}

export default DdcClassification
