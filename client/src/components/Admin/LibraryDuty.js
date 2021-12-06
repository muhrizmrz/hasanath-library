import React from 'react'

function LibraryDuty() {
    return (
        <div className="mt-4 p-2 bg-white shadow-lg">
            <p className="p-2 text-2xl text-gray-700 fond-extrabold mb-4">Library Duty</p>
            <table className="mx-auto">
                <thead>
                    <tr className="border-b  text-gray-400 font-bold">
                        <td className="p-2 px-2 ">Day</td>
                        <td className="p-2 px-2 ">Name</td>
                        <td className="p-2 px-2 ">Time</td>
                    </tr>
                </thead>
                <tbody className="text-gray-900 font-bold">
                    <tr>
                        <td className="p-2 px-2 text-gray-600 ">Saturday</td>
                        <td className="p-2 px-2 text-gray-600 ">Muhammed Afeej</td>
                        <td className="p-2 px-2 text-gray-600 ">7 AM - 7.30 AM</td>
                    </tr>
                    <tr>
                        <td className="p-2 px-2 text-gray-600 ">Sunday</td>
                        <td className="p-2 px-2 text-gray-600 ">Muhammed Asnaf</td>
                        <td className="p-2 px-2 text-gray-600 ">7 AM - 7.30 AM</td>
                    </tr>
                    <tr>
                        <td className="p-2 px-2 text-gray-600 ">Monday</td>
                        <td className="p-2 px-2 text-gray-600 ">Muhammed sa'ad</td>
                        <td className="p-2 px-2 text-gray-600 ">7 AM - 7.30 AM</td>
                    </tr>
                    <tr>
                        <td className="p-2 px-2 text-gray-600 ">Tuesday</td>
                        <td className="p-2 px-2 text-gray-600 ">Muhammed Shihan</td>
                        <td className="p-2 px-2 text-gray-600 ">7 AM - 7.30 AM</td>
                    </tr>
                    <tr>
                        <td className="p-2 px-2 text-gray-600 ">Wednesday</td>
                        <td className="p-2 px-2 text-gray-600 ">Muhammed Zuhair</td>
                        <td className="p-2 px-2 text-gray-600 ">7 AM - 7.30 AM</td>
                    </tr>
                    <tr>
                        <td className="p-2 px-2 text-gray-600 ">Thursday</td>
                        <td className="p-2 px-2 text-gray-600 ">Muhammed Raheeb</td>
                        <td className="p-2 px-2 text-gray-600 ">7 AM - 7.30 AM</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default LibraryDuty
