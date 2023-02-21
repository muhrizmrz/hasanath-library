import React from 'react'
import axios from 'axios'

function ViewChildClassifications(props) {

    function getChildData(parentClassificationNumber){
        axios.get('/admin/api/view-child-classifications',{
            params: {classification_number: parentClassificationNumber}
        }).then((response)=>{ 
            props.setData(response.data)
        })  
    }

    return (
        <div className="w-full">
            <div className="fixed w-full opacity-25 top-0 bottom-0 left-0 right-100 h-screen bg-black text-white z-30">

            </div>
            <div className="fixed py-2 w-full mx-auto inset-0 h-screen z-40">
                {props.data &&
                    <div className="rounded-2xl w-1/2 mx-auto relative p-6 bg-white lowercase filter drop-shadow-2xl border-t-2 border-gray-100 mb-4">
                        
                        <div className="flex px-3 mb-4 border-b-2 pb-4">
                            <div className="w-full text-center">
                                <h1 className="text-4xl capitalize text-blue-600 font-bold text-center">{props.data.classificationNumber}</h1>
                                <h1 className="text-xl capitalize font-bold text-blue-600 text-center">{props.data.classificationName}</h1> 
                            </div>
                        </div>

                        {props.data.summary != 'first summary' ? <p className="text-blue-900 capitalize px-1 font-bold">Parent Classifications</p> : <p className="text-blue-900 capitalize mb-3 p-2 text-center px-3 text-2xl mt-4 rounded-full font-bold">First Summary classification</p>}
                        
                        <div className="mt-1 mb-2 grid grid-cols-2">
                            {props.data.parentData.map(obj => (
                                <p  className="cursor-pointer font-bold text-gray-400 mb-1 mx-2  w-auto px-1 rounded-full" onClick={()=>props.getChildData(obj)} >{obj.classificationNumber} - <span className="capitalize">{obj.classificationName}</span></p>
                            ))}
                        </div>

                        {props.data.childData &&
                            <div className="mt-4 mb-2">
                                <p className="text-blue-900 capitalize mb-1 px-1 font-bold">Child Classifications</p>
                                {props.data.childData &&
                                    props.data.childData.map((classification) => {
                                        return (
                                            <p onClick={()=>props.getChildData(classification)} className="cursor-pointer font-bold capitalize text-gray-400 mb-1 mx-2  w-auto px-1" on><span>{classification.classificationNumber}</span> - <span>{classification.classificationName}</span></p>
                                        )
                                    })
                                }
                                <div className="text-right">
                                    <button onClick={()=>props.showBooks(props.data.classificationNumber)} className="p-2 px-3 bg-green-500 mx-2 mt-6 rounded text-right text-white capitalize">show books</button>
                                </div>
                            </div>   
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default ViewChildClassifications
