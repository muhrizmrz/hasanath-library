import React, { useContext } from 'react'
import '../../styles/output.css'
import { SearchContext } from '../../contexts/searchClassificationContext'

function SearchClassification() {
    const { searchClassificationResult,searchText} = useContext(SearchContext)
    
    return (
        <div className='pt-24 w-3/4 mx-auto'>
            <div className="">
                <div className="flex p-6">
                   {searchClassificationResult && <h1 className="text-xl text-gray-600 font-bold flex-1">Search result for '{searchText}'</h1>}
                </div>
                <div className="arrivals">
                    { searchClassificationResult &&
                        searchClassificationResult.map((result) => {
                            return (
                                <div className="rounded p-6 cursor-pointer bg-white lowercase shadow-lg border-t-2 border-gray-100 mb-4">
                                    <h1 className="text-2xl capitalize text-gray-700">{result.classificationNumber} - {result.classificationName}</h1>
                                    <div className="flex mt-6">
                                        {result.firstSummary && <p className="p-2 text-white mx-2 bg-blue-600 px-3 rounded-full">{result.firstSummary}</p>}
                                        {result.secondSummary && <p className="p-2 text-white mx-2 bg-blue-600 px-3 rounded-full">{result.secondSummary}</p>}
                                        {result.thirdSummary && <p className="p-2 text-white mx-2 bg-blue-600 px-3 rounded-full">{result.thirdSummary}</p>}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default SearchClassification
