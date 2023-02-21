import React, { useContext, useEffect} from 'react'
import { SecondSummaryContext } from '../../contexts/SecondSummaryContext'
import axios from 'axios'
import './../../styles/style.css'

function HundredDivisions(props) {

    var newArray = []
    props.data && props.data.map(obj => {
        if(obj.isactiveSecondSummary){
           // console.log(obj.classificationNumber)
            props.data.map(value => {
               // console.log(value.secondSummary)
                if(value.secondSummary == obj.classificationNumber){
                    newArray.push(value)
                }
            })
        }
    })

    return (
        <div className='w-full bg-gray-800 col-span-3 overflow-y-auto hide-scroll'>
            <div className='mt-24 pt-2 font-sans px-4 pb-6'>
                <p className="text-2xl p-3 mb-3 text-gray-100">Hundred Summary Classes</p>
                <table className='w-full'>
                    {
                        newArray.map((obj) => {
                            return (
                                <div className={`text-xl text-gray-400 cursor-pointer capitalize ${obj.summary === 'decimal summary' && 'ml-5'}`}>
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
