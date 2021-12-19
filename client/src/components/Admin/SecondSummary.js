import React, { useContext, useEffect, useState } from 'react'
import { SecondSummaryContext } from '../../contexts/SecondSummaryContext'
import axios from 'axios'
import Loader from 'react-loader-spinner'

function SecondSummary() {
    const { firstSummary, loading, secondSummary,setSecondSummary,activeClassification, setActiveClassification,childClassification,setChildClassification } = useContext(SecondSummaryContext)
    const [mainClassification, setMainClassification] = useState()
    useEffect(() => {
        axios.get('/admin/api/get-main-classification').then((res)=>{
            setMainClassification(res.data)
            for(var i=0;i<res.data.length;i++){
                axios.get('admin/api/get-ten-classification', {
                    params: {
                        firstSummary: res.data[i].classificationNumber
                    }
                }).then((res)=>{
                    setSecondSummary(res.data)
                })
            }
        })
        
    },[])
    return (
        <div className="bg-gray-200 col-span-2">
            <div className="mt-24 pt-2 font-sans">
                <p className="text-2xl p-3 mb-3">Ten Summary Classes</p>

                {loading ?
                    <div className="h-full">
                        <div className="mx-auto mt-12 w-24">
                            <Loader
                                type="Puff"
                                color="gray"
                                height={40}
                                width={100}
                            />
                        </div>
                    </div> :
                    secondSummary.map((obj) => {
                        return (
                            <p onClick={() => setActiveClassification(obj.classificationNumber)} className={activeClassification === obj.classificationNumber ? "text-xl bg-white text-gray-700 px-8 py-2 cursor-pointer mb-2" : "text-xl text-gray-500  px-8 py-2 cursor-pointer hover:bg-white hover:text-gray-700 mb-2"}><span className="mr-3">{obj.classificationNumber} </span>  {obj.classificationName}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SecondSummary
