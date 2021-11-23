import React, { useContext, useState } from 'react'
import '../../styles/output.css'
import { SearchContext } from '../../contexts/searchClassificationContext'
import { ViewChildClassification } from '../../contexts/viewChildClassifications'
import axios from 'axios'
import ViewChildClassifications from './viewChildClassifications'

function SearchClassification() {
    const { searchClassificationResult,searchText} = useContext(SearchContext)
    //const {setChildData} = useContext(ViewChildClassification)
    const [dataChild, setDataChild] = useState([])
    const [viewChild, setViewChild] = useState(false)
    const [parentClassification, setParentClassification] = useState()

    function getChildData(classificationNumber){
        setParentClassification(classificationNumber)
        setViewChild(true)
        axios.get('/admin/api/view-child-classifications',{
            params: {classification_number: classificationNumber}
        }).then((response)=>{
            console.log(response)    
            setDataChild(response.data)
        })  
    }

    return (
        <div className='pt-24 w-100 mx-auto relative'>
            <div className="w-3/4 mx-auto">
                <div className="flex p-6">
                   {searchClassificationResult && <h1 className="text-xl text-gray-600 font-bold flex-1">Search result for '{searchText}'</h1>}
                </div>
                <div className="arrivals grid grid-cols-2 gap-4">
                    { searchClassificationResult &&
                        searchClassificationResult.map((result) => {
                            return (
                                <div className="rounded-2xl relative p-6 cursor-pointer bg-white lowercase filter drop-shadow-2xl border-t-2 border-gray-100 mb-4">
                                    <h1 className="text-4xl capitalize text-gray-600 font-bold text-center">{result.classificationNumber}</h1>
                                    <h1 className="text-xl capitalize font-bold text-gray-600 text-center">{result.classificationName}</h1>
                                    <div className="mt-6 mb-16">
                                    { result.firstSummaryDetails[0]? <p className="text-blue-900 capitalize mb-3 px-3 font-bold">Parent Classifications</p>:<p className="text-blue-900 capitalize mb-3 p-2 text-center px-3 text-2xl mt-4 rounded-full font-bold">First Summary classification</p>}
                                        {result.firstSummaryDetails[0] && <p className="p-2 text-center text-white mb-4 mx-2 bg-blue-600 w-auto px-3 rounded-full">{result.firstSummaryDetails[0].classificationNumber} - <span className="capitalize">{result.firstSummaryDetails[0].classificationName}</span></p>}
                                        {result.secondSummaryDetails[0] && <p className="p-2 text-center text-white mb-4 mx-2 bg-blue-600 w-auto px-3 rounded-full">{result.secondSummaryDetails[0].classificationNumber} - <span className="capitalize">{result.secondSummaryDetails[0].classificationName}</span></p>}
                                        {result.thirdSummaryDetails[0] && <p className="p-2 text-center text-white mb-8 mx-2 bg-blue-600 w-auto px-3 rounded-full">{result.thirdSummaryDetails[0].classificationNumber} - <span className="capitalize">{result.thirdSummaryDetails[0].classificationName}</span></p>}
                                    </div>
                                    <div className="flex px-3 absolute bottom-0 mb-6 mt-4">
                                        <button className="p-2 px-3 bg-green-500 mx-2 rounded text-white capitalize" onClick={()=>getChildData(result.classificationNumber)}>Child classification</button>
                                        <button className="p-2 px-3 bg-green-500 mx-2 rounded text-white capitalize">show books</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {viewChild && <ViewChildClassifications data={dataChild}/>}
        </div>
    )
}

export default SearchClassification
