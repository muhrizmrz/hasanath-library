import Header from "../../components/Admin/Header";
import React, { useContext, useLayoutEffect } from 'react'
import NewArrivals from '../../components/Admin/NewArrivals';
import LibraryDuty from "../../components/Admin/LibraryDuty";
import DdcClassification from "../../components/Admin/DdcClassification";
import { LogInContext } from "../../contexts/IsLoggedAdmin";

function Home(props) {
    const {authorizeAdmin} = useContext(LogInContext)
    useLayoutEffect(() => {
        authorizeAdmin(props.isAdmin)
    }, [])
    return (
        <div className="bg-gray-100 h-auto">
            <Header isAdmin={props.isAdmin}/>
            <div className='pt-24 w-full grid grid-cols-3 p-10'>
                <NewArrivals isAdmin={props.isAdmin}/>
                <div>
                    <DdcClassification isAdmin={props.isAdmin}/>
                    <LibraryDuty/>
                </div>
            </div>
        </div>
    )
}

export default Home
