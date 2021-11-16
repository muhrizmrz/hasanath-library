import React from 'react'
import '../../styles/output.css'


function NewArrivals() {
    //const imgUrl = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.123freevectors.com%2Fbaby-blue-polygon-triangle-pattern-background-130823%2F&psig=AOvVaw1dgNyndRPYBeK-qKTr5IzV&ust=1636528295054000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLjeu8DuivQCFQAAAAAdAAAAABAD"
    return (
        <div className='pt-24 w-3/4 mx-auto'>
            <div className="">
                <div className="flex p-6">
                    <h1 className="text-xl text-gray-600 font-bold flex-1">New Arrivals</h1>
                    <div className="flex-1 text-right">
                        <button className="p-1 px-6 rounded bg-blue-600 text-white">Add</button>
                    </div>     
                </div> 
                <div className="arrivals">
                    <div className="rounded p-6 cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 lowercase shadow-lg border-0 hover:transform hover:scale-105 mb-4">
                         <h1 className="text-2xl text-white capitalize">Aakashangaliloode Oru Theevandi Yathra</h1>
                         <p><span className="italic">By </span><span className="text-gray-600">MIYAZAWA KENJ</span></p>
                         <p className="mt-4"><span className="font-bold text-gray-600 capitalize text-gray-600 ">Call Number : </span><span className="text-gray-100 font-bold uppercase">910 TYE/L</span></p>
                         <p><span className="font-bold capitalize text-gray-600">Barcode : </span><span className="text-gray-100 font-bold">1546</span></p>
                    </div>
                    <div className="rounded p-6 cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 lowercase shadow-lg border-0 hover:transform hover:scale-105 mb-4">
                         <h1 className="text-2xl text-white capitalize">Aakashangaliloode Oru Theevandi Yathra</h1>
                         <p><span className="italic">By </span><span className="text-gray-600">MIYAZAWA KENJ</span></p>
                         <p className="mt-4"><span className="font-bold text-gray-600 capitalize text-gray-600 ">Call Number : </span><span className="text-gray-100 font-bold uppercase">910 TYE/L</span></p>
                         <p><span className="font-bold capitalize text-gray-600">Barcode : </span><span className="text-gray-100 font-bold">1546</span></p>
                    </div>
                    <div className="rounded p-6 cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 lowercase shadow-lg border-0 hover:transform hover:scale-105 mb-4">
                         <h1 className="text-2xl text-white capitalize">Aakashangaliloode Oru Theevandi Yathra</h1>
                         <p><span className="italic">By </span><span className="text-gray-600">MIYAZAWA KENJ</span></p>
                         <p className="mt-4"><span className="font-bold text-gray-600 capitalize text-gray-600 ">Call Number : </span><span className="text-gray-100 font-bold uppercase">910 TYE/L</span></p>
                         <p><span className="font-bold capitalize text-gray-600">Barcode : </span><span className="text-gray-100 font-bold">1546</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArrivals
