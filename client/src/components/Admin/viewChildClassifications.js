import React, { useContext, useState } from 'react'
import { ViewChildClassification } from '../../contexts/viewChildClassifications'
import axios from 'axios'


function ViewChildClassifications(props) {
    //const {childData, setChildData} = useContext(ViewChildClassification)
    return (

            <div className="w-full">
                <div className="fixed w-full opacity-25 top-0 bottom-0 left-0 right-100 h-screen bg-black text-white z-30">
                    {
                        props.data.map((obj)=>{
                            return(
                                <h1>{obj.classificationName}</h1>
                            )
                        })
                    }
                </div>

            </div>

    )
}

export default ViewChildClassifications
