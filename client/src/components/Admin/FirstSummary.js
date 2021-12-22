import React, {useContext, useEffect} from 'react'
import axios from 'axios'
import './../../styles/style.css'
import { SecondSummaryContext } from '../../contexts/SecondSummaryContext'

function FirstSummary() {
    const {setFirst,setFirstSummary, setLoading, setHundredClassification,setChildClassification, setActiveClassification,setClassificationCount,activeTen, setActiveTen,mainClassification, setMainClassification,setSummaryFirst} = useContext(SecondSummaryContext)
    useEffect(() => {
        axios.get('/admin/api/get-main-classification').then((res) => {
            setMainClassification(res.data)
        })
    },[])
    function getTenClassification(classificationNumber) {
        setLoading(true)
        axios.get('/admin/api/search-classification', {
            params: { keyword: classificationNumber }
        }).then((response) => {
            setFirst(response.data)
            setActiveClassification(response.data[0].classificationNumber)
            axios.get('/admin/api/search-classification', {
                params: { keyword: response.data[0].classificationNumber }
            }).then((response) => {
                setSummaryFirst(response.data)
            });
        });
        axios.get('admin/api/get-ten-classification', {
            params: {
                firstSummary: classificationNumber
            }
        }).then((res) => {
            setHundredClassification(res.data)
            setLoading(false)
            setFirstSummary(classificationNumber)
            setActiveTen(classificationNumber)
            axios.get('/admin/api/get-child-classifications', {
                params: { secondSummary: classificationNumber}
            }).then((response) => {
                setChildClassification(response.data)
                setClassificationCount(response.data.length)
                
            })
        })
    }
    return (
        <div className="bg-gray-900 col-span-2 overflow-y-auto hide-scroll">
            <div className="mt-24 font-sans p-2 ">
                <p className="text-2xl text-gray-50 p-3 mb-3">Main Classes</p>
                {mainClassification &&
                    mainClassification.map((obj) => {
                        return (
                            <p onClick={() => getTenClassification(obj.classificationNumber)} className={activeTen === obj.classificationNumber ? "text-xl  px-8 py-2 cursor-pointer bg-blue-600 mb-2 capitalize text-white  rounded-full" : "text-xl text-gray-500  px-8 py-2 cursor-pointer hover:text-white rounded-lg mb-2 capitalize"}><span className="mr-3">{obj.classificationNumber} </span>  {obj.classificationName}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FirstSummary
