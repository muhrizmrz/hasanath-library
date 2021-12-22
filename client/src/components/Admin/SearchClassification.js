import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { SearchContext } from '../../contexts/searchClassificationContext'
import axios from 'axios'
import ViewChildClassifications from './viewChildClassifications'
import {GrClose} from 'react-icons/gr'
import { IconContext } from 'react-icons'
import { EditContext } from '../../contexts/EditClassificationContext'

function SearchClassification(props) {
    const navigate = useNavigate()
    const { searchClassificationResult,searchText} = useContext(SearchContext)
    const [childData, setChildData] = useState([])
    const [viewChildModel, setViewChildModel] = useState(false)
    const {setToBeDelete} = useContext(EditContext)
    function getChildData(parentClassificationNumber){
        axios.get('/admin/api/view-child-classifications',{
            params: {classification_number: parentClassificationNumber}
        }).then((response)=>{
            setViewChildModel(true)  
            setChildData(response.data)
        })  
    }
    useEffect(()=>{
        //while refreshing
        if(searchText == null){
            navigate('/admin/view-classification')
        }
    })
    function showBooks(call_number){
        window.open(`http://192.168.1.10:81/cgi-bin/koha/opac-search.pl?idx=callnum&q=${call_number}&weight_search=1`)
    }
    function editClassification(call_number_id){
        setToBeDelete(call_number_id)
        setTimeout(() => {
          navigate('/admin/edit-classification')  
        }, 1000);
    }
    return (
        <div className='pt-24 w-100 mx-auto relative h-auto pb-28'>
            <div className="w-3/4 mx-auto">
                <div className="flex p-6">
                   {searchClassificationResult && <h1 className="text-xl text-gray-600 font-bold flex-1">Search result for '{searchText}'</h1>}
                </div>
                <div className="arrivals grid grid-cols-2 gap-4">
                    { searchClassificationResult &&
                        searchClassificationResult.map((result) => {
                            return (
                                <div className="rounded-2xl relative p-6  bg-white lowercase filter drop-shadow-2xl border-t-2 border-gray-100 mb-4">
                                    <h1 className="text-4xl capitalize text-blue-600 font-bold text-center">{result.classificationNumber}</h1>
                                    <h1 className="text-xl capitalize font-bold text-blue-500 text-center">{result.classificationName}</h1>
                                    <div className="mt-6 pt-2 mb-16 border-t-2">
                                    { result.firstSummaryDetails[0]? <p className="text-blue-900 capitalize mb-1 px-3 font-bold">Parent Classifications</p>:<p className="text-blue-900 capitalize mb-3 p-2 text-center px-3 text-2xl mt-4 rounded-full font-bold">First Summary classification</p>}
                                        {result.firstSummaryDetails[0] && <p className="cursor-pointer text-gray-400 mb-1 mx-2  w-auto px-3 rounded-full font-bold" onClick={()=>getChildData(result.firstSummaryDetails[0].classificationNumber)}>{result.firstSummaryDetails[0].classificationNumber} - <span className="capitalize font-bold">{result.firstSummaryDetails[0].classificationName}</span></p>}
                                        {result.secondSummaryDetails[0] && <p className="cursor-pointer text-gray-400 mb-1 mx-2  w-auto px-3 rounded-full font-bold" onClick={()=>getChildData(result.secondSummaryDetails[0].classificationNumber)}>{result.secondSummaryDetails[0].classificationNumber} - <span className="capitalize font-bold">{result.secondSummaryDetails[0].classificationName}</span></p>}
                                        {result.thirdSummaryDetails[0] && <p className="cursor-pointer text-gray-400 mb-1 mx-2  w-auto px-3 rounded-full font-bold" onClick={()=>getChildData(result.thirdSummaryDetails[0].classificationNumber)}>{result.thirdSummaryDetails[0].classificationNumber} - <span className="capitalize font-bold">{result.thirdSummaryDetails[0].classificationName}</span></p>}
                                        {result.decimalSummaryDetails[0] && <p className="cursor-pointer text-gray-400 mb-1 mx-2  w-auto px-3 rounded-full font-bold" onClick={()=>getChildData(result.decimalSummaryDetails[0].classificationNumber)}>{result.decimalSummaryDetails[0].classificationNumber} - <span className="capitalize font-bold">{result.decimalSummaryDetails[0].classificationName}</span></p>}
                                    </div>
                                    <div className="flex px-3 absolute bottom-0 mb-6 mt-4">
                                        <button className="p-2 px-3 bg-green-400 mx-2 rounded text-white capitalize" onClick={()=>getChildData(result.classificationNumber)}>View Details</button>
                                        <button className="p-2 px-3 bg-green-400 mx-2 rounded text-white capitalize" onClick={()=>showBooks(result.classificationNumber)}>show books</button>
                                        {props.isAdmin &&
                                            <button className="p-2 px-3 bg-blue-500 mx-2 rounded text-white capitalize" onClick={()=>editClassification(result._id)}>Edit classification</button>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {viewChildModel &&<div onClick={()=>setViewChildModel(false)} className="fixed top-12  right-96 z-50">
                <IconContext.Provider value={{color:'white',className:'bg-red-500 p-2 w-12 h-12 cursor-pointer rounded-full'}}>
                <GrClose/>
                </IconContext.Provider>
            </div>}
            {viewChildModel && <ViewChildClassifications data={childData} setData={setChildData} showBooks={showBooks}/>}
        </div>
    )
}

export default SearchClassification
