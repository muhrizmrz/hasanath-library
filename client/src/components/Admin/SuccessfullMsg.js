import '../../../src/styles/output.css'
import {FcApproval} from 'react-icons/fc'
import React from 'react'
import {IconContext} from 'react-icons'

function SuccessfullMsg() {
    return (
        <div className="flex text-center bg-green-600 text-white p-3 px-6 rounded absolute right-6 bottom-6">
            <IconContext.Provider value={{className:"text-2xl mt-1 font-bold"}}>
            <FcApproval/>
            </IconContext.Provider>
           <span className="text-lg capitalize font-medium ml-1">Successfull</span>
        </div>
        
    )
}

export default SuccessfullMsg
