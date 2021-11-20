import React from 'react'

function ErrorMsg(props) {
    return (
        <div className="w-96 bg-green-600 text-white p-4 rounded absolute right-6 bottom-6">
            {props.msg}
        </div>
    )
}

export default ErrorMsg
