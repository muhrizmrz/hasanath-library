import React from 'react'

function LibraryDuty() {
    return (
        <div className="mt-4 p-6 px-6 bg-white shadow-lg border rounded-3xl">
            <p className="p-2 text-2xl text-gray-700 fond-extrabold mb-2">Library Duty</p>
            <table className="">
                <thead>
                    <tr className="border-b  text-gray-400 font-bold">
                        <td className="p-2 px-2 ">Day</td>
                        <td className="p-2 px-2 ">Name</td>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    <tr>
                        <td className="p-2 px-2  text-gray-600 ">Saturday</td>
                        <td className="p-2 px-2 text-gray-600 ">Muhammed Afeej</td>
                        
                    </tr>
                    <tr>
                        <td className="p-2 px-2 text-gray-600 ">Sunday</td>
                        <td className="p-2 px-2 text-gray-600 ">Muhammed Asnaf</td>
                        
                    </tr>
                    <tr>
                        <td className="p-2 px-2 text-gray-600 ">Monday</td>
                        <td className="p-2 px-2 text-gray-600 ">Muhammed sa'ad</td>
                        
                    </tr>
                    <tr>
                        <td className="p-2 px-2 text-gray-600 ">Tuesday</td>
                        <td className="p-2 px-2 text-gray-600 ">Muhammed Shihan</td>
                        
                    </tr>
                    <tr>
                        <td className="p-2 px-2 text-gray-600 ">Wednesday</td>
                        <td className="p-2 px-2 text-gray-600 ">Muhammed Zuhair</td>
                        
                    </tr>
                    <tr>
                        <td className="p-2 px-2 text-gray-600 ">Thursday</td>
                        <td className="p-2 px-2 text-gray-600 ">Muhammed Raheeb</td>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LibraryDuty
