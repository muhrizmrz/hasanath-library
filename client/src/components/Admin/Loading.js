import React from 'react'
import '../../../src/styles/output.css'
import Loader from 'react-loader-spinner'


function Loading() {
    return (
        <div className="h-screen fixed right-0 left-0 bottom-0 top-16 pt-12 z-10 w-100 text-center bg-gray-50">
            <div className="mx-auto w-24">
                <Loader
                    type="Circles"
                    color="gray"
                    height={40}
                    width={100}
                />
            </div>

        </div>
    )
}

export default Loading
