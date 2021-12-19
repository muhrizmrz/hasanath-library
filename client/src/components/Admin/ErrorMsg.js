import React from 'react'
import {VscError} from 'react-icons/vsc'
import {IconContext} from 'react-icons'
function ErrorMsg(props) {
    return (
        <div className="flex text-center bg-red-600 text-white p-3 rounded absolute right-6 bottom-6">
            <IconContext.Provider value={{className:"text-2xl mt-1 font-bold"}}>
                <VscError/>
            </IconContext.Provider>
           <span className="text-lg capitalize font-medium ml-1">{props.msg}</span>
        </div>
    )
}

export default ErrorMsg
