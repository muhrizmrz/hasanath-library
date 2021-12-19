import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import './../../styles/style.css'
import { SecondSummaryContext } from '../../contexts/SecondSummaryContext'

function ChildSummary() {
    const { activeClassification, childClassification, setChildClassification, classificationCount, setClassificationCount } = useContext(SecondSummaryContext)
    useEffect(() => {
        //console.log(acti)
        axios.get('/admin/api/get-child-classifications', {
            params: { secondSummary: activeClassification }
        }).then((res) => {
            setChildClassification(res.data)
            setClassificationCount(res.data.length)
        })
    }, [])
    function showBooks(callNumber){
        window.open(`http://dhic-library:81/cgi-bin/koha/opac-search.pl?idx=callnum&q=${callNumber}&weight_search=1`)
    }
    return (
        <div className="col-span-3 overflow-y-auto hide-scroll bg-gray-700">
            <div className='mt-24 pt-2 font-sans px-4'>
                <div className='flex'>
                    <p className="text-2xl p-3 mb-3 text-white">Ten Summary Classes</p>
                    <div className='bg-green-500 rounded-full my-auto mt-2 p-2 px-4'>
                        <p className='text-right text-white font-bold'>{classificationCount}</p>
                    </div>

                </div>
                <div>
                        {childClassification &&
                            childClassification.map((obj) => {
                                return (
                                    <div onClick={()=>showBooks(obj.classificationNumber)} className={obj.summary === 'third summary'? 'text-lg text-white grid grid-cols-6 gap-2 cursor-pointer':'pl-12 text-lg capitalize text-white grid grid-cols-6 gap-2 cursor-pointer'}>
                                        <p className='p-2 mr-4 text-lg'>{obj.classificationNumber}</p>
                                        <p className='p-2 col-span-5'>{obj.classificationName}</p>
                                    </div>
                                )

                            })
                        }
                </div>
            </div>
        </div>
    )
}

export default ChildSummary
