import '../../../src/styles/output.css'
import React from 'react'
//import {useH} from 'react-router-dom'

function Header() {
    //const history = useHistory()
    return (
        <div className="fixed right-0 left-0 top-0 ">
            <header className="w-100 p-4 px-16 bg-white h-auto shadow-lg">
                <div className="grid grid-cols-4 justify-between place-content-center">
                    <div>
                        <h1 className="text-lg font-bold">Title</h1>
                    </div>
                    <div className="col-span-2 flex">
                        <input type='text' placeholder='Search' className='py-1 px-3 bg-white rounded w-3/4 border border-transparent focus:outline-none ring-2 ring-blue-400 shadow-lg focus:ring-blue-500 text-gray-500'/>
                        <button className="ml-4 p-1 px-6 rounded bg-blue-600 text-white">Search</button>
                    </div>
                        
                    
                    <div className="text-right text-gray-400 flex">
                        <p className="cursor-pointer">Classification List</p>
                        <p className="cursor-pointer ml-4">New Arrivals</p>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header