import React, { useContext, useEffect} from 'react'
import { SecondSummaryContext } from '../../contexts/SecondSummaryContext'
import axios from 'axios'
import './../../styles/style.css'

function HundredDivisions() {
    const { firstSummary, hundredClassification, setHundredClassification, activeClassification, setActiveClassification, setChildClassification, setClassificationCount, first, setFirst } = useContext(SecondSummaryContext)
    useEffect(() => {
        axios.get('/admin/api/search-classification', {
            params: { keyword: firstSummary }
        }).then((response) => {
            setFirst(response.data)
            setActiveClassification(response.data[0].classificationNumber)
        });
        axios.get('admin/api/get-ten-classification', {
            params: {
                firstSummary: firstSummary
            }
        }).then((res) => {
            setHundredClassification(res.data)
            console.log(res.data)
        })
    }, [])
    function getChildClassification(secondSummary) {
        setActiveClassification(secondSummary)
        axios.get('/admin/api/get-child-classifications', {
            params: { secondSummary: secondSummary }
        }).then((res) => {
            setChildClassification(res.data)
            setClassificationCount(res.data.length)
        })
    }
    return (
        <div className='bg-gray-800 col-span-2 overflow-y-auto hide-scroll'>
            <div className='mt-24 pt-2 font-sans px-4'>
                <p className="text-2xl p-3 mb-3 text-gray-100">Hundred Summary Classes</p>
                <table className='w-full'>
                    {first &&
                        <div onClick={() => getChildClassification(first[0].classificationNumber)} className={activeClassification === first[0].classificationNumber ? "text-xl  text-green-600 cursor-pointer capitalize" : "text-xl text-gray-400 cursor-pointer capitalize"}>
                            <td className='pl-6'>{first[0].classificationNumber} </td>
                            <td className='p-2 px-4'>{first[0].classificationName}</td>
                        </div>
                    }
                    {
                        hundredClassification.map((obj) => {
                            return (
                                <div onClick={() => getChildClassification(obj.classificationNumber)} className={activeClassification === obj.classificationNumber ? "text-xl  text-green-600 cursor-pointer capitalize" : "text-xl text-gray-400 cursor-pointer capitalize"}>
                                    <td className='pl-6'>{obj.classificationNumber} </td>
                                    <td className='p-2 px-4'>{obj.classificationName}</td>
                                </div>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default HundredDivisions
